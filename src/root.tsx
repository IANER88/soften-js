import { useMount, useRecrudescence, useSignal } from "./use"
import './root.css'
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

  const int = useSignal({
    count: 0,
    latest: 9,
  })

  console.log(int);
  

  return (
    <div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button on:click={() => count.value++}>
          count is {count.value}
        </button>
        <button on:click={() => int.value.count++}>
          int: {int.value.count}
        </button>
        <button on:click={() => int.value.latest++} id={int.value.count}>
          int latest: {int.value.latest}
        </button>
      </div>
      <p class="read-the-docs">
        {count.value}
      </p>
    </div>
  )
}