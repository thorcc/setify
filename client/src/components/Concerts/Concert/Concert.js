import React, { useState } from 'react';
import Songs from './Songs/Songs';
import classes from './Concert.module.css';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { FaSpotify } from "react-icons/fa";
import SpotifyLogin from '../../UI/SpotifyLogin';

const Concert = (props) => {
    const [showSongs, setShowSongs] = useState(false);

    const handleToggle = () => showSongs ? setShowSongs(false) : setShowSongs(true);

    const toggle = showSongs ? 
        <IoIosRemoveCircleOutline size="3em" onClick={handleToggle} className={classes.Toggle} /> : 
        <IoIosAddCircleOutline size="3em" onClick={handleToggle} className={classes.Toggle} />;

    const classList = [classes.Concert];
    let icons = null;

    if (props.info.songs.length === 0) {
        classList.push(classes.NoSongs)
    } else {
        icons = <div className={classes.Icons}>
                    {props.loggedIn ? 
                        <div onClick={() => props.createPlaylist(props.info.songs, props.info.venue, (props.info.date + "-" + props.info.year))} className={classes.Spotify}>
                            <p>Create playlist</p>
                            <FaSpotify />
                        </div> : 
                        <SpotifyLogin className={classes.Spotify} text="Log in to create list"/>
                    }   
                    {toggle}
                </div>  
    };

    return (
        <div className={classList.join(' ')}>
            <div className={classes.Date}>
                <p>{props.info.date}</p>
                <p>{props.info.year}</p>
            </div>
            <div>
                <p>{props.info.venue}</p>
                <p>{props.info.city}</p>
            </div>
            {icons}
            {showSongs ? <Songs songs={props.info.songs} /> : null}
        </div>
    );
};

export default Concert;