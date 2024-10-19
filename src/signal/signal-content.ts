export default class SignalContent {

  #root?: Comment | Element;

  #latest?: null | number | false | string;

  #oldest?: null | number | false | string;

  #test = (content) => {
    this.#oldest = this.#latest;
    const node = [null, void 0, false].includes(content);
    return node ? document.createComment('content') : document.createTextNode(content);
  }

  #content: () => false | null | string | number | void;
  constructor(content) {
    this.#content = () => {
      this.#latest = content();
      return this.#latest;
    };
  }

  once = () => {
    const node = this.#test(this.#content());
    this.#root = node;
    return this.#root;
  }

  render = () => {
    const latest = this.#content();
    if (!Object.is(this.#oldest, latest)) {
      const node = this.#test(latest);
      this.#root?.replaceWith(node)
      this.#root = node;
    }
  }
}