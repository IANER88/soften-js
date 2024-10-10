import { Signal } from "@/signal";

type UseSignal<S> = Signal<S>;

export default function useSignal<S>(initialState?: S) {

  const state = new Signal(initialState)
  return state as UseSignal<S>;
}