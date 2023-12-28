import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import Friend from "../friend/Friend";
import axios from "axios";
import { UIContext } from "../UIContainer";
import { useContext, useEffect, useState } from "react";

function Sidebar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem("friendData", null);
        navigate('/');
    }
    const showFriends = () => {
      navigate("friends");
    }
    const { refresh, setRefresh } = useContext(UIContext);
    const [conversations, setConversations] = useState([]);
    const friendData = JSON.parse(localStorage.getItem("friendData"));

    if (!friendData) {
        console.log("Friend not Authenticated");
        navigate("/");
    }
    const friend = friendData.data;

    useEffect(() => {
        const config = {
          headers: {
            Authorization: `Bearer ${friend.token}`,
          },
        };
    
        axios.get("http://localhost:4000/chat/", config).then((response) => {
          console.log("Sidebar refresh", response.data);
          setConversations(response.data);
        });
      }, [refresh]);

    return (
      <div className="sidebar-box">
        <div className="sidebar-header">
          <IconButton onClick={showFriends}> 
            <PersonAddIcon className="button"></PersonAddIcon>
            <div className="button-text">Add Friend</div>
          </IconButton>
          <IconButton onClick={logout}> 
              <LogoutIcon className="button" ></LogoutIcon>
              <div className="button-text">Logout</div>
          </IconButton>
        </div>
        <div className="sidebar-friends">
          {conversations.map((conversation, index) => {
          var friendName = "";
          conversation.friends.map((friend) => {
          if (friend._id != friendData.data._id) {
            friendName = friend.name;
          }});
          if (conversation.friends.length === 1) {
            return <div key={index}></div>;
          }
          if (conversation.mostRecent === undefined) {
            return (
              <div
                key={index}
                onClick={() => {
                console.log("Sidebar refresh");
                setRefresh(!refresh);
              }}>
                <div
                  key={index}
                  className="sidebar-friends"
                  onClick={() => {
                    navigate("chat/" + conversation._id + "&" + friendName);
                  }}>
                  <Friend props={[friendName[0], friendName]}></Friend>
                </div>
              </div>);
            } else {
              return (
                <div
                key={index}
                className="sidebar-friends"
                onClick={() => {
                  navigate("chat/" + conversation._id + "&" + friendName);
                }}>
                <Friend props={[friendName[0], friendName]}></Friend>
                </div>);
            }
        })}        
        </div>               
      </div>
    );
}
export default Sidebar;