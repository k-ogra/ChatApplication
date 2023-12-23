import { IconButton } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import "./Chats.css";
import Chat from "../chat/Chat";

function Chats() {
    return (
        <>
                <div className="chats-box">
                    <div className="chats-header">
                        <p className="friend-pfp">t</p>
                        <div>Test</div>
                    </div>
                    <div className="chats">
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>
                        <Chat></Chat>

                    </div>
                    <div className="message">
                        <input placeholder="Message Test" className="message-input"></input>
                        <IconButton>
                            <MessageIcon className="message-icon"/>
                        </IconButton>
                    </div>
                </div>
        </>
    )
}

export default Chats;