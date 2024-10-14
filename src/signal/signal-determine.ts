import SignalTabulate from "./signal-tabulate";

class SignalDetermine {

  root: (Element | Comment)[] | Element | Comment;

  view: () => Element | string;

  constructor(view) {
    this.view = view;
    const comment = document.createComment('determine');
    this.root = comment;
    return this
  }

  render = () => {
    const element = this.view();
    if ([void 0, null, false].includes(element)) {
      const comment = document.createComment('determine');
      this.root.replaceWith(comment);
      this.root = comment;
    } else {
      const fragment = ['number', 'string'].includes(typeof element)
        ? document.createTextNode(element) :
        element instanceof SignalTabulate ? element.render() : element;
      const node = fragment instanceof Array ? fragment : [fragment];
      if (this.root instanceof Array) {
        /**
         * 标记空节点
         */
        const comment = document.createComment('determine');
        this.root.map((view, site) => {
          if (site === this.root.length - 1) {
            view.replaceWith(...(node?.length ? node : [comment]))
          } else {
            view.replaceWith('')
          }
        })
        this.root = node?.length ? node : [comment]
        console.log(this.root);

      } else {
        this.root.replaceWith(...(node));
        this.root = fragment;
      }
    }
    return this.root;
  }
}

export default SignalDetermine;