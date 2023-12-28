import { IconButton } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import "./Chats.css";
import Chat from "../chat/Chat";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UIContext } from "../UIContainer";
import io from "socket.io-client";

var socket;
function Chats() {
    const [messageContent, setMessageContent] = useState("");
    const dyParams = useParams();
    const [chat_id, chat_user] = dyParams._id.split("&");
    const friendData = JSON.parse(localStorage.getItem("friendData"));
    const [allMessages, setAllMessages] = useState([]);
    const { refresh, setRefresh } = useContext(UIContext);
    const [loaded, setloaded] = useState(false);
    const [allMessagesCopy, setAllMessagesCopy] = useState([]);
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

    useEffect(() => {
      socket = io("http://localhost:4000");
      socket.emit("setup", friendData);
      socket.on("connection", () => {
        setSocketConnectionStatus(!socketConnectionStatus);
      });
    }, []);

    useEffect(() => {
      socket.on("message received", (newMessage) => {
        if (allMessagesCopy && allMessagesCopy._id === newMessage._id) {
          setAllMessages([...allMessages], newMessage);
        }
      });
    });

    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${friendData.data.token}`,
        },
      };
      axios.get("http://localhost:4000/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        socket.emit("join chat", chat_id);
      });
      setAllMessagesCopy(allMessages);

    }, [refresh, chat_id, friendData.data.token, allMessages]);

    const sendMessage = () => {
        var data = null;
        const config = {
          headers: {
            Authorization: `Bearer ${friendData.data.token}`,
          },
        };
        axios
          .post(
            "http://localhost:4000/message/",
            {
              content: messageContent,
              chatId: chat_id,
            },
            config
          )
          .then(({ response }) => {
            data = response;
            console.log("Message sent");
          });
        socket.emit("newMessage", data);
      };

    useEffect(() => {
        console.log("Refreshed friends");
        const config = {
          headers: {
            Authorization: `Bearer ${friendData.data.token}`,
          },
        };
        axios
          .get("http://localhost:4000/message/" + chat_id, config)
          .then(({ data }) => {
            setAllMessages(data);
            setloaded(true);
          });
    }, [refresh, chat_id, friendData.data.token]);

    if (!loaded) {
        return (
          <div>Loading...</div>
        )
    } else {
        return (
          <div className="chats-box">
            <div className="chats-header">
              <p className="friend-pfp">{chat_user[0]}</p>
              <div>{chat_user}</div>
            </div>
            <div className="chats"> 
                {allMessages.slice(0).reverse().map((message, index) => {
                    return <Chat props={message} key={index}></Chat>
                }
                )}
            </div>
            <div className="message">
              <input placeholder={"Message " + chat_user} className="message-input" value={messageContent} 
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
              if (event.code == "Enter") {
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }}}/>
              <IconButton onClick={() => {
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }}>
                <MessageIcon className="message-icon"/>
              </IconButton>
            </div>
          </div>
        )
    }
}

export default Chats;