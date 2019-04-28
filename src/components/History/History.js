import React, { Component } from 'react';
import classes from './History.module.scss';
import Query from '../Query/Query';

const history = [];

class History extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.history === nextProps.history) {
      return false;
    }
    return true;
  }

  render() {
    history.push(this.props.history);
    return (
      <>
        <div className={classes.History}>
          <h2>History</h2>
          {history.map((search, index) => (
            <Query
              key={index}
              history={search}
              onClick={() => this.props.inputHistory({ search })}
            />
          ))}
        </div>
      </>
    );
  }
}

export default History;
