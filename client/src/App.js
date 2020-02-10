import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search/Search';
import Concerts from './components/Concerts/Concerts';
import Home from './components/Home/Home';
import Error from './components/Error/Error';



function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [artist, setArtist] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [artistId, setArtistId] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showConcerts, setShowConcerts] = useState(false);
  const [artistConcerts, setArtistConcerts] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState('');

  const [spotifyToken, setSpotifyToken] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleSearchInput = (event) => {
    setArtistSearch(event.target.value);
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    setArtist(artistSearch);
    setShowHome(false);
    setShowConcerts(false);
  }

  useEffect( () => {
    const getArtists = async () => {
      try{
        const get = await axios.get("/.netlify/functions/server/api/brainz/" + artist);
        setSearchResult(get.data);
        setShowSearchResults(true);
      }
      catch(err){
        console.error(err);
        setErrorType('getArtist');
        setShowError(true);
      }
    }
    getArtists();
  },[artist])


  const handleSearchResultClick = (clickedArtist, mid) => {
    setShowSearchResults(false);
    setShowConcerts(true);
    setArtistSearch(clickedArtist);
    setArtistId(mid);
  }

  useEffect( () => {
    const getConcerts = async () => {
      try {
        const get = await axios.get("/.netlify/functions/server/api/setlists/" + artistId);
        setArtistConcerts(get.data);
        setShowConcerts(true);
      }
      catch (err) {
        console.error(err);
        setErrorType('getSetlist');
        setShowError(true);
      }
    }
    getConcerts();
  }, [artistId]);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = "";
    setSpotifyToken(hash);
  }, [])

  useEffect(() => spotifyToken.access_token ? setLoggedIn(true) : setLoggedIn(false), [spotifyToken]);

  const createPlaylist = (songs, venue, date) => {
    console.log(songs);
    axios.post('/.netlify/functions/server/api/create-playlist/', {
      artist: artist,
      tracks: songs,
      token: spotifyToken.access_token,
      name: artist + " - " + venue + ": " + date
    })
      .then(function (response) {
        console.log(response);
        alert("Playlist created!")
      })
      .catch(function (error) {
        console.log(error);
        alert("Something went wrong.")
      });
  }

  const handleErrorOK = () => setShowError(false);
  const error = showError ? <Error handleErrorOK={handleErrorOK} errType={errorType} /> : null;

  const concerts = showConcerts ? <Concerts loggedIn={loggedIn} createPlaylist={createPlaylist} artistConcerts={artistConcerts} /> : null;
  const home = showHome ? <Home loggedIn={loggedIn} /> : null;
  return (
    <div className="App">
      <header>
        <Search
          showSearchResults={showSearchResults}
          handleSearchInput={handleSearchInput}
          handleSubmit={handleSubmit}
          handleClick={handleSearchResultClick}
          artistSearch={artistSearch}
          searchResult={searchResult}
        />
      </header>
      {home}
      {concerts}
      {error}
    </div>
  );
}

export default App;
