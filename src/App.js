import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Respuestas from "./components/Respuestas";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/respuestas"} element={<Respuestas />} />
      </Routes>
    </div>
  );
}

export default App;
