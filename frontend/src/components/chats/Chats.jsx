import { IconButton } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import "./Chats.css";
import Chat from "../chat/Chat";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { UIContext } from "../UIContainer";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import DeleteChatAlert from "../delete-chat-alert/DeleteChatAlert";
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
    const deleteChatRef = useRef(null);
    const chatIdRef = useRef(null);
    chatIdRef.current = chat_id;
    const navigate = useNavigate();
    
    useEffect(() => {
      socket = io("http://localhost:4000");
      socket.emit("setup", friendData);
    }, []);

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
    }, [refresh, chat_id, friendData.data.token]);
    
    useEffect(() => {
      socket.on("deleteReceiverChat", () => {
        navigate("/ui/starting");
        setRefresh(!refresh);
        socket.off("deleteReceiverChat");
      });
    }, []);

    useEffect(() => {
      socket.on("message received", (newMessage) => {
        if (newMessage.data.chat._id != chatIdRef.current) {
          socket.off("message received")
        } else {
          setAllMessages((allMessages) => [...allMessages, newMessage.data]);
          socket.off("message received")
        }    
      });
    }, []);

    const sendMessage = async () => {
        var data = null;
        const config = {
          headers: {
            Authorization: `Bearer ${friendData.data.token}`,
          },
        };
        await axios
          .post(
            "http://localhost:4000/message/",
            {
              content: messageContent,
              chatId: chat_id,
            },
            config
          )
          .then(( response ) => {
            data = response;
          });
          socket.emit("newMessage", data);
      };

    const deleteChat = () => {
      deleteChatRef.current.show();
    };
    
    if (!loaded) {
        return (
          <div className="loading">Loading...</div>
        )
    } else {
        return (
          <div className="chats-box">
            <div className="chats-header">
              <p className="friend-pfp">{chat_user[0]}</p>
              <div className="header-text">{chat_user}</div>
              <IconButton onClick={() => {
                deleteChat();
              }}>
                <ClearIcon className="delete-chat"/>
              </IconButton>
              <DeleteChatAlert ref={deleteChatRef} socket={socket} token={friendData.data.token} chat_id={chat_id}></DeleteChatAlert>
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