import './App.css';
import { API_KEY } from './Constants';

const API_URL = 'https://api.themoviedb.org/3';

function getAPI(endpoint) {
  return fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
    .then(response => response.json());
}

function App() {
  function handleLogin() {
    getAPI('/authentication/token/new')
      .then(json => { console.log(json); });
  }

  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href="#login" onClick={handleLogin}>Log in to TMDB</a>
      </header>
    </div>
  );
}

export default App;
