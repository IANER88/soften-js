import { useRecrudescence, useSignal } from ".";

type MemoCallback<V> = () => V;

export default function useMemo<V extends MemoCallback<unknown>>(callback: V) {

  const memo = useSignal<ReturnType<V> | unknown>();

  useRecrudescence(() => {
    memo.value = callback();
  });
  return memo;
}