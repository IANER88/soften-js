import createEvent from "@/util/create-event";
import SignalReference from "./signal-reference";

export default class SignalAttribute {

  #root: HTMLElement | null;

  #attribute: () => {};

  constructor(attribute) {
    this.#attribute = attribute;
    this.#root = null;
  }

  render = (root) => {
    if (!this.#root) this.#root = root;

    if (this.#root) {
      const regex = /^on:(.*)/;
      for (const key in this.#attribute) {
        if (regex.test(key)) {
          createEvent({
            element: this.#root,
            event: key.replace(':', ''),
            func: this.#attribute[key],
          })
        } else {
          const value = this.#attribute[key];
          switch (key) {
            case 'use:key':
              this.#root.dataset.key = value as string;
              break;
            case 'use:reference':
              if (value instanceof SignalReference) {
                value.reference = this.#root;
              }
              break;
            case 'use:html':
              this.#root.innerHTML = value as string;
              break;
            case 'use:text':
              this.#root.innerHTML = value as string
              break;
            case 'value':
              if (this.#root instanceof HTMLInputElement) {
                this.#root.value = value as string;
                this.#root.setAttribute(key, value as string)
              }
              break;
            case 'style':
              this.#root.setAttribute(
                key,
                Object.keys(value as {}).map((key) => `${key}:${(value as {})[key]}`).join(';')
              )
              break;
            default:
              this.#root.setAttribute(key, value as string)

          }
        }
      }
    }
  }
}