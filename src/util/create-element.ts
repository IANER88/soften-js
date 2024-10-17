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

export default function createElement(tag, attribute, ...children) {
  const execute = () => {
    const element = document.createElement(tag);
    const attr = Object.keys(attribute ?? {});

    if (attr?.length) {
      for (const key of Object.keys(attribute)) {
        const view = attribute[key]
        view.once(element, key);
      }
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

  const executes: Execute = {
    subscriber: null,
  }
  return execute();
}