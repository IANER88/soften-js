import { observers } from '@/util/create-element';
import { RecrudescenceFn, getRecrudescence } from '../use/use-recrudescence';
import SignalList from './signal-list';
import { contents } from '@/util/create-content';
import SignalContent from './signal-content';
import SignalDetermine from './signal-determine';
import { determines } from '@/util/create-determine';
import { tabulates } from '@/util/create-tabulate';
import SignalComponent from './signal-component';
import SignalTabulate from './signal-tabulate';
import { attributes } from '@/util/create-attribute';
import SignalAttribute from './signal-attribute';
export type Execute = {
  subscriber: SignalContent | SignalComponent | SignalDetermine | SignalTabulate | SignalAttribute | null;
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
          const node = observer.subscriber instanceof SignalContent ||
            observer.subscriber instanceof SignalDetermine || 
            observer.subscriber instanceof SignalAttribute
          if (node) {
            console.log(observer?.subscriber?.render());
            
            // observer?.subscriber?.render();
          };
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
      const content = contents.at(-1);
      const determine = determines.at(-1);
      const tabulate = tabulates.at(-1)
      const attribute = attributes.at(-1)

      if (content) this.#observers.add(content);
      if (determine) this.#observers.add(determine);
      if (attribute) this.#observers.add(attribute);
      if (tabulate) this.#observers.add(tabulate);

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