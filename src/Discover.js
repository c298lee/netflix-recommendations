import React, { useEffect, useState } from 'react';
import { getAPI } from './lib/API';
import WatchProviders from './WatchProviders';
import Genres from './Genres';

function getMovieAPI(params) {
  return getAPI('/discover/movie', params);
}

function getShowAPI(params) {
  return getAPI('/discover/tv', params);
}

function Discover() {
  const [movies, setMovies] = useState(null)
  const [shows, setShows] = useState(null)
  const [providers, setProviders] = useState('');
  const [tvgenres, setTvGenres] = useState('');
  const [moviegenres, setMovieGenres] = useState('');

  useEffect(() => {
    const tvparams = {
      'sort_by': 'popularity.desc',
      'watch_region': 'CA',
    };
    const movieparams = {
        'sort_by': 'popularity.desc',
        'watch_region': 'CA',
    };

    if (providers) {
      tvparams.with_watch_providers = providers;
      movieparams.with_watch_providers = providers;
    }

    if (tvgenres) {
        tvparams.with_genres = tvgenres;
    }

    if (moviegenres) {
        movieparams.with_genres = moviegenres;
    }

    getMovieAPI(movieparams).then((json) => {setMovies(json.results)})
    getShowAPI(tvparams).then((json) => {setShows(json.results)})
  }, [providers, tvgenres, moviegenres]);
 
  return (
    <div className="results">
      <WatchProviders selectedProviders={providers} onChange={(newProviders) => { setProviders(newProviders); }} />
      <h2>Discover Movies</h2>
      <Genres selectedGenres={moviegenres} onChange={(newGenres) => { setMovieGenres(newGenres); }} type='movie'/>
      {movies && movies.map(movie => (
          <div className="movie" key={movie.id}>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
          </div>
      ))}
      <h2>Discover Shows</h2>
      <Genres selectedGenres={tvgenres} onChange={(newGenres) => { setTvGenres(newGenres); }} type='tv'/>
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
