import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Grid";
import {main_color} from "../lib/global";

export default function Header(props) {

    const toggleDrawer = () => {
        props.setSignOpen(true);
    };

    return (
        <AppBar position="relative" style={{background: main_color}}>
            <Toolbar variant="dense">
                <Typography
                    variant="h6"
                    noWrap
                >
                    <Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>V-sing</Link>
                </Typography>
                <Grid item xs/>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}