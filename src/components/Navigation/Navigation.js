import React from 'react';
import classes from './Navigation.module.scss';

const Navigation = () => (
  <nav>
    <div className={classes.Nav__title}>Movie Lookup App</div>
    <div className={classes.Nav__info}>Type in a movie below to lookup details</div>
  </nav>
);

export default Navigation;
