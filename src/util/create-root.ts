import { JSX } from "@/types/jsx-runtime";
import { getMount } from "@/use/use-mount";

type Program = JSX.Element;

export default function createRoot(program: Program) {

  const mount = (selector: string) => {
    const root = document.querySelector(selector);
    root?.append(program as Element);
    for (const mount of getMount()) {
      mount();
    }
  }

  return {
    mount,
  };
}