import React from 'react';
import classes from './Search.module.scss';

const Search = props => (
  <div className={classes.Search}>
    <input
      onChange={props.inputChangeHandler}
      className={classes.Search__bar}
      onKeyPress={props.enterVerify}
      type="text"
      value={props.searchInput}
    />
    <button onClick={props.submitEvent}>Go</button>
  </div>
);

export default Search;
