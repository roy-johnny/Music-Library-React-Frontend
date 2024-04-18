import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import {Pagination} from "@mui/material";
import SongCard from "../component/SongCard";

export default function Album(props) {

    return (
        <main>
            <Container sx={{py: 2}} maxWidth="lg">
                <Grid container spacing={2}>
                    {props.data.songs.map((song) => (
                        <Grid item key={song._id} xs={6} sm={4} md={3}>
                            <SongCard song={song} album={true} {...props} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Stack spacing={2} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 6,
            }}>
                <Pagination count={props.data.total} page={props.data.page} onChange={props.handlePageChange} />
            </Stack>
        </main>
    );
}