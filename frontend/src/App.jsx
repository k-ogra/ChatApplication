import LoginRegister from "./components/login/LoginRegister"
import "./App.css";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
function App() {

  const [isLogin, setLogin] = useState(true);

  return (
    <>
      <div className="App">
        <Sidebar></Sidebar>
      </div>
    </>
  )
}

export default App
