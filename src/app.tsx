import { useSignal } from ".";

function Home(props) {

  const {
    children,
    show,
  } = props;

  const list = useSignal(
    [1, 2, 3].map((...[, index]) => ({
      name: index,
      id: crypto.randomUUID()
    }))
  );

  const on = {
    push() {
      list.value.push({
        name: 1,
        id: crypto.randomUUID(),
      })
    },
    unshift() {
      list.value.unshift({
        name: 1,
        id: crypto.randomUUID(),
      })
    },
    pop() {
      list.value.pop();
    }
  }

  return (
    <div>
      <div>
        {
          show.value ?
            children :
            list.value.tabulate((item) => <div use:key={item.id}>{item.name}</div>)
        }
      </div>
      <div>
        <button on:click={on.unshift}>unshift</button>
        <button on:click={on.push}>push</button>
        <button on:click={on.pop}>pop</button>
      </div>
    </div>
  )
}

export default function App() {

  const count = useSignal(0);

  const show = useSignal(true);
  const hide = useSignal(false)

  const onclick = () => show.value = !show.value

  const onhide = () => hide.value = !hide.value;

  const input = useSignal('0');

  return (
    <div>
      <Home show={show}>
        <input
          on:input={(event) => input.value = event.target.value}
          value={input.value}
        />
      </Home>
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
