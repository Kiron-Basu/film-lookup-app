import React from 'react';
import classes from './Search.module.scss';

const Search = (props) => {
    return (
        <div className={classes.Search}>
                <input onChange={props.inputChangeHandler} className={classes.Search__bar} onKeyPress={props.enterVerify} type='text' value={props.searchInput}></input> 
                <button onClick={props.submitEvent}>Go</button>
        </div> 
    )
}

export default Search;