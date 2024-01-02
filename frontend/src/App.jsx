import LoginRegister from "./components/login/LoginRegister"
import "./App.css";
import Chats from "./components/chats/Chats";
import { Route, Routes } from "react-router-dom";
import UIContainer from "./components/UIContainer";
import Starting from "./components/starting/Starting";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Friends from "./components/friends/Friends";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="ui" element={<UIContainer/>}>
            <Route path="starting" element={<Starting />}/>
            <Route path="chat/:_id" element={<Chats />}/>
            <Route path="friends" element={<Friends/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;