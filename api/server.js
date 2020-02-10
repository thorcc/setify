const spotify = require('./spotifyApi.js');
const setlistFM = require('./setlistFMApi.js');
const brainz = require('./musicbrainzApi.js');

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser')


const app = express();
const router = express.Router();


// Answer API requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/api/setlists/', async (request, response) => {
    response.json([]);
});

router.get('/api/setlists/:mid', async (request, response) => {
    const mid = request.params.mid;
    var d = new Date();
    console.log(`${d.toLocaleDateString()} - ${d.toLocaleTimeString()}: /api/setlists/api/${mid}`);
    const concerts = await setlistFM.getSetlist(mid);
    response.json(concerts);
});

router.get('/api/brainz/', async (request, response) => {
    response.json([]);
});

router.get('/api/brainz/:artist', async (request, response) => {
    const artist = request.params.artist;
    const searchResult = await brainz.getSearch(artist);
    console.log(searchResult);
    response.json(searchResult);
});


router.post('/api/create-playlist/', async (request, response) => {
    const { artist, tracks, token, name } = request.body;
    console.log(request.body);
    const userId = await spotify.getUserId(token);
    const uris = await Promise.all(tracks.map(async track => await spotify.getTrackUri(artist, track, token)));
    const cleanUris = uris.filter(uri => uri != null);
    if (cleanUris[0]) {
        const createList = await spotify.createPlaylist(userId, name, token);
        await spotify.addTracks(createList, cleanUris, token);
    }
    response.sendStatus(200);
});

// path must route to lambda
app.use('/.netlify/functions/server', router);
module.exports = app;
module.exports.handler = serverless(app);
