import { Disentangle } from "@/use/use-disentangle";
import SignalComponent from "./signal-component";
import SignalTabulate from "./signal-tabulate";
import { JSX } from "@/types/jsx-runtime";
import { roots } from "@/utils/create-root";

class SignalDetermine {

  #root?: Element[] | Element | Comment | JSX.ArrayElement;

  #view: () => Element | string | null;

  #disentangles: Set<Disentangle>;

  #test = () => {
    const node = [void 0, null, false];
    const element = this.#view();
    if (this.#disentangles.size) {
      for (const disentangle of this.#disentangles) {
        disentangle();
      }
      this.#disentangles = new Set();
    }
    if (node.includes(element as any)) {
      return document.createComment('determine');
    }
    if (element instanceof SignalComponent) {
      for (const disentangle of element.disentangles) {
        this.#disentangles.add(disentangle)
      }
      return element.render();
    }
    return element;
  }

  constructor(view) {
    this.#view = view;
    this.#disentangles = new Set();
  }

  #contains = (node) => {
    const root = roots.at(-1);
    const element = root?.root?.contains(node as Element);
    return element;
  }

  once = () => {
    const node = this.#test();
    this.#root = node as any;
    return node;
  }

  render = () => {
    const node = this.#test();
    const fragment = node instanceof SignalTabulate ?
      node.once() : node instanceof Array ? node : [node];
    if (this.#root instanceof Array) {
      const app: any = this.#root.at(-1);
      for (const view of this.#root.slice(0, -1)) {
        (view as Element).remove();
      }
      app.replaceWith(...fragment as []);
      this.#root = fragment as any;
    } else {
      const element = this.#contains(this.#root);
      (this.#root as Element).replaceWith(node as Element);
      this.#root = node as any;
      return element;
    }
  }
}

export default SignalDetermine;