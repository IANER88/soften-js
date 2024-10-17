class SignalTabulate {

  #root: HTMLElement[] | Comment;

  #tabulate = () => HTMLElement;

  constructor(tabulate) {
    this.#tabulate = tabulate;
    this.#root = document.createComment('tabulate');
  }

  #test = () => {
    const tabulates = this.#tabulate?.();
    if (tabulates.length) {
      return tabulates;
    }
    return document.createComment('tabulate');
  }

  once = () => {
    const node = this.#test();
    this.#root = node as any;
    return node;
  }

  render = () => {
    const fragment = this.#test();
    if (fragment.length) {
      // const max = Math.max(fragment.length, this.#root?.length);

      // const tabulates = [];
      // for (let site = 0; site < max; site++) {
      //   const previous = this.#root[site];
      //   const next = fragment[site];
      //   let inter = previous;
      //   const one = previous?.dataset?.key;
      //   const two = next?.dataset?.key;
      //   if (!Object.is(one, two)) {
      //     if (!one) {
      //       const last = this.#root.at(-1);
      //       inter = next;
      //       last.insertAdjacentElement('afterend', next)
      //     }

      //   }
      //   tabulates.push(inter)
      // }
      // this.#root = tabulates;
    }

    // if (this.#root instanceof Comment) {
    //   /**
    //    * 有值才能渲染
    //    */
    //   this.#root.replaceWith(...fragment);
    //   this.#root = fragment;
    //   return;
    // }
  }
}

export default SignalTabulate;