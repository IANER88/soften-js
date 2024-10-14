class SignalTabulate {

  root: HTMLElement[] | Comment;

  tabulate: HTMLElement[];

  constructor(...tabulate) {
    this.tabulate = tabulate;
    const comment = document.createComment('tabulate');
    this.root = comment;
  }

  render = () => {
    /**
     * 初次渲染
     */
    if (this.root instanceof Comment) {
      /**
       * 有值才能渲染
       */
      if (this.tabulate.length) {
        const fragment = document.createDocumentFragment();
        fragment.append(...this.tabulate);
        this.root.replaceWith(fragment);
        this.root = this.tabulate;
      }
    } else {
      if (this.tabulate.length) {
        const tabulates: HTMLElement[] = [];
        const len = Math.max(this.tabulate.length, this.root.length);
        for (let site = 0; site < len; site++) {
          const tab = this.tabulate[site];
          const old = this.root[site];
          let inster = old;
          const newly_key = tab?.dataset?.key;
          const old_key = old?.dataset?.key;

          if (!Object.is(old_key, newly_key)) {
            inster = tab;
            if (old_key === void 0) {
              const root = this.root[site - 1];
              if (root.parentElement)
                root.parentElement.insertBefore(
                  this.tabulate[site],
                  root.nextSibling,
                )
            } else {
              old.replaceWith(tab ?? '');
            }
          }
          tabulates.push(inster);
        }
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