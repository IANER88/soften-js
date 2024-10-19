import { useSignal } from "./use"
import './root.css'
export default function Root() {
  const count = useSignal(0)

  const state = useSignal([
    {
      id: crypto.randomUUID(),
      name: 'name'
    }
  ]);

  const clear = () => {
    state.value = [];
  }

  const push = () => {
    state.value.push({
      id: crypto.randomUUID(),
      name: 'name',
    })
  }

  return (
    <div>
      <div>
        {
          state.tabulate(
            item => <div use:key={item.id}>{item.name}</div>
          )
        }
      </div>
      <div>
        <button on:click={push}>push</button>
        <button on:click={clear}>clear</button>
        <button on:click={() => count.value++}>count: {count.value}</button>
      </div>
    </div>
  )
}