import { Disentangle } from "@/hooks/use-disentangle";
import SignalComponent from "./signal-component";
import SignalTabulate from "./signal-tabulate";
import { JSX } from "@/types/jsx-runtime";
import createComponent from "@/utils/create-component";

type Root = Element[] | Element | Comment | JSX.ArrayElement;


class SignalDetermine {

  #root?: Root;

  #view: () => ReturnType<typeof createComponent>;

  #disentangles: Set<Disentangle> = new Set();

  #mount: () => void = () => void 0;

  #test = () => {
    const node = [void 0, null, false];
    const root = this.#view();
    let element = root.render();
    
    if (this.#disentangles.size) {
      for (const disentangle of this.#disentangles) {
        disentangle();
      }
      this.#disentangles = new Set();
    }
    if (node.includes(element as unknown as null)) {
      return document.createComment('determine');
    }
    if (element instanceof SignalComponent) {
      element = element.render();
    }
    if (root?.disentangles?.size) {
      for (const disentangle of root?.disentangles) {
        this.#disentangles.add(disentangle)
      }
    }
    this.#mount = () => {
      if (root?.mounts?.size) {
        for (const mount of root?.mounts) mount();
        this.#mount = () => void 0;
      }
    }
    return element;
  }

  constructor(view) {
    this.#view = () => createComponent(() => view(), {})
  }

  // #contains = (node) => {
  //   const root = roots.at(-1);
  //   const element = root?.contains(node as Element);
  //   return element;
  // }

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
      // this.#contains(this.#root);
      (this.#root as Element).replaceWith(node as Element);
      this.#root = node as any;
    }
    this.#mount();
  }
}

export default SignalDetermine;