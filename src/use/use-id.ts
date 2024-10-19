import { roots } from '@/util/create-root';
export default function useId() {
  const root = roots.at(-1);
  return root?.id();
}