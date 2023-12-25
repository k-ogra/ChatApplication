import "./Starting.css";
import { useNavigate } from "react-router-dom";

function Starting() {
    const friendData = JSON.parse(localStorage.getItem("friendData"));
    const navigate = useNavigate();

    if (!friendData) {
        console.log("Friend not Authenticated");
        navigate("/");
    }

    return (
        <>
            <div className="starting">
                Click or add a friend to get started. 
            </div>
        </>
    )
}

export default Starting;