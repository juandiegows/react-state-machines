import { createMachine, assign } from "xstate";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
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
    selectCountry: null
  },
  states: {
    initial: {
      entry: 'CleanContexto',
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
      CleanContexto: assign(() => ({
        passengers: [],
        selectedCountry: null,
      }))
    },
  }
);

export default bookingMachine;