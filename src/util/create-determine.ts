import SignalDetermine from "@/signal/signal-determine";
import { JSX } from "@/types/jsx-runtime";

export const determine = [];

type Condition = () => JSX.Element;

export default function createDetermine(condition: Condition) {



  return new SignalDetermine(condition);
}