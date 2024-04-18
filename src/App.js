import './App.css';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import Home from './router/Home';
import Header from "./component/Header";
import {Backdrop, Button, CircularProgress, Pagination, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";
import {createTheme} from "@mui/material/styles";
import React from "react";
import NotFoundPage from "./component/404"
import ReactJkMusicPlayer from "react-jinke-music-player";
import {site_url} from "./lib/global";
import Copyright from "./router/Copyright";
import SignDrawer from "./container/SignDrawer";
import 'react-jinke-music-player/assets/index.css'
import axios from "axios";
import UserDrawer from "./container/UserDrawer";
import Upload from "./router/Upload";
import Thanks from "./router/Thanks";
import Grid from "@mui/material/Grid";
import {useLocalStorage} from "./lib/useLocalStorage";

const theme = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                dense: {
                    height: 50,
                    minHeight: 50
                }
            }
        }
    },
});

function App() {

    const [loading, setLoading] = React.useState(true);
    const [audioLists, setAudioLists] = React.useState([]);
    const [audioList, setAudioList] = React.useState([]);
    const [signOpen, setSignOpen] = React.useState(false);
    const [signData, setSignData] = React.useState(null);
    const [current_pl, setCurrentPL] = useLocalStorage("playlist", null);
    const [current_index, setCurrentIndex] = useLocalStorage("pl_index", 0);
    const [autoPlay, setAutoPlay] = React.useState(false);
    const [clearPriorAudioLists, setClearPriorAudioLists] = React.useState(false);
    const [shuffleAudio, setShuffleAudio] = React.useState(false);

    const addAudio = (song) => {
        if(audioList.indexOf(song._id)!==-1) return;
        setAutoPlay(true);
        setAudioList([
            ...audioList,
            song._id
        ]);
        setAudioLists([
            ...audioLists,
            {
                _id: song._id,
                name: song.title+' '+song.date,
                singer: song.vup,
                cover: site_url + '/disk/' + song.thumbnail,
                musicSrc: site_url + '/song/' + song._id + '.' + song.ext,
            }
        ]);
    }

    const onAudioListsChange = (currentPlayId, newAudioLists, audioInfo) => {
        let tmp = [];
        for(let i=0;i<newAudioLists.length;i+=1)
            tmp.push(newAudioLists[i]._id);
        if (audioLists !== newAudioLists) {
            setAudioLists(newAudioLists);
            setAudioList(tmp);
        }
        if(current_pl) {
            if (current_pl !== 'local_playlist')
                axios
                    .post(site_url + '/vsapi/v1/playlist/update', {
                        id: current_pl,
                        playlist: tmp,
                    }, {headers: {'Content-Type': 'application/json'}})
                    .then((res) => {
                    })
                    .catch(function (error) {
                    });
        }
        setClearPriorAudioLists(true);
    }

    const shuffleAudioList = () => {
        setClearPriorAudioLists(true);
        setShuffleAudio(true);
    }

    React.useEffect(() => {
        if(shuffleAudio) {
            let list = [], lists = [], tmp = audioLists;
            setAudioLists([]);
            setAudioList([]);
            while (tmp.length !== 0) {
                lists.push(tmp.splice(Math.floor(Math.random() * tmp.length - 1), 1)[0]);
                list.push(lists[lists.length - 1]._id);
            }
            setAudioLists(lists);
            setAudioList(list);
            setShuffleAudio(false);
        }
    }, [shuffleAudio]);

    const [isMobile, setMobile] = React.useState(window.innerWidth < window.innerHeight);

    function handleWindowSizeChange() {
        setMobile(window.innerWidth < window.innerHeight);
    }

    const checkSign = () => {
        axios
            .get(site_url + '/vsapi/v1/sign/check')
            .then((res) => {
                if (res.data.name) {
                    if (current_pl) {
                        axios
                            .get(site_url + '/vsapi/v1/playlist/' + current_pl)
                            .then((res) => {
                                setAutoPlay(false);
                                setAudioList(res.data.pl);
                                setAudioLists(res.data.playlist);
                            })
                            .catch(function (error) {
                                setCurrentPL(null);
                            });
                    }
                    setSignData(res.data);
                }
                else
                    setSignData(null);
            })
    }

    React.useEffect(() => {
        checkSign();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Header setSignOpen={setSignOpen}/>
            <Routes>
                <Route exact path='/' element={<Home setLoading={setLoading} addAudio={addAudio} />}/>
                <Route exact path='/copyright' element={<Copyright setLoading={setLoading} />}/>
                <Route exact path='/thanks' element={<Thanks setLoading={setLoading} />}/>
                {signData &&
                    <>
                        <Route exact path='/upload' element={<Upload setLoading={setLoading} signData={signData}/>}/>
                    </>
                }
                <Route path="*" element={<NotFoundPage setLoading={setLoading} />}/>
            </Routes>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
                style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                }}
            >
                <CircularProgress sx={{color: "#fb7299"}}/>
            </Backdrop>
            {/* Footer */}
            <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                <Grid container alignItems="center">
                    <Grid item xs={6} sm={4} md={3}>
                        <Link to={'/copyright'}>Report Copyright Infringement</Link>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Link to={'/thanks'}>Reference and Thanks</Link>
                    </Grid>
                </Grid>
            </Box>
            {/* End footer */}
            {signData ? <UserDrawer
                    signOpen={signOpen}
                    signData={signData}
                    setSignOpen={setSignOpen}
                    checkSign={checkSign}
                    audioList={audioList}
                    audioLists={audioLists}
                    setAudioList={setAudioList}
                    setAudioLists={setAudioLists}
                    current_pl={current_pl}
                    setCurrentPL={setCurrentPL}
                    shuffleAudioList={shuffleAudioList}
                    setClearPriorAudioLists={setClearPriorAudioLists}
                /> :
                <SignDrawer
                    signOpen={signOpen}
                    setSignOpen={setSignOpen}
                    checkSign={checkSign}
                />}
            <ReactJkMusicPlayer
                showMediaSession
                mode={isMobile ? 'mini' : 'full'}
                audioLists={audioLists}
                quietUpdate
                clearPriorAudioLists={clearPriorAudioLists}
                autoPlay={autoPlay}
                onAudioListsChange={onAudioListsChange}
                onPlayIndexChange={(playIndex) => setCurrentIndex(playIndex)}
                defaultPlayIndex={current_index}
                defaultPosition={isMobile ? {
                    right: '3%',
                    bottom: '1%',
                } : {
                    right: 100,
                    bottom: 120,
                }}
            />
        </ThemeProvider>
    );
}

export default App;
