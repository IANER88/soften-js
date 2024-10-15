type Options = {
  event: string;
  func: () => void;
  element: Element;
}

export default function createEvent(options: Options) {
  const {
    event,
    func,
    element,
  } = options;
  
  element[event] = func;
  // for (const event of on) {
  //   if (event === 'change' && node.tag === 'input') {
  //     createInput({ element, node, event })
  //   } else {
  //     element.addEventListener(event, node.on[event])
  //   }
  // }
}