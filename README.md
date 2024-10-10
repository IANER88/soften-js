# soften-js

一个类似简易、无虚拟节点、不会重复渲染组件的前端构建库

#构建应用

构建应用程序，呈现视图

````tsx
export default function App() {
  return (
    <div>1<div>
  )
}
````

```tsx
import { createRoot } form 'soften-js';

createRoot(<App />).mount('#app');
```
## 使用状态

使用 useSignal 修改状态，更改视图

```tsx
import { useSignal } from 'soften-js'

export default function App(){

  const count = useSignal(0);

  const onclick = () => {
		count.value += 1;
  }

  return (
    <div>
       <span>{count.value}</span>
       <button on:click={onclick}>+</button>
    </div>
  );
}

```
