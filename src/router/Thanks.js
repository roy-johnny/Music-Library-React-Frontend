import React from "react";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

export default function Copyright(props) {
    React.useEffect(() => {
        props.setLoading(false);
    }, []);

    return (
        <main>
            <Container sx={{py: 2}} maxWidth="lg">
                <h3>Reference and Thanks</h3>
                <Typography>This website is using following open source components:</Typography>
                <ul className="list">
                    <li><a href={'https://github.com/lijinke666/react-music-player'}>react-jinke-music-player</a></li>
                    <li><a href={'https://mui.com/'}>Material-UI</a></li>
                </ul>
                <Typography>Thank you very much.</Typography>
            </Container>
        </main>
    );
}