import { useMount, useRecrudescence, useSignal } from "./use"

export default function Root() {

  const count = useSignal(0);

  const name = useSignal([
    {
      name: '一',
      id: crypto.randomUUID(),
    }
  ])

  useRecrudescence(() => {
    console.log(name.value.at(0));
  })

  useMount(() => {
    console.log(
      document.querySelector('#id')
    );
  })

  const push = () => {
    name.value.push({
      name: 'push',
      id: crypto.randomUUID(),
    })
  }

  const unshift = () => {
    name.value.unshift({
      name: 'unshift',
      id: crypto.randomUUID(),
    })
  }

  return (
    <div id="id">
      <div style={{
        display: 'flex'
      }}>
        {
          name.tabulate(
            item => <div use:key={item.id}>{item.name}</div>
          )
        }
        {
          name.value.at(-1).name
        }
      </div>
      <div>
        <button on:click={() => count.value++}>
          count: {count.value}
        </button>
        <button on:click={push}>
          push
        </button>
        <button on:click={unshift}>unshift</button>
      </div>
    </div>
  )
}