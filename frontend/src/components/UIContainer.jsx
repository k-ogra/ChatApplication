import { Outlet } from "react-router-dom";
import Chats from "./chats/Chats";
import Sidebar from "./sidebar/Sidebar";
import Starting from "./starting/Starting";

function UIContainer() {
    return  (
        <>
            <Sidebar></Sidebar>
            <Outlet />
        </>
    )
}

export default UIContainer;