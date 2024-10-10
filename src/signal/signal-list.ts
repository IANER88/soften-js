import { RecrudescenceFn } from '../use/use-recrudescence';
export type Execute = {
  observers: (content: Element) => Element | null;
  subscriber: null | Element;
  determines: Set<() => void>;
};
class SignalList<S> {
  value: S;
  observers: Set<Execute>;
  recrudescence: Set<{
    rely: () => void;
    deps: Set<Set<RecrudescenceFn>>;
  }>;
  constructor(initialState: S) {
    this.value = initialState;
    this.observers = new Set();
    this.recrudescence = new Set();
  }
}

export default SignalList;