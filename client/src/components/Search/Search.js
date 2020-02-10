import React from 'react';
import SearchField from './SearchField/SearchField';
import SearchResults from './SearchResults/SearchResults';
import classes from './Search.module.css';

const search = (props) => {
    const results = props.showSearchResults ? 
        <SearchResults choose={props.choose} handleClick={props.handleClick} searchResult={props.searchResult} /> 
        : null; 
    return(
    <div className={classes.Search}>
        <SearchField handleSubmit={props.handleSubmit} handleSearchInput={props.handleSearchInput} chosenArtist={props.artistSearch} />
        {results}
    </div>
    )
};

export default search;