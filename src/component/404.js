import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function NotFoundPage(props) {
    const navigate = useNavigate();
    React.useEffect(() => {
        props.setLoading(false);
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
        </Box>
    );
}