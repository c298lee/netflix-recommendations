import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAPI } from './lib/API';
import queryString from 'query-string';
import Discover from './Discover';

function Session({ handleSession, location }) {
  const { request_token } = queryString.parse(location.search);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getAPI('/authentication/session/new', {
      request_token,
    }).then((json) => {
      setSession(json.session_id)
    })
  }, [request_token, handleSession]);

  useEffect(() => {
    if (session !== null) {
      handleSession(session);
    }
  }, [handleSession, session]);

  if (!session) {
    return <h1>Loading...</h1>;
  }

  return <Redirect to="/discover" />;
}

function App() {
  const [session, setSession] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home session={session} />
        </Route>
        <Route path="/approved" render={({ location }) => (
          <Session location={location} handleSession={(newSession) => { setSession(newSession); }} />
        )} />
        <Route path="/discover">
          <Discover session={session} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
