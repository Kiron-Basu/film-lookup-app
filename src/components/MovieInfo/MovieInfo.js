import React from 'react';
import classes from './MovieInfo.module.scss';
import noImage from '../images/no-image.png';

const MovieInfo = props => {
  const { movieExt } = props;
  const poster = movieExt.Poster === 'N/A' ? noImage : movieExt.Poster;
  return (
    <div className={classes.MovieInfo}>
      <div className={classes.MovieInfo__container}>
        <div className={classes.LeftSide}>
          <img
            className={[classes.MovieInfo__img, classes.MovieInfo__well].join(
              ' '
            )}
            alt="movie poster"
            src={poster}
            width="250"
            height="375"
          />
        </div>
        <div className={[classes.RightSide, classes.MovieInfo__well].join(' ')}>
          <h2>{movieExt.Title}</h2>
          <ul className={classes.List}>
            <li>
              <strong>Genre: </strong>
              {movieExt.Genre}
            </li>
            <li>
              <strong>Released: </strong>
              {movieExt.Released}
            </li>
            <li>
              <strong>Rated: </strong>
              {movieExt.Rated}
            </li>
            <li>
              <strong>IMDB Rating: </strong>
              {movieExt.imdbRating}
            </li>
            <li>
              <strong>Director: </strong>
              {movieExt.Director}
            </li>
            <li>
              <strong>Writer: </strong>
              {movieExt.Writer}
            </li>
            <li>
              <strong>Actors: </strong>
              {movieExt.Actors}
            </li>
          </ul>
        </div>
      </div>

      <div
        className={[classes.MovieInfo__plot, classes.MovieInfo__well].join(' ')}
      >
        <h3>Plot</h3>
        <p>{movieExt.Plot}</p>
      </div>
      <button
        type="button"
        className={classes.MovieInfo__button}
        onClick={() => props.purchaseHandler(movieExt.Title)}
      >
        Buy on Amazon
      </button>
      <div />
    </div>
  );
};

export default MovieInfo;
