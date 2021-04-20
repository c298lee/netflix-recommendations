import { getAPI } from './lib/API';

function Home({ session }) {
  function handleLogin() {
    getAPI('/authentication/token/new')
      .then(json => {
        window.location = `https://www.themoviedb.org/authenticate/${json.request_token}?redirect_to=http://localhost:3000/approved`
      });
  }

  return (
    <header>
      <h1>Netflix Recommendations</h1>
      {session ? (
          <p>Session ID is: {session}</p>
      ) : (
        <a href="#login" onClick={handleLogin}>Log in to TMDB</a>
      )}
      <a href = "/discover">Discover</a>
    </header>
  );
}

export default Home;
