import React from 'react';
import classes from './SearchField.module.css'

const searchField = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input className={classes.SearchField} type="text" name="artist" placeholder="artist search" value={props.chosenArtist} onChange={props.handleSearchInput} />
    </form>
);

export default searchField;