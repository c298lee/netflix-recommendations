import React, { useEffect, useState } from 'react';
import { getAPI } from './lib/API';
import WatchlistButton from './WatchlistButton';
import WatchProviders from './WatchProviders';
import Genres from './Genres';

function getMovieAPI(params) {
  return getAPI('/discover/movie', params);
}

function getShowAPI(params) {
  return getAPI('/discover/tv', params);
}

function Discover({ session }) {
  const [movies, setMovies] = useState(null)
  const [shows, setShows] = useState(null)
  const [providers, setProviders] = useState('');
  const [tvgenres, setTvGenres] = useState('');
  const [moviegenres, setMovieGenres] = useState('');
  const [accountId, setAccountId] = useState(null);
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [tvWatchlist, setTVWatchlist] = useState([]);

  useEffect(() => {
    if (session) {
      getAPI('/account', { session_id: session }).then((json) => setAccountId(json.id));
    }
  }, [session]);

  useEffect(() => {
    if (accountId && session) {
      getAPI(`/account/${accountId}/watchlist/movies`, { session_id: session }).then((json) => setMovieWatchlist(json.results));
      getAPI(`/account/${accountId}/watchlist/tv`, { session_id: session }).then((json) => setTVWatchlist(json.results));
    }
  }, [accountId, session]);

  useEffect(() => {
    const tvparams = {
      'sort_by': 'popularity.desc',
      'watch_region': 'CA',
      'with_release_type': '4|6',
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
      <div className="row">
        <div className="col-sm-6">
          <h2>Discover Movies</h2>
          <Genres selectedGenres={moviegenres} onChange={(newGenres) => { setMovieGenres(newGenres); }} type='movie'/>
          {movies && movies.map(movie => (
            <div className="movie" key={movie.id}>
              <h3>{movie.original_title}</h3>
              <p>{movie.overview}</p>
              <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} />
              <WatchlistButton sessionId={session} accountId={accountId} mediaId={movie.id} mediaType="movie" />
            </div>
          ))}
        </div>
        <div className="col-sm-6">
        <h2>Discover Shows</h2>
        <Genres selectedGenres={tvgenres} onChange={(newGenres) => { setTvGenres(newGenres); }} type='tv'/>
        {shows && shows.map(show => (
          <div className="show" key={show.id}>
            <h3>{show.name}</h3>
            <p>{show.overview}</p>
            <img src={"https://image.tmdb.org/t/p/w200" + show.poster_path} />
            <WatchlistButton sessionId={session} accountId={accountId} mediaId={show.id} mediaType="tv" />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
