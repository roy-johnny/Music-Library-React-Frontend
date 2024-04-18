import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Drawer,
    FormControlLabel,
    IconButton,
    Paper, TextField,
} from "@mui/material";
import {Link} from 'react-router-dom';
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {recap_site_key, site_url} from "../lib/global";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignDrawer(props) {

    window.recaptchaOptions = {
        useRecaptchaNet: true,
    };

    const validateName = (name) => {
        const re = /^[a-z0-9]+$/i;
        return re.test(String(name));
    }

    const [signInWrong, setSignInWrong] = React.useState(false);
    const [signType, setSignType] = React.useState(true);
    const [signUpOK, setSignUpOK] = React.useState(false);
    const [signUpPassWrong, setSignUpPassWrong] = React.useState(false);
    const [signUpNameWrong, setSignUpNameWrong] = React.useState(false);
    const [signUpNameBad, setSignUpNameBad] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const recaptchaRef = React.useRef();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const toggleDrawer = () => {
        props.setSignOpen(false);
    };

    const changeSignType = () => {
        setSignType(!signType);
    }

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        clearSignNotice();
        let data = new FormData(event.currentTarget);
        data.append('remember', checked);
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        data.append('token', token);
        axios
            .post(site_url+'/vsapi/v1/sign/in', data, {headers: {'Content-Type':'application/json'}})
            .then((res) => {
                props.checkSign();
            })
            .catch(function (error) {
                setSignInWrong(true);
            });
    };

    const clearSignNotice = () => {
        setSignInWrong(false);
        setSignUpOK(false);
        setSignUpPassWrong(false);
        setSignUpNameWrong(false);
        setSignUpNameBad(false);
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        clearSignNotice();
        let data = new FormData(event.currentTarget);
        if(!validateName(data.get('name')))
            return setSignUpNameBad(true);
        if(data.get('pass')!==data.get('pass2'))
            return setSignUpPassWrong(true);
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        data.append('token', token);
        axios
            .post(site_url+'/vsapi/v1/sign/up', data, {headers: {'Content-Type':'application/json'}})
            .then((res) => {
                props.checkSign();
                setSignType(true);
                setSignUpOK(true);
            })
            .catch(function (error) {
                setSignUpNameWrong(true);
            });
    };

    return (
        <Drawer anchor={'right'} open={props.signOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                {signType ?
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
                            Sign in
                        </Typography>
                        {signInWrong && <Alert severity="error" sx={{mt: 2}}>The user name or password is wrong!</Alert>}
                        {signUpOK && <Alert severity="success" sx={{mt: 2}}>Sign Up successfully! You can sign in now.</Alert>}
                        <Box component="form" noValidate onSubmit={handleSignInSubmit} sx={{mt: 1}}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={recap_site_key}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="name"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="pass"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={changeSignType} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box> : <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        {signUpNameWrong && <Alert severity="error" sx={{mt: 2}}>The username has existed! Please change use a new username.</Alert>}
                        {signUpPassWrong && <Alert severity="error" sx={{mt: 2}}>The passwords do not match! Please input your password again.</Alert>}
                        {signUpNameBad && <Alert severity="error" sx={{mt: 2}}>Username only allows English letters or numbers!</Alert>}
                        <Box component="form" noValidate onSubmit={handleSignUpSubmit} sx={{mt: 1}}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={recap_site_key}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="pass"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="pass2"
                                label="Repeat Password"
                                type="password"
                                id="password2"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={changeSignType} variant="body2">
                                        {"Have account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                }
            </Grid>
        </Drawer>
    )
}
