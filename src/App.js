import React, { Component } from 'react';
import Nav from './components/Navigation/Navigation';
import MainPanel from './containers/MainPanel/MainPanel';
import './App.css';

// let movieResults = [];


class App extends Component {
  constructor() { //can we simplify setting of state here?
    // fetch('http://www.omdbapi.com/?s=jurassic&apikey=4f4ff1ce', {
    //       method: "get"
    //   }).then(response => {
    //       return response.text();
    //   }).then(text => {
    //       let json = JSON.parse(text);
    //       this.setState({currentSearch: json});
    //   }) //alt for too many searches
    //   .then(() => {
    //     console.log('currentSeach after componentWillmount=   ', this.state.currentSearch);
    //   })

    super()
    this.state = {
      }
    }


  

  render() {
    // console.log('currentSeach =   ', this.state.currentSearch.Search);
    return (
      <div className="App">
          <Nav />
          <MainPanel 
          // inputChangeHandler={this.inputChangeHandler} 
          // submitEvent={this.submitEventHandler} 
          // mainMovie={this.state.currentSearch.Search.map(movie => {return {title: movie.title}})}
          // history={history}
          />
      </div>
    );
  }
}

export default App;
