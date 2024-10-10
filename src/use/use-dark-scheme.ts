import { useSignal } from ".";

export default function useDarkScheme() {
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const scheme = useSignal(dark?.matches ? 'dark' : 'lignt')
  dark.onchange = (event) => {
    scheme.value = event?.matches ? 'dark' : 'lignt'
  }
  return scheme;
}