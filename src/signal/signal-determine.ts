import { Disentangle } from "@/use/use-disentangle";
import SignalComponent from "./signal-component";
import SignalTabulate from "./signal-tabulate";
import { JSX } from "@/types/jsx-runtime";

class SignalDetermine {

  root: Element[] | Element | Comment | JSX.ArrayElement;

  view: () => Element | string | null;

  disentangles: Set<Disentangle>;

  constructor(view) {
    this.view = view;
    const comment = document.createComment('determine');
    this.root = comment;
    this.disentangles = new Set();
    return this
  }

  render = () => {
    const element = this.view();
    if ([void 0, null, false].includes(element as null)) {
      if (this.root instanceof Comment) return this.root;
      const comment = document.createComment('determine');
      (this.root as unknown as Comment).replaceWith(comment);
      this.root = comment;
      return this.root;
    }

    const fragment = ['number', 'string'].includes(typeof element)
      ? document.createTextNode(element as string) :
      (element instanceof SignalTabulate || element instanceof SignalComponent) ?
        element.render() :
        element;

    const node = fragment instanceof Array ? fragment : [fragment];
    
    /**
     * 卸载组件
     */
    if (this.disentangles.size){
      for(const disentangle of this.disentangles){
        disentangle();
      }
      this.disentangles = new Set();
    }
    /**
     * 判断是组件，收集卸载生命周期和执行挂载
     */
    if (element instanceof SignalComponent) {
      this.disentangles = element.disentangles;
    }

    if (this.root instanceof Array) {
      /**
       * 标记空节点
       */
      const comment = document.createComment('determine');
      this.root.forEach((view: any, site) => {
        if (site === (this.root as any).length - 1) {
          view.replaceWith(...((node?.length ? node : [comment])))
        } else {
          view.replaceWith('')
        }
      })
      this.root = node?.length ? node : [comment]
    } else {
      this.root.replaceWith(...(node as any));
      this.root = fragment as any;
    }

    return this.root;
  }
}

export default SignalDetermine;