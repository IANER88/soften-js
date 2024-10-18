import { useMount, useRecrudescence, useSignal } from "./use"

export default function Root() {

  const count = useSignal(0);

  const name = useSignal([
    // {
    //   name: '一',
    //   id: crypto.randomUUID(),
    // }
  ])

  useRecrudescence(() => {
    console.log(name.value.at(0));
  })

  useMount(() => {
    console.log(
      document.querySelector('#id')
    );
  })
  let int = 0;
  const push = () => {
    name.value.push({
      name: int++,
      id: crypto.randomUUID(),
    })
  }

  const unshift = () => {
    name.value.unshift({
      name: 'unshift',
      id: crypto.randomUUID(),
    })
  }

  const splice = () => {
    name.value.splice(0, 0, {
      name: 'splice',
      id: crypto.randomUUID()
    })
  }

  const pop = () => {
    name.value.pop();
  }

  const clear = () => {
    name.value.length = 0;
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
        {/* {
          count.tabulate()
        } */}
      </div>
      <div>
        <div>
          <span>数组</span>
          <div>
            <button on:click={push}>
              push
            </button>
            <button on:click={unshift}>
              unshift
            </button>
            <button on:click={splice}>splice</button>
            <button on:click={pop}>pop</button>
            <button on:click={clear}>clear</button>
          </div>
        </div>
        <button on:click={() => count.value++}>
          count: {count.value}
        </button>
      </div>
    </div>
  )
}