import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    let isAuthenticated = localStorage.getItem("isLogged");

    return (
        isAuthenticated != true ? <Navigate to="/" /> : <Outlet/>
    )
}

export default ProtectedRoutes;