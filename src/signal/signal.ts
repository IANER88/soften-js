import { observers } from '@/util/create-element';
import { RecrudescenceFn, getRecrudescence } from '../use/use-recrudescence';
export type Execute = {
  observers: (content: Element) => Element | null;
  subscriber: null | Element;
  determines: Set<() => void>;
};
class Signal<S> {
  value: S;
  #observers: Set<Execute>;
  #recrudescence: Set<{
    rely: () => void;
    deps: Set<Set<RecrudescenceFn>>;
  }>;
  constructor(initialState: S) {
    this.value = initialState;
    this.#observers = new Set();
    this.#recrudescence = new Set();

    const set = (target, key, value) => {
      if (!Object.is(target[key], value)) {
        target[key] = value;
        for (const effect of [...this.#recrudescence]) {
          effect?.rely?.();
        }
        for (const observer of this.#observers) {
          observer.observers(observer?.subscriber as Element)
        }
      }
      return true;
    };

    const get = (target, key) => {
      const stack = getRecrudescence();
      const effect = stack[stack.length - 1]
      if (effect) {
        this.#recrudescence.add(effect);
        effect.deps.add(this.#recrudescence)
      }

      const observer = observers.at(-1);

      if (observer) {
        this.#observers.add(observer)
      }

      return target[key]
    }

    return new Proxy(this, {
      set,
      get,
    }) 
  }
}

export default Signal;