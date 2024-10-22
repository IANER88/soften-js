import { Signal } from "@/signal";

type UseSignal<S> = S extends unknown[] ? Signal<S> : Omit<Signal<S>, 'tabulate'>;

export default function useSignal<S>(initialState?: S) {
  const state = new Signal(initialState);
  return state as UseSignal<S>;
}