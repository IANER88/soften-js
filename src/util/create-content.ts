import SignalContent from "@/signal/signal-content";

export const contents = [];

export default function createContent(content: () => string | number) {

  const execute = (node) => {
    contents.push(executes);
    try {
      content()
      const subscriber = new SignalContent(content);
      executes.subscriber = subscriber;
      return subscriber;
    } finally {
      contents.pop();
    }
  }

  const executes = {
    subscriber: null,
  }

  return execute();
}