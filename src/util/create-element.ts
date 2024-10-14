import createEvent from "./create-event";
import createAttribute from "./create-attribute";
import type { Execute } from "@/signal";
import SignalList from "@/signal/signal-list";
import SignalDetermine from "@/signal/signal-determine";
import SignalTabulate from "@/signal/signal-tabulate";

export const observers: Execute[] = [];

export type Component = [
  tag: string,
  attribute: {},
  children: [],
];

export type SoftenComponent = (() => Component);

export default function createElement(component: SoftenComponent) {
  const execute = (content?: Execute) => {
    const render = (node) => {
      const [
        tag,
        attribute,
        ...children
      ] = node;
      const element = content?.subscriber ?? document.createElement(tag);
      const attr = Object.keys(attribute ?? {});
      if (attr?.length) {
        const regex = /^on:(.*)/;
        const use = /^use:(.*)/;
        for (const key of attr) {
          if (regex.test(key)) {
            const [, event] = key.match(regex) ?? [];
            createEvent({
              element,
              event,
              func: attribute[key],
            })
          } else {
            createAttribute({
              element,
              attribute: key,
              value: attribute[key],
            })
          }
        }
      }

      if (children.length) {
        if (content) {
          if (content.sites?.length) {
            for (const site of content.sites) {
              if (site !== null) {
                children[site].root = content?.children[site].root;
                content.children[site].tabulate = children[site].tabulate;
                content.children[site].render();
              }
            }
          } else {
            console.log(element, children);

            element.innerText = children?.join('');
          }
        } else {
          const content = children.map((view, site) => {
            if (view instanceof SignalDetermine || view instanceof SignalTabulate) {
              executes.sites.push(site);
              return view.render();
            }
            return view;
          });
          element.append(...content.flat());
        }
      }
      return element;
    }
    observers.push(executes);
    try {
      const node = component();
      executes.subscriber = render(node);
      if (!executes.children.length) {
        const [
          ,
          ,
          ...children
        ] = node;
        executes.children = children;
      }
      return executes.subscriber;
    } finally {
      observers.pop();
    }
  }

  const executes: Execute = {
    observers: execute,
    subscriber: null,
    determines: new Set(),
    children: [],
    sites: [],
  }
  return execute();
}