import React from 'react';
import classes from './SpotifyLogin.module.css';
import { FaSpotify } from "react-icons/fa";

const clientId = "c241b1237423480285702256ed781af7";
const redirectUri = "https://setify.app";
//const redirectUri = "https://setifyapp.herokuapp.com";
//const redirectUri = "http://localhost:3000";
const scope = "playlist-modify-public";
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`


const spotifyLogin = (props) => (
        <a href={authUrl} className={classes.Spotify}>
            <p>{props.text}</p>
            <FaSpotify />
        </a>
)

export default spotifyLogin;