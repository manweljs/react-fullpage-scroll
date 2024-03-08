import { Fullpage } from "./components/Fullpage"
import { Slide } from "./components/Slide"


function App() {

  return (
    <Fullpage>
      <Slide>
        <h1>Slide 1</h1>
      </Slide>
      <Slide>
        <h1>Slide 2</h1>
      </Slide>
      <Slide>
        <h1>Slide 3</h1>
      </Slide>
    </Fullpage>
  )
}

export default App
