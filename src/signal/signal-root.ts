import { Program } from "@/util/create-root";
import SignalComponent from "./signal-component";

export default class SignalRoot {
  root?: Element;
  #program: Program;
  #id = 0;
  constructor(program?: Program) {
    this.#program = program;
  }
  mount = (selector: string) => {
    const root = document.querySelector(selector);
    if (root) {
      this.root = root;
      const node = this.#program instanceof SignalComponent ?
        this.#program.render() :
        this.#program;
      root?.append(node as Element);
      if (this.#program instanceof SignalComponent) {
        if (this.#program.mounts.size) for (const mount of this.#program.mounts) mount();
      }
    }
  }

  id = () => `id-${this.#id++}`;
}