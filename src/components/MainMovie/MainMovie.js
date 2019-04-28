import React, { Component } from 'react';
import classes from './MainMovie.module.scss';

class MainMovie extends Component {
  constructor(props) {
    super();
    this.state = {
      mainMovie: props.mainMovie, // needed?
    };
  }

  render() {
    const list = 'test';
    // console.log('list =   ', this.props.mainMovie);
    return (
      <div className={classes.MainMovie}>
        {!this.props.mainMovie ? <p>Search for a film above</p> : { list }}
        <p>test paragraph</p>
      </div>
    );
  }
}

export default MainMovie;
