import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../UIContainer";
import "./Friends.css";

function Friends () {
    const [friends, setFriends] = useState([]);
    const friendData = JSON.parse(localStorage.getItem("friendData"));
    const navigate = useNavigate();
    const { refresh, setRefresh } = useContext(UIContext);

    if (!friendData) {
      navigate("/");
    }

    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${friendData.data.token}`,
        },
      };
      axios.get("http://localhost:4000/friend/getFriends", config).then((data) => {
        setFriends(data.data);
      });
    }, [refresh]);

    return (
      <div className="friend-list">
        {friends.map((friend, index) => {
            return (
              <div
                className="friend-list-item"
                key={index}
                onClick={async () => {
                  const config = {
                    headers: {
                      Authorization: `Bearer ${friendData.data.token}`,
                    },
                  };
                  await axios.post(
                    "http://localhost:4000/chat/",
                    {
                      userId: friend._id,
                    },
                    config
                  );
                  setRefresh(!refresh);
                }}
              >
                <p className="friend-pfp">{friend.name[0]}</p>
                <p className="friend-title">
                  {friend.name}
                </p>
              </div>
            );
          })}
      </div>
    )
}
export default Friends; 