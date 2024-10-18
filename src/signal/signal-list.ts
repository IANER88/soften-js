import { createTabulate } from "@/util";
import SignalTabulate from "./signal-tabulate";

class SignalList<S> extends Array {

  observers: Set<SignalTabulate>;

  constructor(initialState: S) {
    console.log(initialState);
    
    super(...initialState as []);
    this.observers = new Set();
  }

  tabulate = (fn: (item: S extends (infer U)[] ? U : S, index: number) => unknown) => {
    const list = () => [...this].map(fn);
    const observer = createTabulate(list);
    return observer as unknown as Element;
  }
}

export default SignalList;