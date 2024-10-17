export default class SignalContent {

  #root?: Comment | Element;

  #test = (content) => {
    const node = [null, void 0, false].includes(content);
    if (node) {
      return document.createComment('content')
    } else {
      return document.createTextNode(content);
    }
  }

  #content: () => false | null | string | number | void;
  constructor(content) {
    this.#content = content;
  }

  once = () => {
    const node = this.#test(this.#content());
    this.#root = node;
    return this.#root;
  }

  render = () => {
    const node = this.#test(this.#content());
    console.log(node);
    
    this.#root?.replaceWith(node)
    this.#root = node;
  }
}