import { createMachine, assign } from "xstate";

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectCountry: null
  },
  states: {
    initial: {
      entry: assign(() => ({
        passengers: [],
        selectedCountry: null,
      })),
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

    },
  }
);

export default bookingMachine;