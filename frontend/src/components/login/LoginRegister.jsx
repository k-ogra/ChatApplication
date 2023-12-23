import "./LoginRegister.css";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
function LoginRegister() {
    return (
        <>
            <div className="login-box">
                <div>Login</div>
                <TextField  label="Email or Username"></TextField>
                <TextField label="Password"></TextField>
                <Button variant="outlined">Login</Button>
                <p>
                    First Time?&nbsp;  
                    <span className="first-time">Register</span>
                </p>
            </div>
        </>
    )
}
export default LoginRegister;