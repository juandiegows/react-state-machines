import { createMachine, assign, fromPromise } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        // FIX: Envolvemos la función con fromPromise
        src: fromPromise(() => fetchCountries()),
        onDone: {
          target: 'success',
          actions: assign({
            // En V5, el resultado de una promesa está en event.output
            countries: ({ event }) => event.output,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            // Capturamos el error real para mostrarlo
            error: ({ event }) => event.error?.message || 'Error al cargar países',
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectCountry: null,
    countries: [],
    error: '',
  },
  states: {
    initial: {
      entry: 'cleanContext',
      on: {
        START: {
          target: "search"
        },
      },
    },
    search: {
      on: {

        CONTINUE: {
          target: "passengers",
          actions: assign({ selectCountry: ({ _, event }) => event.selectCountry }),
        },
        CANCEL: "initial",
      },
      ...fillCountries,
    },
    tickets: {
      after: {
        5000: {
          target: 'initial',
          actions: 'cleanContext',
        }
      },
      on: {
        FINISH: "initial",
      },
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: "initial",
        ADD: {
          target: "passengers",
          actions: assign(
            {
              passengers: ({ context, event }) => [...context.passengers, event.newPassenger]

            }
          )
        }
      },
    },
  },
},
  {
    actions: {
      cleanContext: assign(() => ({
        passengers: [],
        selectedCountry: null,
      }))
    },
  }
);

export default bookingMachine;