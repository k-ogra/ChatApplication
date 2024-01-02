import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, forwardRef, useImperativeHandle, useContext } from "react";
import axios from "axios";
import { UIContext } from "../UIContainer";
import { useNavigate } from "react-router-dom";
import "./DeleteChatAlert.css";

export default forwardRef(function DeleteChatAlert(props, ref) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { refresh, setRefresh } = useContext(UIContext);

  const buttonStyle = {
    color: '#0ef', 
    borderColor: '#0ef',
    fontFamily: 'Cabin', 
  };

  useImperativeHandle(ref, () => ({
    show() {
      setOpen(true);
    }
  }))

  const handleClose = () => {
    setOpen(false);
  };

  const deleteChat = async () => {
    const config = {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      };
      await axios
        .put(
          "http://localhost:4000/chat/",
          {
            chatId: props.chat_id
          },
          config
        );
      props.socket.emit("senderDeletedChat", props.chat_id);
      setRefresh(!refresh);
      navigate("/ui/starting");
      setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: "#202225", color: "white" } }}
      >
        <DialogTitle className="delete-chat-title">
          {"Delete chat?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="delete-chat-text">
            This will delete the conversation and all of its messages permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={buttonStyle} onClick={handleClose}>Cancel</Button>
          <Button style={buttonStyle} onClick={deleteChat} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});