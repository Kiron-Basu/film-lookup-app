import React from 'react';
import classes from './Query.module.scss';

const Query = props => (
  <div className={classes.Query}>
    <p onClick={props.onClick}>{props.history}</p>
  </div>
);

export default Query;
