import {IconButton, List, ListItem, ListItemText, TextField, Tooltip} from "@mui/material";
import {withStyles} from '@mui/styles';
import MuiListItemButton from "@mui/material/ListItemButton";
import React from "react";
import axios from "axios";
import {main_color, site_url} from "../lib/global";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Toolbar from "@mui/material/Toolbar";
import ShuffleIcon from '@mui/icons-material/Shuffle';

const local_playlist_text = 'Local Playlist';
const local_playlist_id = 'local_playlist';

const ListItemButton = withStyles({
    root: {
        "&$selected": {
            backgroundColor: main_color,
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected:hover": {
            backgroundColor: '#ffa4bb',
            color: "black",
            "& .MuiListItemIcon-root": {
                color: "black"
            }
        },
    },
    selected: {}
})(MuiListItemButton);

export default function Playlist(props) {
    const [playlist, setPlaylist] = React.useState(null);
    const [nameInput, setNameInput] = React.useState(null);
    const [nameOpen, setNameOpen] = React.useState(null);
    const [deleteOpen, setDeleteOpen] = React.useState(null);
    const handleListItemClick = (event, id) => {
        props.setCurrentPL(id);
        props.setClearPriorAudioLists(true);
        axios
            .get(site_url + '/vsapi/v1/playlist/' + id)
            .then((res) => {
                props.setAudioList(res.data.pl);
                props.setAudioLists(res.data.playlist);
            })
            .catch(function (error) {
            });
    };

    const handleNameInput = (event) => {
        setNameInput(event.target.value);
    };

    const handleRename = (id, value) => {
        setNameOpen(id);
        setNameInput(value);
    };

    const handleSave = (id) => {
        if (id === local_playlist_id) {
            if (!nameOpen) {
                setNameOpen(id);
                setNameInput(local_playlist_text);
            } else
                axios
                    .post(site_url + '/vsapi/v1/playlist/update', {
                        name: nameInput,
                        playlist: props.audioList
                    }, {headers: {'Content-Type': 'application/json'}})
                    .then((res) => {
                        props.setCurrentPL(res.data.id);
                        setNameInput(null)
                        setNameOpen(null);
                    })
                    .catch(function (error) {
                    });
        } else if (id === 'new') {
            axios
                .post(site_url + '/vsapi/v1/playlist/new', {
                    name: nameInput,
                }, {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    props.setCurrentPL(res.data.id);
                    props.setAudioList([]);
                    props.setAudioLists([]);
                    setNameInput(null)
                    setNameOpen(null);
                })
                .catch(function (error) {
                });
        } else
            axios
                .post(site_url + '/vsapi/v1/playlist/rename', {
                    id: id,
                    name: nameInput
                }, {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    let tmp = playlist;
                    for (let i = 0; i < tmp.length; i += 1)
                        if (tmp[i]._id === id)
                            tmp.splice(i, 1);
                    setPlaylist([
                        ...tmp,
                        {_id: id, name: nameInput}
                    ]);
                    setNameInput(null)
                    setNameOpen(null);
                })
                .catch(function (error) {
                });
    };

    const refresh_playlist = () => {
        axios
            .get(site_url + '/vsapi/v1/playlist')
            .then((res) => {
                if ((!props.current_pl || props.current_pl === local_playlist_id) && props.audioList.length > 0) {
                    setPlaylist([
                        ...res.data.playlist,
                        {
                            _id: local_playlist_id,
                            name: local_playlist_text,
                            num: props.audioList.length,
                        }
                    ]);
                    props.setCurrentPL(local_playlist_id);
                } else
                    setPlaylist(res.data.playlist);
            })
            .catch(function (error) {
            });
    }

    const handleDelete = () => {
        if (deleteOpen === props.current_pl) {
            props.setAudioList([]);
            props.setAudioLists([]);
            props.setCurrentPL(null);
        }
        if (deleteOpen !== local_playlist_id)
            axios
                .delete(site_url + '/vsapi/v1/playlist/' + deleteOpen, {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    refresh_playlist();
                })
                .catch(function (error) {
                });
        setDeleteOpen(null);
    }

    React.useEffect(() => {
        refresh_playlist();
    }, [props.current_pl]);

    if (!playlist) return null;
    return (
        <>
            <List component="nav">
                {playlist.map((pl) => (
                    <ListItem>
                        {nameOpen === pl._id ?
                            <>
                                <TextField
                                    value={nameInput}
                                    onChange={handleNameInput}
                                    fullWidth
                                />
                                <Tooltip title="Save">
                                    <div onClick={() => handleSave(pl._id)}>
                                        <IconButton
                                        >
                                            <CheckIcon/>
                                        </IconButton>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Cancel">
                                    <div onClick={() => {
                                        setNameOpen(null);
                                        setNameInput(null);
                                    }}>
                                        <IconButton
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </Tooltip>
                            </> :
                            <ListItemButton
                                selected={props.current_pl === pl._id}
                                onClick={(event) => handleListItemClick(event, pl._id)}
                            >
                                <ListItemText
                                    primary={pl.name}
                                />
                            </ListItemButton>
                        }
                        {!nameOpen &&
                            <>
                                {!deleteOpen &&
                                    <>
                                        {pl._id === local_playlist_id || nameOpen === pl._id ?
                                            <Tooltip title="Save">
                                                <div onClick={() => handleSave(pl._id)}>
                                                    <IconButton
                                                    >
                                                        <SaveIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip> :
                                            <Tooltip title="Rename">
                                                <div onClick={() => handleRename(pl._id, pl.name)}>
                                                    <IconButton
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        }
                                    </>
                                }
                                {deleteOpen ?
                                    <>
                                        {deleteOpen === pl._id &&
                                            <>
                                                <Tooltip title="Delete">
                                                    <div onClick={() => handleDelete()}>
                                                        <IconButton
                                                        >
                                                            <CheckIcon/>
                                                        </IconButton>
                                                    </div>
                                                </Tooltip>
                                                <Tooltip title="Cancel">
                                                    <div onClick={() => {
                                                        setDeleteOpen(null);
                                                    }}>
                                                        <IconButton
                                                        >
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    </div>
                                                </Tooltip>
                                            </>
                                        }
                                    </> :
                                    <Tooltip title="Delete">
                                        <div onClick={() => setDeleteOpen(pl._id)}>
                                            <IconButton
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                }
                            </>
                        }
                    </ListItem>
                ))}
                {nameOpen === 'new' &&
                    <ListItem>
                        <TextField
                            value={nameInput}
                            onChange={handleNameInput}
                            fullWidth
                        />
                        <Tooltip title="Save">
                            <div onClick={() => handleSave('new')}>
                                <IconButton
                                >
                                    <CheckIcon/>
                                </IconButton>
                            </div>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton
                                onClick={() => {
                                    setNameOpen(null);
                                    setNameInput(null);
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                }
            </List>
            {!nameOpen && !deleteOpen &&
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [1],
                        marginX: 1,
                    }}
                >
                    <Tooltip title="Create New Playlist">
                        <div onClick={() => {
                            setNameInput('');
                            setNameOpen('new');
                        }}>
                            <IconButton
                            >
                                <AddIcon/>
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Shuffle the current playlist">
                        <IconButton onClick={props.shuffleAudioList}>
                            <ShuffleIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            }
        </>
    );
}
