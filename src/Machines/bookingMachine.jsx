import { createMachine } from "xstate";

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  states: {
    initial: {
      on: {
        START: {
          target: "search",
          actions: "imprimirIniciar",
        },
      },
    },
    search: {
      entry: "imprimirEntrada",
      exit: "imprimirSalida",
      on: {

        CONTINUE: "passengers",
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
      },
    },
  },
},
  {
    actions: {
      imprimirIniciar: () => console.log('Iniciando...'),
      imprimirEntrada: () => console.log('Entrando...'),
      imprimirSalida: () => console.log('Saliendo...')
    },
  }
);

export default bookingMachine;