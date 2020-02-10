import React from 'react';
import classes from './Error.module.css';

const error = (props) => {
    let errText = '';
    switch(props.errType){
        case 'login':
            errText = 'Error: Could not create playlist. You have to be logged in.';
            break;
        case 'getSetlist':
            errText = 'Error: Could not fetch setlists.';
            break;
        case 'getArtist':
            errText = 'Error: Could not fetch artists.';
            break;
        default:
            errText = 'Something went wrong.';
            break;
    }

    return (
    <div className={classes.Error}>
        <p>{errText}</p>
        <button onClick={props.handleErrorOK}>OK</button>
    </div>
    )
}
export default error;