import { createTabulate } from "@/util";
import SignalTabulate from "./signal-tabulate";
export const tabulates = [];

class SignalList<S> extends Array {

  observers: Set<SignalTabulate>;

  constructor(initialState: S) {
    super(...initialState as []);
    this.observers = new Set();
  }

  tabulate = (fn: (item: S extends (infer U)[] ? U : S, index: number) => unknown) => {
    const list = () => [...this].map(fn);
    const observer = createTabulate(list);
    tabulates.push(observer)
    try {

    } finally {
      tabulates.pop();
    }
    return observer as unknown as Element;
  }
}

export default SignalList;