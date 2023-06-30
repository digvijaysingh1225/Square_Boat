
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ClassComponent from "./components/ClassComponent";
import FunctionComponent from "./components/FunctionComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route path="/class" element={<ClassComponent />}></Route>
        <Route path="/function" element={<FunctionComponent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;