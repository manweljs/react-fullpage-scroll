import { Fullpage } from "./components/Fullpage"
import { Slide } from "./components/Slide"


function App() {

  return (
    <Fullpage>
      <Slide backgroundColor="#282c34">
        <h1>Slide 1</h1>
      </Slide>
      <Slide backgroundColor="green" >
        <h1>Slide 2</h1>
      </Slide>
      <Slide backgroundColor="brown">
        <h1>Slide 3</h1>
      </Slide>

      {/* <Slide backgroundColor="#ff5f45">
        <h1>Slide 4</h1>
      </Slide> */}
    </Fullpage>
  )
}

export default App
