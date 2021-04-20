import React, { useEffect, useState } from 'react';
import { API_KEY } from './Constants';
import WatchProviders from './WatchProviders';
const API_URL = 'https://api.themoviedb.org/3';

function getMovieAPI(endpoint) {
    return fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&${endpoint}`)
      .then(response => response.json());
}

function getShowAPI(endpoint) {
return fetch(`${API_URL}/discover/tv?api_key=${API_KEY}&${endpoint}`)
    .then(response => response.json());
}

function Discover() {
  const [movies, setMovies] = useState(null)
  const [shows, setShows] = useState(null)
  useEffect(() => {
    getMovieAPI('sort_by=popularity.desc').then((json) => {setMovies(json.results)})
    getShowAPI('sort_by=popularity.desc').then((json) => {setShows(json.results)})
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
