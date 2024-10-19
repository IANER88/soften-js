import SignalRoot from "@/signal/signal-root";
import SignalComponent from "@/signal/signal-component";
import { JSX } from "@/types/jsx-runtime";

export type Program = SignalComponent | JSX.Element;

export const roots: SignalRoot[] = [];

export default function createRoot(program: Program) {
  const root = new SignalRoot(program);
  roots.push(root);
  return root;
}