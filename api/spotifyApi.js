const axios = require('axios');

const getUserId = async (token) => {
    try {
        const res = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(res.data.id);
        return res.data.id;
    }
    catch (err) {
        console.error(err);
    }
}

const createPlaylist = async (userId, name, token) => {
    try {
        const createList = await axios({
            method: 'POST',
            url: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: { 'Authorization': 'Bearer ' + token },
            data: { name: name }
        });
        return createList.data.id;
    }
    catch (err) {
        //console.log(err);
        console.error("createPlaylist");
    }
}

const addTracks = async (playlist_id, tracks, token) => {
    try {
        const add = await axios({
            method: 'POST',
            url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            headers: { 'Authorization': 'Bearer ' + token },
            data: { "uris": tracks }
        });
        return {
            status: 200,
            message: "Playlist created",
        };
    }
    catch (err) {
        //console.log(err);
        console.error("addTracks")
    }
}

const getTrackUri = async (artist, name, token) => {
    console.log(artist, name);
    const url = `https://api.spotify.com/v1/search?q=${name}%20${artist}&type=track`;
    try {
        const res = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(res.data.tracks.items[0].uri);
        return res.data.tracks.items[0].uri;
    }
    catch (err) {
        //console.error(err);
        
        console.error(`Could not getTrackUri. ${artist}:${name}`);
    }
}

exports.getUserId = getUserId;
exports.createPlaylist = createPlaylist;
exports.addTracks = addTracks;
exports.getTrackUri = getTrackUri; 