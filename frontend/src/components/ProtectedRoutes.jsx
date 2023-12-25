import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const isAuthenticated = localStorage.getItem("friendData");
    return (
        isAuthenticated == "null" ? <Navigate to="/"/> : <Outlet/>
    )
}

export default ProtectedRoutes;