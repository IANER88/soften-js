import SignalAttribute from "@/signal/signal-attribute";

type Attribute = {
  subscriber: null | SignalAttribute
}

export const attributes: Attribute[] = [];

export default function createAttribute(attribute) {

  const execute = () => {
    attributes.push(executes);
    try {
      const root = attribute()
      const subscriber = new SignalAttribute(attribute);
      executes.subscriber = subscriber;

      return subscriber
    } finally {
      attributes.pop();
    }
  }

  const executes: Attribute = {
    subscriber: null,
  }

  return execute();
}