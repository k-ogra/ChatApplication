import "./Chat.css";

function Chat({props}) {
    const messageDate = new Date(props.createdAt);
    const dateOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
      };
    const formattedMessageDate = messageDate.toLocaleString("en-US", dateOptions);

    return (
        <div className="chat">
            <div className="user-info">
                <p className="friend-pfp">{props.sender.name[0]}</p>
                <div className="chat-container">
                    <div className="user-header"> 
                        <div className="username">{props.sender.name}</div>
                        <p className="time">{formattedMessageDate}</p>
                    </div>
                    <div className="chat-text">{props.content}</div>
                </div>
            </div>
        </div>
    );
}
export default Chat;