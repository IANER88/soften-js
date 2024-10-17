import createEvent from "@/util/create-event";
import SignalReference from "./signal-reference";

export default class SignalAttribute {

  #root: HTMLElement | HTMLInputElement;

  #value: () => unknown;

  #attribute: string;

  render?: () => void;

  constructor(value) {
    this.#value = value;
    this.#root = null as any;
    this.#attribute = ''
  }

  once = (root: HTMLElement, attribute) => {
    this.#attribute = attribute;
    this.#root = root;
    if (this.#root) {
      const regex = /^on:(.*)/;
      if (regex.test(this.#attribute)) {
        createEvent({
          element: this.#root,
          event: this.#attribute.replace(':', ''),
          func: this.#value() as () => void,
        })
      } else {
        const value = this.#value();
        switch (this.#attribute) {
          case 'use:key':
            this.render = () => this.#root.dataset.key = this.#value() as string;
            break;
          case 'use:reference':
            if (value instanceof SignalReference) {
              value.reference = this.#root
            }
            break;
          case 'use:html':
            this.render = () => this.#root.innerHTML = this.#value() as string;
            break;
          case 'use:text':
            this.render = () => this.#root.innerHTML = this.#value() as string
            break;
          case 'value':
            this.render = () => {
              if (this.#root instanceof HTMLInputElement) {
                this.#root.value = this.#value() as string;
                this.#root.setAttribute(this.#attribute, this.#value() as string)
              }
            }

            break;
          case 'style':
            this.render = () => {
              const value = this.#value();
              this.#root.setAttribute(
                this.#attribute,
                Object.keys(value as {}).map((key) => `${key}:${(value as {})[key]}`).join(';')
              )
            }
            break;
          default:
            this.render = () => this.#root.setAttribute(this.#attribute, this.#value() as string);

        }
      }
      this.render?.();
    }
  }
}