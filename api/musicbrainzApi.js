const axios = require('axios');

const getSearch = async (artist) => {
    try{
        const fetch = await axios.get(`http://musicbrainz.org/ws/2/artist/?query=artist:${artist}`);
        const results = fetch.data.artists.map(artist => {
            return({
                name: artist.name,
                country: artist.country,                
                id: artist.id,
            });     
        });
        return results;
    }
    catch(err){
        console.error(err);
    }
}

exports.getSearch = getSearch;