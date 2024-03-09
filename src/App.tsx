import { FullPage } from "./components/FullPage"
import { Slide } from "./components/Slide"

const pages = [
  { backgroundColor: "#282c34" },
  { backgroundColor: "green" },
  { backgroundColor: "brown" },
  { backgroundColor: "#ff5f45" },
  { backgroundColor: "grey" },
  { backgroundColor: "red" },
  { backgroundColor: "pink" },
  { backgroundColor: "purple" },
]

function App() {

  return (
    <FullPage type="card">
      {pages.map((page, index) => (
        <Slide key={index} backgroundColor={page.backgroundColor}>
          <h1>Slide {index + 1}</h1>
        </Slide>
      ))}
    </FullPage>
  )
}

export default App
