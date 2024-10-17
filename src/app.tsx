import { useDisentangle, useMount, useReference, useSignal } from ".";
import useImperativeReference from "./use/use-imperative-reference";

function Home(props, reference) {

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

  list.value.tabulate((item) => {
    console.log(item);

  })

  // useImperativeReference(
  //   reference,
  //   () => ({
  //     add: () => {

  //     }
  //   })
  // );

  console.log(props);


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

const Disentangle = () => {
  useDisentangle(() => {
    console.log('销毁1');
  });
  useDisentangle(() => {
    console.log('销毁2');
  });
  const id = useReference();

  useMount(() => {
    console.log(
      document.querySelector('#id')
    );

  })
  return (
    <div use:reference={id}>Disentangle</div>
  )
}

const About = () => {
  useDisentangle(() => {
    console.log('销毁3');
  });

  const id = useReference();

  return (
    <div use:reference={id}>About</div>
  )
}

export default function App() {

  const count = useSignal(0);

  const show = useSignal(true);
  const hide = useSignal(false)

  const onclick = () => show.value = !show.value

  const onhide = () => hide.value = !hide.value;

  const input = useSignal('0');

  const id = useReference();

  useDisentangle(() => {
    console.log('销毁4');
  });

  useMount(() => {
    console.log(document.querySelector('#id'));
  })

  return (
    <div>
      <Home show={show} use:key="1" id="id">
        <input
          on:input={(event) => input.value = event.target.value}
          value={input.value}
        />
      </Home>
      <div>1{show.value ? <About /> : <Disentangle />}</div>
      <span>{count.value}</span>
      <div>
        {input.value}
        {
          hide.value && <span style={{ color: show.value ? 'red' : 'blue', background: 'green', height: count.value + 'px' }}>
            {input.value}
          </span>
        }
      </div>
      <button on:click={onclick}>show</button>
      <button on:click={onhide}>hide</button>
      <button on:click={() => count.value += 1}>{count.value}2</button>
    </div>
  )
}
