// // --- jsxFactory.ts ---
// /* https://gist.github.com/borestad/eac42120613bc67a3714f115e8b485a7
//  * Custom jsx parser
//  * See: tsconfig.json
//  *
//  *   {
//  *     "jsx": "react",
//  *     "jsxFactory": "h",
//  *     "lib": [
//  *       "es2017",
//  *       "dom",
//  *       "dom.iterable"
//  *     ]
//  *   }
//  *
//  */
// interface entityMapData {
//   [key: string]: string;
// }
// export const entityMap: entityMapData = {
//   "&": "amp",
//   "<": "lt",
//   ">": "gt",
//   '"': "quot",
//   "'": "#39",
//   "/": "#x2F",
// };

// export const escapeHtml = (str: object[] | string) =>
//   String(str).replace(/[&<>"'\/\\]/g, (s) => `&${entityMap[s]};`);

// // To keep some consistency with React DOM, lets use a mapper
// // https://reactjs.org/docs/dom-elements.html
// export const AttributeMapper = (val: string) =>
// ({
//   tabIndex: "tabindex",
//   className: "class",
//   readOnly: "readonly",
// }[val] || val);

// // tslint:disable-next-line:no-default-export
// export function DOMcreateElement(
//   tag: Function | string,
//   attrs?: { [key: string]: any },
//   ...children: (HTMLElement | string)[]
// ): HTMLElement {
//   attrs = attrs || {};
//   const stack: any[] = [...children];

//   // Support for components(ish)
//   if (typeof tag === "function") {
//     attrs.children = stack;
//     return tag(attrs);
//   }

//   const elm = document.createElement(tag);

//   // Add attributes
//   for (let [name, val] of Object.entries(attrs)) {
//     name = escapeHtml(AttributeMapper(name));
//     if (name.startsWith("on") && name.toLowerCase() in window) {
//       elm.addEventListener(name.toLowerCase().substr(2), val);
//     } else if (name === "ref") {
//       val(elm);
//     } else if (name === "style") {
//       Object.assign(elm.style, val);
//     } else if (val === true) {
//       elm.setAttribute(name, name);
//     } else if (val !== false && val != null) {
//       elm.setAttribute(name, escapeHtml(val));
//     } else if (val === false) {
//       elm.removeAttribute(name);
//     }
//   }

//   // Append children
//   while (stack.length) {
//     const child = stack.shift();

//     // Is child a leaf?
//     if (!Array.isArray(child)) {
//       elm.appendChild(
//         (child as HTMLElement).nodeType == null
//           ? document.createTextNode(child.toString())
//           : child
//       );
//     } else {
//       stack.push(...child);
//     }
//   }

//   return elm;
// }

// export const DOMcreateFragment = (
//   attrs?: { [key: string]: any },
//   ...children: (HTMLElement | string)[]
// ): (HTMLElement | string)[] => {
//   return children;
// };

