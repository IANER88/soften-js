import { useId, useSignal } from "./use"
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

  const show = useSignal(false)

  return (
    <div>
      <div>
        {
          state.tabulate(
            item => <div use:key={item.id} id={count.value}>{item.name}</div>
          )
        }
      </div>
      <div>
        <div>
          {
            show.value ? <div >show</div> : <div id={count.value}>hide: {count.value}</div>
          }
        </div>
        <button on:click={() => show.value = !show.value}>show</button>
        <button on:click={push}>push</button>
        <button on:click={clear}>clear</button>
        <button on:click={() => {
          count.value++
          console.log(count);

        }}>count: {count.value}</button>
      </div>
    </div>
  )
}