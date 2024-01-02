import { useState, useRef } from "react";
import "./LoginRegister.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Popup from "../login-popup/Popup";
import axios from "axios";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#0ef",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0ef",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#0ef",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0ef",
    },
  },
});

function LoginRegister() {
    const popupRef = useRef(null);

    const buttonStyle = {
        color: '#0ef', 
        borderColor: '#0ef',
        boxShadow: `0 0 10px #0a87b1`,
        margin: '10px',
        fontFamily: 'Cabin', 
    };
    const inputStyle = {
        color: 'white',
        margin: '8px',
    };
    
    const [isSignUp, setSignUp] = useState(false);
    const [input, setInput] = useState({ name: "", password: "" });
    const [logInStatus, setLogInStatus] = useState("");

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value});
    };
    
    const loginHandler = async () => {
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
        localStorage.setItem("friendData", JSON.stringify(response));
        navigate("/ui/starting");
      } catch (error) {
          setLogInStatus({message: "Invalid Username or Password"})
          popupRef.current.show();
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
        localStorage.setItem("friendData", JSON.stringify(response));
        navigate("/ui/starting");
      } catch (error) {
        setLogInStatus({message: "Username already taken"})
        popupRef.current.show();
      }
    };

    return (
        <>
        {!isSignUp ? (
          <div className="login-box">
            <h1 className="login-text">Chat App</h1>
            <StyledTextField onChange={changeHandler} InputProps={{style: inputStyle, placeholder: "Username"}} name="name" variant="outlined" />
            <StyledTextField onChange={changeHandler} InputProps={{style: inputStyle, placeholder: "Password"}} name="password" type="password" variant="outlined" />
            <Button variant="outlined" style={buttonStyle} onClick={loginHandler}>Login</Button>
            <p> 
                First Time?&nbsp; 
                <span className="register" onClick={() => {setSignUp(true)}}>Register Now</span>
            </p>
            <Popup message={logInStatus.message} ref={popupRef}/>
          </div>
        )
        :
        (
          <div className="login-box">
            <h1 className="login-text">Chat App</h1>
            <StyledTextField onChange={changeHandler} InputProps={{style: inputStyle, placeholder: "Username"}} name="name" />
            <StyledTextField onChange={changeHandler} InputProps={{style: inputStyle, placeholder: "Password"}} type="password" name="password" />
            <Button variant="outlined" style={buttonStyle} onClick={signUpHandler}>Sign Up</Button>
            <p>
                <span className="register" onClick={() => {setSignUp(false)}}>Already have an account?</span>
            </p>
            <Popup message={logInStatus.message} ref={popupRef}/>
          </div>
        )}
        </> 
    )
}
export default LoginRegister;