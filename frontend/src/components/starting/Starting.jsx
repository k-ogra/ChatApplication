import "./Starting.css";
import { useNavigate } from "react-router-dom";

function Starting() {
    const friendData = JSON.parse(localStorage.getItem("friendData"));
    const navigate = useNavigate();

    if (!friendData) {
        navigate("/");
    }

    return (
        <div className="starting">
            Click on a Friend or Add a Friend to chat. 
        </div>
    )
}
export default Starting;