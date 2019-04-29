import React, { Component } from 'react';
import SearchBar from '../../components/Search/Search';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import History from '../../components/History/History';
import Modal from '../../components/Modal/Modal';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import classes from './MainPanel.module.scss';

class MainPanel extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: 'home alone',
      currentSearch: {},
      relatedMovies: {},
      history: [],
      modal: false,
      itemsToShow: 6,
      expanded: false,
      loading: true,
      errorMessage: null,
    };
    this.submitEventHandler(); // init
    this.showMore = this.showMore.bind(this);
  }

  enterVerify = event => {
    if (event.charCode === 13) {
      this.submitEventHandler();
    }
  };

  purchaseHandler = title => {
    window.open(`https://www.amazon.co.uk/s?k=${title}`);
  };

  showMore() {
    this.state.itemsToShow === 6
      ? this.setState({
          itemsToShow: this.state.currentSearch.Search.length, // expand to full length
          expanded: true,
        })
      : this.setState({ itemsToShow: 6, expanded: false });
  }

  inputChangeHandler = event => {
    this.setState({ searchInput: event.target.value });
  };

  submitEventHandler = () => {
    // returns search from main search bar
    // var _this = this; --->could have been an alt to arrow func fix
    fetch(
      `https://www.omdbapi.com/?s=${this.state.searchInput}&apikey=4f4ff1ce`,
      {
        method: 'get',
      }
    )
      .then(response => {
        this.setState({ errorMessage: null });
        return response.text();
      })
      .then(text => {
        if (JSON.parse(text).Response === 'True') {
          const json = JSON.parse(text);
          this.setState({ currentSearch: json });
          this.setState({ loading: false });
        } else {
          this.setState({ errorMessage: JSON.parse(text).Error });
          this.setState({ loading: false });
        }
      })
      .then(() => {
        this.setState({ history: this.state.searchInput });
      });
  };

  inputHistory = query => {
    // returns search from when history items are clicked
    fetch(`https://www.omdbapi.com/?s=${query.search}&apikey=4f4ff1ce`, {
      method: 'get',
    })
      .then(response => {
        this.setState({ errorMessage: null });
        return response.text();
      })
      .then(text => {
        if (JSON.parse(text).Response === 'True') {
          const json = JSON.parse(text);
          this.setState({ currentSearch: json });
          this.setState({ loading: false });
        } else {
          this.setState({ errorMessage: JSON.parse(text).Error });
          this.setState({ loading: false });
        }
      })
      .then(() => {
        this.setState({ searchInput: query.search });
      });
  };

  modalClosed = () => {
    this.setState({ modal: false });
  };

  relatedMoviesHandler = title => {
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=4f4ff1ce`, {
      method: 'get',
    })
      .then(response => response.text())
      .then(text => {
        const json = JSON.parse(text);
        this.setState({ relatedMovies: json });
      })
      .then(() => {
        console.log(this.state.relatedMovies);
        this.setState({ modal: true });
      });
  };

  render() {
    return (
      <>
        <div className={classes.MainPanel}>
          <div className={classes.MainPanel__searchBar}>
            <SearchBar
              inputChangeHandler={this.inputChangeHandler}
              submitEvent={this.submitEventHandler}
              searchInput={this.state.searchInput}
              enterVerify={this.enterVerify}
            />
          </div>
          {this.state.currentSearch.Search === undefined ? null : this.state // initial action of loading or error message
              .loading && !this.state.errorMessage ? (
            <span className={classes.MainPanel__err} style={{ height: '100%' }}>
              Loading...
            </span>
          ) : this.state.errorMessage ? (
            <div className={classes.MainPanel__err}>
              {this.state.errorMessage}
            </div>
          ) : (
            <div className={classes.MainPanel__mainMovie}>
              {this.state.currentSearch.Search.slice(
                // displays 6 items intially
                0,
                this.state.itemsToShow
              ).map((movie, index) => (
                <MoviePoster
                  key={`${index}-${movie.Title}`}
                  movie={movie}
                  relatedMovies={this.relatedMoviesHandler}
                />
              ))}

              {this.state.expanded ? (
                <button
                  className={classes.MainPanel__btnLess}
                  onClick={this.showMore}
                >
                  <span>Show less</span>
                </button>
              ) : (
                <button
                  className={classes.MainPanel__btn}
                  onClick={this.showMore}
                >
                  <span>Show more</span>
                </button>
              )}
            </div>
          )}
          <div className={classes.MainPanel__history}>
            <History
              history={this.state.history}
              inputHistory={this.inputHistory}
            />
          </div>
        </div>
        <Modal show={this.state.modal} modalClosed={this.modalClosed}>
          <MovieInfo
            movie={this.state.currentSearch}
            movieExt={this.state.relatedMovies}
            purchaseHandler={this.purchaseHandler}
          />
        </Modal>
      </>
    );
  }
}

export default MainPanel;
