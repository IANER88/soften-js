import { Signal } from "@/signal";
import { getRecrudescence } from "./use-recrudescence";
import { observers } from "@/util/create-element";

type UseSignal<S> = Signal<S>;

export default function useSignal<S>(initialState?: S) {

  const set = (target, key, value) => {
    if (!Object.is(target[key], value)) {
      target[key] = value;
      for (const effect of [...state.recrudescence]) {
        effect?.rely?.();
      }
      for (const observer of state.observers) {
        observer.observers(observer?.subscriber as Element)
      }
    }
    return true;
  }

  const state = new Signal(
    initialState instanceof Array ?
      new Proxy(initialState, {
        set,
      }) :
      initialState
  )

  const signal = new Proxy(state, {
    set,
    get: (target, key) => {
      const stack = getRecrudescence();
      const effect = stack[stack.length - 1]
      if (effect) {
        state.recrudescence.add(effect);
        effect.deps.add(state.recrudescence)
      }

      const observer = observers.at(-1);
      if (observer) {
        state.observers.add(observer)
      }

      return target[key]
    },
  })

  return signal as UseSignal<S>;
}