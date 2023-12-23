import LoginRegister from "./components/login/LoginRegister"
import "./App.css";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Chats from "./components/chats/Chats";

function App() {

  const [isLogin, setLogin] = useState(true);

  return (
    <>
      <div className="App">
        <Sidebar></Sidebar>
        <Chats></Chats>
      </div>
    </>
  )
}

export default App
