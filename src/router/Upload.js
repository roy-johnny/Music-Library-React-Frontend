import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {site_url} from "../lib/global";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function Upload(props) {
    const [date, setDate] = React.useState(null);
    React.useEffect(() => {
        props.setLoading(false);
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        data.append('date', date);
        axios
            .post(site_url + '/vsapi/v1/upload', data)
            .then((res) => {
                console.log('yes')
            })
            .catch(function (error) {
            });
    };

    const onDateChange = (value) => {
        setDate(value);
    }

    return (
        <main>
            <Container sx={{py: 2}} maxWidth="lg">
                { props.signData.upload ?
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <input
                            style={{display: "none"}}
                            id="contained-button-file"
                            type="file"
                            name="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="song"
                            label="Song"
                            name="song"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="vup"
                            label="Singer"
                            name="vup"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="YYYY-MM-DD"
                                value={date}
                                onChange={onDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="thumbnail"
                            label="Thumbnail"
                            name="thumbnail"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >Upload</Button>
                    </Box> :
                    <Box sx={{mt: 1}}>
                        <Typography>You need to send a email to admin@v-sing.com to apply for using upload function.</Typography>
                    </Box>
                }
            </Container>
        </main>
    );
}