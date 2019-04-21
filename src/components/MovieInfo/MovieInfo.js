import React from 'react';
import classes from './MovieInfo.module.scss';
import noImage from '../images/no-image.png';

const MovieInfo = (props) => {
    const poster = props.movieExt.Poster === "N/A" ? noImage : props.movieExt.Poster;
    return (
        <div className={classes.MovieInfo}>
            <div className={classes.MovieInfo__container}>
                <div className={classes.LeftSide}>
                    <img className={[classes.MovieInfo__img, classes.MovieInfo__well].join(' ')} alt="movie poster"src={poster} width="250" height="375"/>
                </div>
                <div className={[classes.RightSide, classes.MovieInfo__well].join(' ')}>
                    <h2>{props.movieExt.Title}</h2>
                    <ul className={classes.List}>
                        <li><strong>Genre: </strong>{props.movieExt.Genre}</li>
                        <li><strong>Released: </strong>{props.movieExt.Released}</li>
                        <li><strong>Rated: </strong>{props.movieExt.Rated}</li>
                        <li><strong>IMDB Rating: </strong>{props.movieExt.imdbRating}</li>
                        <li><strong>Director: </strong>{props.movieExt.Director}</li>
                        <li><strong>Writer: </strong>{props.movieExt.Writer}</li>
                        <li><strong>Actors: </strong>{props.movieExt.Actors}</li>
                    </ul>
                </div>
            </div>
            
            <div div className={[classes.MovieInfo__plot, classes.MovieInfo__well].join(' ')}>
                <h3>Plot</h3>
                <p>{props.movieExt.Plot}</p>
            </div>
            <button className={classes.MovieInfo__button}>Buy on Amazon</button>
        <div>
        
            </div>
        </div>
        
    )
}

export default MovieInfo;


// https://www.amazon.co.uk/s?k=pip+the+movie&ref=nb_sb_noss_2