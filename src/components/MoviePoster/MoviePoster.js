import React from 'react';
import classes from './MoviePoster.module.scss';
import noImage from '../images/no-image.png';

let title;
const MoviePoster = props => {
  const poster = props.movie.Poster === 'N/A' ? noImage : props.movie.Poster;
  if (props.movie.Title.length > 30) {
    // truncates long titles
    title = `${props.movie.Title.substring(0, 27)  }...`;
  } else {
    title = props.movie.Title;
  }
  return (
    <div className={classes.MoviePoster}>
      <h2>{title}</h2>
      <div>
        <img src={poster} alt="Movie Poster" width="150" />
      </div>
      <h4>({props.movie.Year})</h4>
      <button
        type="button"
        className={classes.MoviePoster}
        onClick={() => props.relatedMovies(props.movie.Title)}
      >
        Info
      </button>
    </div>
  );
};

export default MoviePoster;
