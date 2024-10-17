import SignalComponent from "@/signal/signal-component";
import { JSX } from "@/types/jsx-runtime";

type Program = SignalComponent | JSX.Element;

export default function createRoot(program: Program) {
  
  const mount = (selector: string) => {
    const root = document.querySelector(selector);
    const node = program instanceof SignalComponent ? program.render() : program;
    root?.append(node as Element);

    if (program instanceof SignalComponent) {
      if (program.mounts.size) for (const mount of program.mounts) mount();
    }
  }

  return {
    mount,
  };
}