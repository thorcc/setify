import React from 'react';
import classes from './Home.module.css';
import SpotifyLogin from '../UI/SpotifyLogin';


const home = (props) => (
    <div className={classes.Home}>
        <h1>setify</h1>
        <p>
            Setify lets you create Spotify playlists from concert setlists.
        </p>
        <div className={classes.Login}>
        {!props.loggedIn ?
            <div>
                <p>You have to log in to your spotify account to create playlists.</p>
                <SpotifyLogin text="Spotify Login"/>
            </div>
            : <div>
                <p>You are logged in, search for an artist to create a playlist.</p>
            </div>
        }
        </div>
    </div>
)

export default home;