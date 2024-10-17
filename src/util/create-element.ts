import type { Execute } from "@/signal";
import SignalDetermine from "@/signal/signal-determine";
import SignalComponent from "@/signal/signal-component";
import SignalContent from "@/signal/signal-content";

export const observers: Execute[] = [];

export type Component = [
  tag: string,
  attribute: {},
  children: [],
];

export type SoftenComponent = (() => Component);

export default function createElement(component: SoftenComponent) {
  const execute = () => {
    const render = (node) => {
      const [
        tag,
        attribute,
        ...children
      ] = node;
      const element = document.createElement(tag);
      const attr = Object.keys(attribute ?? {});

      if (attr?.length) {
        attribute.render(element);
      }
      if (children.length) {
        const content = children.flatMap((view) => {
          const node = view instanceof SignalContent ||
            view instanceof SignalDetermine
          if (node) return view.once();
          if (view instanceof SignalComponent) return view.render();
          return view;
        })
        element.append(...content)
      }
      return element;
    }
    observers.push(executes);
    try {
      const node = component();
      executes.subscriber = render(node);
      return executes.subscriber;
    } finally {
      observers.pop();
    }
  }

  const executes: Execute = {
    observers: execute,
    subscriber: null,
  }
  return execute();
}