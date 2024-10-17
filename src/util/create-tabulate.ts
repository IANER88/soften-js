import SignalTabulate from "@/signal/signal-tabulate";
type Tabulate = {
  subscriber: SignalTabulate | null;
}

export const tabulates: Tabulate[]  = [];

export default function createTabulate(tabulate) {
  const execute = () => {
    tabulates.push(executes);
    try {
      const subscriber = new SignalTabulate(...tabulate);;
      executes.subscriber = subscriber;
      return subscriber;
    } finally {
      tabulates.pop();
    }
  }

  const executes: Tabulate = {
    subscriber: null,
  }
  return execute();
}