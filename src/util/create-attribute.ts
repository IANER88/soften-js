import SignalReference from "@/signal/signal-reference";

type Options = {
  value: unknown;
  element: HTMLElement | HTMLInputElement;
  attribute: string;
}

export default function createAttribute(options: Options) {

  const {
    attribute,
    element,
    value,
  } = options

  switch (attribute) {
    case 'use:key':
      element.dataset.key = value as string;
      break;
    case 'use:reference':
      if (value instanceof SignalReference){
        value.reference = element;
      }
      break;
    case 'value':
      if (element instanceof HTMLInputElement) {
        element.value = value as string;
        element.setAttribute(attribute, value as string)
      }
      break;
    case 'style':
      element.setAttribute(
        attribute, 
        Object.keys(value as {}).map((key) => `${key}:${(value as {})[key]}`).join(';')
      )
      break;
    default:
      element.setAttribute(attribute, value as string)
  }
}