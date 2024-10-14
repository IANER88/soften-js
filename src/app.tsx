import { useSignal } from ".";

export default function App() {

  const count = useSignal(0)

  const list = useSignal(Array.from({ length: 3 }).map((...[, index]) => ({
    name: index,
    id: crypto.randomUUID()
  })));

  const show = useSignal(true);
  const hide = useSignal(false)

  const onclick = () => show.value = !show.value

  const onhide = () => hide.value = !hide.value;

  const input = useSignal('0');

  return (
    <div>
      {
        show.value ?
          <input
            on:input={(event) =>
              input.value = event.target.value}
            value={input.value}
          /> :
          list.value.tabulate((item) => <div use:key={item.id}>{item.name}</div>)
      }
      {list.value.tabulate((item) => <div use:key={item.id}>{item.name}</div>)}
      <button
        on:click={() => list.value.push({
          name: 1,
          id: crypto.randomUUID(),
        })}
      >
        push
      </button>
      <button on:click={() => list.value.pop()}>pop</button>
      <button on:click={() => list.value.unshift({
        name: 1,
        id: crypto.randomUUID(),
      })}>unshift</button>
      <div>1{show.value ? '显示' : '隐藏'}</div>
      <div>
        {input.value}
        {
          hide.value && <span style={{ color: show.value ? 'red' : 'blue' }}>
            {input.value}
          </span>
        }
      </div>
      <button on:click={onclick}>show</button>
      <button on:click={onhide}>hide</button>
    </div>
  )
}
