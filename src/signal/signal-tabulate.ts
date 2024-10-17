class SignalTabulate {

  root?: HTMLElement[] | Comment;

  tabulate: HTMLElement[];

  constructor(...tabulate) {
    this.tabulate = tabulate;
    // const comment = document.createComment('tabulate');
    // this.root = comment;
  }

  once = () => {
    const tabulates = this.tabulate;
    if (tabulates.length) {
      return this.tabulate;
    }
    return document.createComment('tabulate');
  }

  render = () => {
    /**
     * 初次渲染
     */
    const fragment = this.once();
    if (this.root instanceof Comment) {
      /**
       * 有值才能渲染
       */
      this.root.replaceWith(...fragment);
      this.root = this.tabulate;
    } else {
      if (this.tabulate.length) {
        const tabulates: HTMLElement[] = [];
        // const len = Math.max(this.tabulate.length, this.root.length);
        // for (let site = 0; site < len; site++) {
        //   const tab = this.tabulate[site];
        //   const old = this.root[site];
        //   let inter = old;
        //   const newly_key = tab?.dataset?.key;
        //   const old_key = old?.dataset?.key;

        //   if (!Object.is(old_key, newly_key)) {
        //     inter = tab;
        //     if (old_key === void 0) {
        //       const root = this.root[site - 1];
        //       if (root.parentElement)
        //         root.parentElement.insertBefore(
        //           this.tabulate[site],
        //           root.nextSibling,
        //         )
        //     } else {
        //       old.replaceWith(tab ?? '');
        //     }
        //   }
        //   tabulates.push(inter);
        // }
        this.root = tabulates;
      } else {
        const comment = document.createComment('tabulate');
        const [root] = this.root;
        root.replaceWith(comment);
        this.root = comment;
      }
    }

    return this.root;
  }
}

export default SignalTabulate;