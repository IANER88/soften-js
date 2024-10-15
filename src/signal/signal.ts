import { observers } from '@/util/create-element';
import { RecrudescenceFn, getRecrudescence } from '../use/use-recrudescence';
import SignalList from './signal-list';
import SignalTabulate from './signal-tabulate';
export type Execute = {
  observers: (content: Execute) => Element | null;
  subscriber: null | Element;
  determines: Set<() => void>;
  children: (Element | SignalTabulate)[];
  sites: number[];
};
class Signal<S> {
  value: S extends unknown[] ? SignalList<S> : S;
  #observers: Set<Execute>;
  #recrudescence: Set<{
    rely: () => void;
    deps: Set<Set<RecrudescenceFn>>;
  }>;
  constructor(initialState: S) {

    this.#observers = new Set();
    this.#recrudescence = new Set();

    const set = (target: this, key: 'value', value) => {
      if (!Object.is(target[key], value)) {
        target[key] = value;
        for (const effect of [...this.#recrudescence]) {
          effect?.rely?.();
        }
        for (const observer of this.#observers) {
          observer.observers(observer)
        }
      }
      return true;
    };

    const get = (target, key) => {
      const stack = getRecrudescence();
      const effect = stack[stack.length - 1]
      if (effect) {
        this.#recrudescence.add(effect);
        effect.deps.add(this.#recrudescence);
      }
      const observer = observers.at(-1);
      
      if (observer) this.#observers.add(observer);
      return target[key]
    }

    this.value = initialState instanceof Array ?
      new Proxy(new SignalList(initialState), {
        set,
        get,
      }) : initialState

    const signal = new Proxy(this, {
      set,
      get,
    });

    return signal;
  }
}

export default Signal;