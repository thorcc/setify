import React from 'react';
import Concert from './Concert/Concert';
import classes from './Concerts.module.css';

const concerts = (props) => {
    return(
        <div className={classes.Concert}>
            {props.artistConcerts.map(concert => <Concert key={concert.id} loggedIn={props.loggedIn} createPlaylist={props.createPlaylist} info={concert}/>)}
        </div>
)};

export default concerts;