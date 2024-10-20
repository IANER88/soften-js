import SignalComponent from "@/signal/signal-component";
import { JSX } from "@/types/jsx-runtime";
import { Reference } from "@/use/use-reference";

type Component = (props: {}, reference: Reference) => JSX.Element;

type Props = {
  ['use:reference']: Reference;
  ['use:key']: number | string;
}

export default function createComponent(component: Component, props: Props, ...children) {

  const {
    ['use:reference']: reference,
    ['use:key']: key,
    ...rest
  } = props ?? {};


  const element = new SignalComponent(
    () => component(
      {
        ...rest,
        children,
      },
      reference
    )
  );
  
  return element;
}