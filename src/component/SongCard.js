import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import * as React from "react";
import {site_url} from "../lib/global";

export default function SongCard(props) {

    return (
        <Card
            sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            style={{position: "relative"}}
        >
            <CardActionArea onClick={() => props.addAudio(props.song)}>
                <CardMedia
                    component="img"
                    image={site_url + '/thumbnail/' + props.song.thumbnail}
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography style={{
                        fontWeight: "600",
                        fontSize: '1.2em',
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}>
                        {props.song.title}
                    </Typography>
                    <Typography style={{
                        fontSize: '0.8em',
                        color: 'gray',
                    }}>
                        {props.song.date}
                    </Typography>
                    <Typography style={{
                    }}>
                        {props.song.vup}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}