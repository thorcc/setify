import React from 'react';
import Song from './Song/Song';
import classes from './Songs.module.css';

const songs = (props) => {
    return(
        <ol className={classes.Songs}>
            {props.songs.map(song => <Song key={song} name={song} />)}
        </ol>
    )
};

export default songs;