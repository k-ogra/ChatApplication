import { useState } from "react";
import "./LoginRegister.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRegister() {
    const buttonStyle = {
        color: '#66ddaa', 
        borderColor: '#66ddaa'
    };
    const inputStyles = {
        color: 'white',
      };
    const [isSignUp, setSignUp] = useState(false);
    const [input, setInput] = useState({ name: "", password: "" });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ name: e.target.value, password: e.target.value});
      };
    
    

    const loginHandler = async (e) => {
        console.log(input);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const response = await axios.post(
            "http://localhost:4000/friend/login/",
            input,
            config
          );
          console.log("Login : ", response);
          localStorage.setItem("friendData", JSON.stringify(response));
          navigate("/ui/starting");
        } catch (error) {
            console.log("Invalid User name or Password");
        }
      };

    const signUpHandler = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const response = await axios.post(
            "http://localhost:4000/friend/register/",
            input,
            config
          );
          console.log(response);
          navigate("/ui/starting");
          localStorage.setItem("friendData", JSON.stringify(response));
        } catch (error) {
          console.log(error);
          }
        };

    return (
        <>
        {!isSignUp && (
            <div className="login-box">
            <div>Login</div>
            <TextField onChange={changeHandler} InputProps={{style: inputStyles, placeholder: "Username"}}  className="text-field"></TextField>
            <TextField onChange={changeHandler} InputProps={{style: inputStyles, placeholder: "Password"}} type="password" className="text-field"></TextField>
            <Button variant="outlined" style={buttonStyle} onClick={loginHandler}>Login</Button>
            <p>
                First Time?&nbsp;  
                <span className="register" onClick={() => {setSignUp(true)}}>Register</span>
            </p>
            </div>
        )}
        
        {isSignUp && (
            <div className="login-box">
            <div>Sign Up</div>
            <TextField onChange={changeHandler} InputProps={{style: inputStyles, placeholder: "Username"}} className="text-field"></TextField>
            <TextField onChange={changeHandler} InputProps={{style: inputStyles, placeholder: "Password"}}  type="password" className="text-field"></TextField>
            <Button variant="outlined" style={buttonStyle} onClick={signUpHandler}> Sign Up</Button>
            <p>
                <span className="register" onClick={() => {setSignUp(false)}}>Already have an account?</span>
            </p>
            </div>
        )}
           
        </> 
    )
}
export default LoginRegister;