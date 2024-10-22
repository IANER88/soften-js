import SignalComponent from "@/signal/signal-component";
import { JSX } from "@/types/jsx-runtime";
import { Reference } from "@/hooks/use-reference";


export type Executes = { subscriber: SignalComponent | null }

type Component = (props: {}, reference: Reference | void) => JSX.Element;

type Props = {
  ['use:reference']?: Reference;
  ['use:key']?: number | string;
}
export const components: Executes[] = [];
export default function createComponent(component: Component, props: Props, ...children) {

  const {
    ['use:reference']: reference,
    ['use:key']: key,
    ...rest
  } = props ?? {};

  const program = () => component(
    Object.freeze({
      ...rest,
      children,
    }),
    reference
  )

  const execute = () => {
    if (!components.length) components.push(executes);;
    const element = new SignalComponent(program);
    executes.subscriber = element;
    return element;
  }

  const executes: Executes = {
    subscriber: null,
  }

  return execute();
}