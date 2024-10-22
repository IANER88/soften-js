import { useDisentangle, useId, useMount } from "./hooks"

export default function Root() {

  return (
    <About />
  )
}

function About() {
  useMount(() => {
    console.log('挂载about');
  })
  useDisentangle(() => {
    console.log('卸载about');

  })

  return <Home />
}

function Home() {

  const id = useId();

  useMount(() => {
    console.log('挂载home');
    console.log(document.querySelector(`.${id}`));
  })

  useDisentangle(() => {
    console.log('卸载home');
  })
  return (
    <div id="home" class={id}>home</div>
  )
}
