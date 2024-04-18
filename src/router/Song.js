import React from "react";
import {site_url} from "../lib/global";
import { useParams } from "react-router-dom";
import { Typography, Grid, Card, CardContent, Button } from "@material-ui/core";

const SongInfoPage = (props) => {
    const [id, setD] = React.useState(useParams().id);
    const [data, setData] = React.useState(null);
	const get_song = () => {
		axios
		  .get(site_url+ '/vsapi/v1/s/' + id, {
			withCredentials: true,
		  })
		  .then((res) => {
			setData(res.data);
			props.setLoading(false);
			if(props.audioLists.length===0)
				props.addAudio(res.data);
		  })
	  }
	  React.useEffect(() => {
		props.setLoading(true);
		get_song();
	  }, []);
    return (
        <Grid container justify="center">
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {data.title}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>歌手:</strong> {data.vup}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>歌曲:</strong> {data.song}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>发布日期:</strong> {data.date}
                        </Typography>
						<Button variant="contained" color="primary" onClick={props.addAudio(data)}>
							加入播放列表
						</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SongInfoPage;
