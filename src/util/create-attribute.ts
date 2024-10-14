type Options = {
  value: string;
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
      element.dataset.key = value;
      break;
    case 'value':
      if (element instanceof HTMLInputElement) {
        element.value = value;
        element.setAttribute(attribute, value)
      }
      break;
    case 'style':
      element.setAttribute(attribute, Object.keys(value).map((key) => `${key}:${value[key]}`).join(';'))
      break;
    default:
      element.setAttribute(attribute, value)
  }
}