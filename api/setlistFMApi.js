const axios = require('axios');
require('dotenv').config();


const getSetlist = async (artistId) => {
    try{
        const token = process.env.SETLIST_API_KEY;
        console.log("setlist_token: ", token);
        const fetch = await axios.get(`https://api.setlist.fm/rest/1.0/artist/${artistId}/setlists`, {
            headers: {
                "Accept": "application/json",
                "x-api-key": token,
            }
        });
        const results = fetch.data.setlist.map(concert => {
            const songs = concert.sets.set.map(set => set.song.map(song => song.name)).flat();
            const dateArr = concert.eventDate.split("-");
            return ({
                id: concert.id,
                year: dateArr[2],
                date: dateArr[0] + "." + dateArr[1],
                venue: concert.venue.name,
                city: concert.venue.city.name,
                country: concert.venue.city.country.name,
                songs: songs,
            });
        });

        return results;
    }
    catch(err){
        console.error(err);
    }

}

exports.getSetlist = getSetlist;