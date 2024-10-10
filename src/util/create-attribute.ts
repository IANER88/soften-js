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
    case 'key':
      element.dataset.key = value;
      break;
    case 'value':
      if (element instanceof HTMLInputElement) {
        element.value = value;
        element.setAttribute(attribute, value)
      }
      break;
    case 'style':
      console.log(value);
      element.setAttribute(attribute, Object.keys(value).map((key) => `${key}:${value[key]}`).join(';'))
      break;
    default:
      element.setAttribute(attribute, value)
  }
}