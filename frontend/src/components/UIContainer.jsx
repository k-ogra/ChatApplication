import { Outlet, useNavigate } from "react-router-dom";
import Chats from "./chats/Chats";
import Sidebar from "./sidebar/Sidebar";
import Starting from "./starting/Starting";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

function UIContainer() {
    return  (
        <>
            <Sidebar></Sidebar>
            <Outlet />
        </>
    )
}

export default UIContainer;