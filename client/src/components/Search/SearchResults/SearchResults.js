import React from 'react';
import Result from './Result/Result';


const searchResults = (props) => (
   <div>
        {props.searchResult.map(res => <Result handleClick={props.handleClick} choose={props.choose} key={res.id} info={res}/>)}
   </div>
);

export default searchResults;