import { RecrudescenceFn, getRecrudescence } from '../use/use-recrudescence';
import { contents } from '@/util/create-content';
import SignalContent from './signal-content';
import SignalDetermine from './signal-determine';
import { determines } from '@/util/create-determine';
import SignalComponent from './signal-component';
import SignalTabulate from './signal-tabulate';
import { attributes } from '@/util/create-attribute';
import SignalAttribute from './signal-attribute';
import { createTabulate } from '@/util';

export type Execute = {
  subscriber: SignalContent |
  SignalComponent |
  SignalDetermine |
  SignalTabulate |
  SignalAttribute |
  null;
};

type ISignal<S> =  {
  value: S;
};

class Signal<S> implements ISignal<S> {
  value: S ;
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
        target[key] = observer(value);
        for (const effect of [...this.#recrudescence]) {
          effect?.rely?.();
        }
        for (const observer of this.#observers) {
          if (observer.subscriber) observer?.subscriber?.render?.();
        }
      }
      return true;
    };

    const get = (target, key, receiver) => {
      const stack = getRecrudescence();
      const effect = stack.at(-1)
      if (effect) {
        this.#recrudescence.add(effect);
        effect.deps.add(this.#recrudescence);
      }
      const content = contents.at(-1);
      const determine = determines.at(-1);
      const attribute = attributes.at(-1)
      if (content) this.#observers.add(content);
      if (determine) this.#observers.add(determine);
      if (attribute) this.#observers.add(attribute);
      return Reflect.get(target, key, receiver)
    }

    const proxy = (signal) => {
      return new Proxy(signal, {
        set,
        get,
      });
    }
    const observer = (state) => {
      if (state instanceof Object && state) {
        if (state instanceof Array) {
          const signal: any = [];
          for (const soften of state) signal.push(observer(soften))
          return proxy(signal);
        };
        for (const value in state) {
          state[value] = observer(state[value]);
        }
        return proxy(state);
      }
      return state;
    }

    this.value = observer(initialState);
    const signal = proxy(this)

    return signal;
  }

  tabulate = (fn: (item: S extends (infer U)[] ? U : S, index: number) => unknown) => {
    if (!(this.value instanceof Array)) throw Error('is not array type');
    const list = () => {
      return [...this.value as []].map(fn)
    };
    const observer = createTabulate(list);
    this.#observers.add({ subscriber: observer })
    return observer as unknown as Element;
  }
}

export default Signal;