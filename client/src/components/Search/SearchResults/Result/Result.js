import React from 'react';
import classes from './Result.module.css';
import Flag from 'react-world-flags';


const result = (props) => {
    const flag = props.info.country ? <Flag className={classes.Flag} code={props.info.country} height="16" /> : null;
    return(
        <div onClick={() => props.handleClick(props.info.name, props.info.id)} className={classes.Result}>
            {flag}
            <p>{props.info.name}</p>
        </div>
)};

export default result;