import * as React from 'react';
import {
    Drawer,
    IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {site_url} from "../lib/global";
import {useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Playlist from "../component/Playlist";
import Account from "../component/Account";
export default function UserDrawer(props) {

    const navigate = useNavigate();

    const handleLogOut = () => {
        axios
            .get(site_url + '/vsapi/v1/sign/out')
            .then((res) => {
                props.checkSign();
            })
    };

    const goBack = () => {
        if(type===4) {
            props.checkSign();
            setType(3);
        }
        else
            setType(1);
    }

    const [type, setType] = React.useState(1); //1=user 2=playlist 3=account 4=pass
    const renderDrawer = () => {
        if(type===1)
            return (
                <List component="nav">
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.signData.name}/>
                    </ListItem>
                    <ListItemButton onClick={() => setType(2)}>
                        <ListItemIcon>
                            <PlaylistPlayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Playlist"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => {
                        props.setSignOpen(false);
                        navigate('/upload');
                    }}>
                        <ListItemIcon>
                            <UploadIcon />
                        </ListItemIcon>
                        <ListItemText primary="Upload"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => setType(3)}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account Setting"/>
                    </ListItemButton>
                    <ListItemButton onClick={handleLogOut}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out"/>
                    </ListItemButton>
                </List>
            )
        else if(type===2)
            return (
                <Playlist {...props}/>
            )
        else if(type===3 || type===4)
            return (
                <Account type={type} setType={setType} {...props}/>
            )
    }

    return (
        <Drawer anchor={'right'} open={props.signOpen} PaperProps={{
            sx: { minWidth: 300 },
        }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1],
                }}
            >
                { type!==1 ?
                    <IconButton onClick={goBack}>
                        <ChevronLeftIcon/>
                    </IconButton> :
                    <div></div>
                }
                <IconButton onClick={() => {
                    props.setSignOpen(false);
                    props.checkSign();
                }}>
                    <CloseIcon/>
                </IconButton>
            </Toolbar>
            {renderDrawer()}
        </Drawer>
    )
}