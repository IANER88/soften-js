class SignalTabulate {

  #root?: HTMLElement[] | Comment;

  #tabulate: () => HTMLElement[];

  constructor(tabulate) {
    this.#tabulate = tabulate;
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
    this.#root = node;
    return node;
  }

  render = () => {
    const fragment = this.#test();
    if (this.#root instanceof Comment) {
      /**
       * 有值才能渲染
       */
      this.#root.replaceWith(...fragment);
      this.#root = fragment;
      return;
    }

    // if (fragment.length) {
    //   const tabulates: HTMLElement[] = [];
    //   const len = Math.max(fragment.length, this.#root.length);
    //   for (let site = 0; site < len; site++) {
    //     const tab = fragment[site];
    //     const old = this.#root[site];
    //     let inter = old;
    //     const newly_key = tab?.dataset?.key;
    //     const old_key = old?.dataset?.key;
    //     if (!Object.is(old_key, newly_key)) {
    //       inter = tab;
    //       if (old_key === void 0) {
    //         const root = this.#root[site - 1];
    //         if (root.parentElement)
    //           root.parentElement.insertBefore(
    //             fragment[site],
    //             root.nextSibling,
    //           )
    //       } else {
    //         old.replaceWith(tab ?? '');
    //       }
    //     }
    //     tabulates.push(inter);
    //   }
    //   this.#root = tabulates;
    // } else {
    //   const comment = document.createComment('tabulate');
    //   const [root] = this.#root;
    //   console.log(root);

    //   root.replaceWith(comment);
    //   this.#root = comment;
    // }
  }
}

export default SignalTabulate;