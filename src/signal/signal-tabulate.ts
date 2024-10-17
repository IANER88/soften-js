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
    this.#root = node;
    return node;
  }

  render = () => {
    const fragment = this.#test();
    if (fragment.length) {
      const max = Math.max(fragment.length, this.#root?.length);

      const tabulates = [];
      for (let site = 0; site < max; site++) {
        const previous = this.#root[site];
        const next = fragment[site];
        let inter = previous;
        const one = previous?.dataset?.key;
        const two = next?.dataset?.key;
        console.log(one, two);
        
        if (!Object.is(one, two)) {
          if (!one) {
            const last = this.#root.at(-1);
            inter = next;
            last.insertAdjacentElement('afterend', next)
          }

        }
        tabulates.push(inter)
      }
      this.#root = tabulates;
    }

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