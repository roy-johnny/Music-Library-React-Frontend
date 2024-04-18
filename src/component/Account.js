import React from "react";
import {
    Alert,
    Box,
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import {recap_site_key, site_url} from "../lib/global";
import KeyIcon from '@mui/icons-material/Key';
import axios from "axios";

export default function Account(props) {

    window.recaptchaOptions = {
        useRecaptchaNet: true,
    };

    const [passWrong, setPassWrong] = React.useState(false);
    const [passBad, setPassBad] = React.useState(false);
    const [passOK, setPassOK] = React.useState(false);
    const recaptchaRef = React.useRef();

    const clearSignNotice = () => {
        setPassWrong(false);
        setPassBad(false);
        setPassOK(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(passOK)
            return props.checkSign();
        clearSignNotice();
        let data = new FormData(event.currentTarget);
        if(data.get('pass')!==data.get('pass2'))
            return setPassBad(true);
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        data.append('token', token);
        axios
            .post(site_url+'/vsapi/v1/account/pass', data, {headers: {'Content-Type':'application/json'}})
            .then((res) => {
                setPassOK(true);
            })
            .catch(function (error) {
                setPassWrong(true);
            });
    };

    if(props.type===3)
        return (
            <List component="nav">
                <ListItemButton onClick={() => props.setType(4)}>
                    <ListItemIcon>
                        <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change Password"/>
                </ListItemButton>
            </List>
        )
    if(props.type===4)
        return (
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                {passWrong && <Alert severity="error" sx={{mt: 2}}>Current password wrong!</Alert>}
                {passBad && <Alert severity="error" sx={{mt: 2}}>Please input same new password!</Alert>}
                {passOK && <Alert severity="success" sx={{mt: 2}}>Password changed successfully.</Alert>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={recap_site_key}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="old"
                        label="Current Password"
                        type="password"
                        id="old"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="New Password"
                        type="password"
                        id="password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass2"
                        label="Confirm New Password"
                        type="password"
                        id="password2"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Change Password
                    </Button>
                </Box>
            </Box>
        );
}