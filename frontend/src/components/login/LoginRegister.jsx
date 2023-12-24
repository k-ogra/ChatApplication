import { useState } from "react";
import "./LoginRegister.css";
import { Button, TextField } from "@mui/material";

function LoginRegister() {
    const buttonStyle = {
        color: '#66ddaa', 
        borderColor: '#66ddaa'
    };
    const inputStyles = {
        color: 'white',
      };
    const [isSignUp, setSignUp] = useState(false);
    
    function handleLogin(){
        localStorage.setItem("isLogged", true);
        window.location.href = "/app/chat";
    }

    return (
        <>
        {!isSignUp && (
            <div className="login-box">
            <div>Login</div>
            <TextField InputProps={{style: inputStyles, placeholder: "Username"}}  className="text-field"></TextField>
            <TextField InputProps={{style: inputStyles, placeholder: "Password"}} type="password" className="text-field"></TextField>
            <Button variant="outlined" style={buttonStyle}>Login</Button>
            <p>
                First Time?&nbsp;  
                <span className="register" onClick={() => {setSignUp(true)}}>Register</span>
            </p>
            </div>
        )}
        
        {isSignUp && (
            <div className="login-box">
            <div>Sign Up</div>
            <TextField InputProps={{style: inputStyles, placeholder: "Username"}} className="text-field"></TextField>
            <TextField InputProps={{style: inputStyles, placeholder: "Password"}}  type="password" className="text-field"></TextField>
            <Button variant="outlined" style={buttonStyle}>Sign Up</Button>
            <p>
                <span className="register" onClick={() => {setSignUp(false)}}>Already have an account?</span>
            </p>
            </div>
        )}
           
        </> 
    )
}
export default LoginRegister;