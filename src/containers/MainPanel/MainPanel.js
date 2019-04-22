import React, { Component } from 'react';
import SearchBar from '../../components/Search/Search';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import History from '../../components/History/History';
import Modal from '../../components/Modal/Modal';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import classes from './MainPanel.module.scss';

class MainPanel extends Component {
    constructor(){
        super()
        this.state = {
              searchInput: '',
              currentSearch: {},
              relatedMovies: {},
              history: [],
              modal: false,
              itemsToShow: 6,
              expanded: false,
              loading: true,
              errorMessage: null 
        }
        this.showMore = this.showMore.bind(this); //why needed?
    }

    enterVerify = (event) => {
      console.log('enterVerify called with this ebent --> ', event);
      if(event.charCode ==13) {
        this.submitEventHandler()
      }
    }

    purchaseHandler = (title) => {
      window.open("https://www.amazon.co.uk/s?k=" + title)
      }

    showMore() {
      this.state.itemsToShow === 6 ? (
        this.setState({ itemsToShow: this.state.currentSearch.Search.length, expanded: true })
      ) : (
        this.setState({ itemsToShow: 6, expanded: false })
      )
    }

    inputChangeHandler = (event) => {
        this.setState({searchInput: event.target.value})
      }

    submitEventHandler = () => { //returns search from main search bar
        // var _this = this; --->could have been an alt to arrow func fix
          fetch('http://www.omdbapi.com/?s=' + this.state.searchInput + '&apikey=4f4ff1ce', {
              method: "get"
          }).then(response => {
              this.setState({errorMessage: null});
              return response.text();
          }).then(text => {
              console.log("text= ", JSON.parse(text).Response);
              if (JSON.parse(text).Response === "True") {
              let json = JSON.parse(text);
              this.setState({currentSearch: json});
              this.setState({loading: false})} else {
              this.setState({errorMessage: JSON.parse(text).Error});
              this.setState({loading: false});
              }
            }).then(() => { //arrow function fixed this error
             this.setState({history: this.state.searchInput});
          }).then(() => { //alt for too many searches
            //   this.relatedMoviesHandler(this.state.searchInput)
          })
      }
     
      inputHistory = (query) => { //returns search from when history items are clicked
        fetch('http://www.omdbapi.com/?s=' + query.search + '&apikey=4f4ff1ce', {
              method: "get"
          }).then(response => {
              this.setState({errorMessage: null});
              return response.text();
          }).then(text => {
            if (JSON.parse(text).Response === "True") {
              let json = JSON.parse(text);
              this.setState({currentSearch: json});
              this.setState({loading: false})} else {
              this.setState({errorMessage: JSON.parse(text).Error});
              this.setState({loading: false});
              }
            }).then(() => {
                this.setState({searchInput: query.search});
              }).then(() => {
               console.log('searchInput === ', this.state.searchInput)
              })
        }
      
      modalClosed = () => {
        this.setState({modal: false});
      }
      
      relatedMoviesHandler = (title) => {
        console.log('title passed in from poster= ', title)
        fetch('http://www.omdbapi.com/?t=' + title + '&apikey=4f4ff1ce', {
            method: "get"
        }).then(response => {
            return response.text();
        }).then(text => {
            let json = JSON.parse(text);
            this.setState({relatedMovies: json});
        }).then(() => {
            console.log(this.state.relatedMovies)
            this.setState({modal: true})
  })
    }

    render() {
      console.log(this.state.errorMessage);
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
            {this.state.currentSearch.Search === undefined ? null : 
            this.state.errorMessage ? <div className={classes.MainPanel__err}>{this.state.errorMessage}</div> :
            <div className={classes.MainPanel__mainMovie}>   
            {this.state.currentSearch.Search.slice(0,this.state.itemsToShow).map((movie, index) => (
            <MoviePoster key={`${index}-${movie.Title}`} movie={movie} relatedMovies={this.relatedMoviesHandler}/>
          )) 
          }
          
          {this.state.expanded ? (
            <button className={classes.MainPanel__btnLess} onClick={this.showMore}>
             <span>Show less</span>
            </button>
           ) : (
            <button className={classes.MainPanel__btn} onClick={this.showMore}>
             <span>Show more</span>
             </button>
           )
          }
            </div>}
            <div className={classes.MainPanel__history}>
                <History history={this.state.history} inputHistory={this.inputHistory} />
            </div>
        </div>
        <Modal show={this.state.modal} modalClosed={this.modalClosed}>
            <MovieInfo movie={this.state.currentSearch} movieExt={this.state.relatedMovies} purchaseHandler={this.purchaseHandler}/>
        </Modal>
        </>
        )
    }
}   

export default MainPanel;
