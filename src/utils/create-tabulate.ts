import SignalTabulate from "@/signal/signal-tabulate";
type Tabulate = {
  subscriber: SignalTabulate | null;
}

export const tabulates: Tabulate[] = [];

export default function createTabulate(tabulate) {
  const subscriber = new SignalTabulate(tabulate);
  return subscriber;
}