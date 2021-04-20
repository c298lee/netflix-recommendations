import { getAPI } from './lib/API';

function Home({ session }) {
  function handleLogin() {
    getAPI('/authentication/token/new')
      .then(json => {
        window.location = `https://www.themoviedb.org/authenticate/${json.request_token}?redirect_to=http://localhost:3000/approved`
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href="#login" onClick={handleLogin}>Log in to TMDB</a>
        {session && <p>Session ID is: {session}</p>}
      </header>
    </div>
  );
}

export default Home;
