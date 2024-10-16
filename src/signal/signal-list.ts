import SignalTabulate from "./signal-tabulate";

class SignalList<S> extends Array {
  subscribers: [];
  site: number;

  constructor(initialState: S) {
    super(...initialState as []);
    this.subscribers = [];
    this.site = 0;
  }
  tabulate(fn: (item: S extends (infer U)[] ? U : S ,index: number) => unknown) {
    const list = [...this].map(fn);

    const tabulate = new SignalTabulate(...list);

    return tabulate as unknown as Element;
  }
}

export default SignalList;