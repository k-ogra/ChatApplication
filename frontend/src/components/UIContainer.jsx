import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import Sidebar from "./sidebar/Sidebar";

export const UIContext = createContext();
function UIContainer() {

    const [refresh, setRefresh] = useState(true);

    return  (
        <>
            <UIContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
                <Sidebar></Sidebar>
                <Outlet />
            </UIContext.Provider>
        </>
    )
}

export default UIContainer;