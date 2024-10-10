import { createRoot, useDarkScheme } from ".";

function App() {

  const scheme = useDarkScheme();
  console.log(scheme);

  return (
    <div>

    </div>  
  )
}

createRoot(<App />).mount('#app');