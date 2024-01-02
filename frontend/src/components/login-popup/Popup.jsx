import { useState, forwardRef, useImperativeHandle } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default forwardRef(function Popup(props, ref) {
    const [open, setOpen] = useState(false);
  
    useImperativeHandle(ref, () => ({
      show() {
        setOpen(true);
      }
    }))

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  
    return (
      <>
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}}  open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {props.message}
          </Alert>
        </Snackbar>
      </>
    );
  });