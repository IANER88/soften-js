import SignalContent from "@/signal/signal-content";

type Execute = {
  subscriber: SignalContent | null;
}

export const contents: Execute[] = [];

export default function createContent(content: () => string | number) {

  const execute = () => {
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

  const executes: Execute = {
    subscriber: null,
  }

  return execute();
}