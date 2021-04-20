import React, { useEffect, useState } from 'react';
import { getAPI } from './lib/API';
import WatchProviders from './WatchProviders';

function getMovieAPI(params) {
  return getAPI('/discover/movie', params);
}

function getShowAPI(params) {
  return getAPI('/discover/tv', params);
}

function Discover() {
  const [movies, setMovies] = useState(null)
  const [shows, setShows] = useState(null)
  useEffect(() => {
    getMovieAPI({ 'sort_by': 'popularity.desc' }).then((json) => {setMovies(json.results)})
    getShowAPI({ 'sort_by': 'popularity.desc' }).then((json) => {setShows(json.results)})
  }, []);
 
  return (
    <div className="results">
      <WatchProviders />
      <h2>Discover Movies</h2>
      {movies && movies.map(movie => (
          <div className="movie" key={movie.id}>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
          </div>
      ))}
      <h2>Discover Shows</h2>
      {shows && shows.map(show => (
          <div className="show" key={show.id}>
            <h3>{show.name}</h3>
            <p>{show.overview}</p>
          </div>
      ))}
    </div>
  );
}

export default Discover;
