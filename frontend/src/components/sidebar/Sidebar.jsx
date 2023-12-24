import SearchIcon from "@mui/icons-material/Search";
import { Button, makeStyles } from "@mui/material";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import Friend from "../friend/Friend";


function Sidebar() {
    const navigator = useNavigate();

    return (
        <>
                <div className="sidebar-box">
                    <div className="sidebar-header">
                        <IconButton> 
                            <PersonAddIcon className="button">className="button"</PersonAddIcon>
                            <div className="button-text">Add Friend</div>
                        </IconButton>
                        <IconButton onClick={()=>{navigator('/')}}> 
                            <LogoutIcon className="button"></LogoutIcon>
                            <div className="button-text">Logout</div>
                        </IconButton>
                    </div>
                    <div className="sidebar-friends">
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                        <Friend></Friend>
                    </div>
                </div>
        </>
    )
}

export default Sidebar;