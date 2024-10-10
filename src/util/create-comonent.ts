import { JSX } from "@/types/jsx-runtime";

type Component = (props: {}) => JSX.Element

export default function createComponent(comonent: Component, props: {}, ...children) {
  const element = comonent({
    ...props,
    children,
  });
  // const fragment = new DocumentFragment();
  // const root = document.createElement('div');
  // fragment.append(root);

  // console.log(content);
  return element;
}