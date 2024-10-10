import createEvent from "./create-event";
import createAttribute from "./create-attribute";
import type { Execute } from "@/signal";

export const observers: Execute[] = [];
const determine = new Set();
export type Component = [
  tag: string,
  attribute: {},
  children: [],
];

export type SoftenComponent = (() => Component);

export default function createElement(component: SoftenComponent) {

  const execute = (content?: Element) => {
    const render = (node) => {
      const [
        tag,
        attribute,
        ...children
      ] = node;
      const element = content ?? document.createElement(tag);
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
          } else if (use.test(key)) {
            const determine_if = /^use:if$/.test(key);
            const determine_else = /^use:else$/.test(key);
            const determine_elif = /^use:elif$/.test(key);
            const list = [...determine]
            if (determine_if) {
              determine.add({
                condition: attribute[key],
                element,
              });
            }

            if (determine_else && !list[0]) {
              throw `use:else cannot be before use:if`
            }
            if (determine_elif && !list[0]) {
              throw `use:elif cannot be before use:if`
            }
            if (determine_else) {
              determine.add({
                condition: false,
                element,
              })
            }
            if (
              determine_elif
            ) {
              determine.add({
                condition: attribute[key],
                element,
              })
            }
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
          const [list] = children

          if (list instanceof Array) {
            const array = [...element.children];
            const len = Math.max(list.length, array.length);

            for (let i = 0; i < len; i++) {
              const one = array[i];
              const two = list[i];
              const one_key = one?.dataset.key;
              const two_key = two?.dataset.key;
              if (!Object.is(one_key, two_key)) {
                if (one) {
                  one?.replaceWith(
                    two ?? ''
                  )
                }
                if (one_key === void 0) {
                  element.append(two);
                }
              }
            }
          } else {
            if (children.find((item) => item.nodeName)) {
              console.log(children);

              throw `Ensure that signal value is in jsx`
            } else {
              element.innerText = children?.join('');
            }
          }
        } else {
          element.append(...children.flat());
        }
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
    determines: new Set(),
  }

  return execute();
}