import { useDarkScheme, useSignal } from ".";

export default function App() {

  const count = useSignal(0)
  console.log(count);

  return (
    <div>
      <span>{count.value}</span>
      <button on:click={() => count.value += 1}>+</button>
    </div>
  )
}
