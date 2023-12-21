import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
function Sidebar() {
    return (
        <>
            <div className="search">
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </div>
        </>
    )
}

export default Sidebar;