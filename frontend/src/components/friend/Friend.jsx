import "./Friend.css";
function Friend({props}) {
    return (
        <div className="friend">
            <p className="friend-pfp">{props[0]}</p>
            {props[1]}
        </div>   
    )
}

export default Friend;