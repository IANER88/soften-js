import { Signal } from "@/signal";
import SignalList from "@/signal/signal-list";

type UseSignal<S> = S extends (infer U)[] ? Signal<SignalList<U>> : Signal<S>;

export default function useSignal<S>(initialState?: S) {
  const state = new Signal(initialState);
  return state as UseSignal<S>;
}