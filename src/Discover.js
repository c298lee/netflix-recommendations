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
  const [providers, setProviders] = useState('');

  useEffect(() => {
    const params = {
      'sort_by': 'popularity.desc',
      'watch_region': 'CA',
      'with_release_type': '4|6',
    };

    if (providers) {
      params.with_watch_providers = providers;
    }

    getMovieAPI(params).then((json) => {setMovies(json.results)})
    getShowAPI(params).then((json) => {setShows(json.results)})
  }, [providers]);
 
  return (
    <div className="results">
      <WatchProviders selectedProviders={providers} onChange={(newProviders) => { setProviders(newProviders); }} />
      
      <div className="row">
        <div className="col-sm-6">
          <h2>Discover Movies</h2>
          {movies && movies.map(movie => (
            <div className="movie" key={movie.id}>
              <h3>{movie.original_title}</h3>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
        <div className="col-sm-6">
        <h2>Discover Shows</h2>
        {shows && shows.map(show => (
          <div className="show" key={show.id}>
            <h3>{show.name}</h3>
            <p>{show.overview}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
