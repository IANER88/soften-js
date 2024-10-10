import { getMount } from "@/use/use-mount";

type Program = Element;

export default function createRoot(program: Program) {

  const mount = (selector: string) => {
    const root = document.querySelector(selector);
    root?.append(program);
    for (const mount of getMount()) {
      mount();
    }
  }

  return {
    mount,
  };
}