import LoginRegister from "./components/login/LoginRegister"
import "./App.css";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Chats from "./components/chats/Chats";
import { Route, Routes } from "react-router-dom";
import UIContainer from "./components/UIContainer";
import Starting from "./components/starting/Starting";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {

  const [isLogin, setLogin] = useState(true);

  return (
    <>
      <div className="App">
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route>
          <Route path="ui" element={<UIContainer />}>
            <Route path="starting" element={<Starting />}/>
            <Route path="chat" element={<Chats />}/>
          </Route>
        </Route>

        
      </Routes>
      </div>
    </>
  );
}

export default App;
