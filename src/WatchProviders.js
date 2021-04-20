import { useEffect, useState } from "react";
import { getAPI } from "./lib/API";

function WatchProviders() {
  const [providers, setProviders] = useState([]);
  console.log(providers);

  useEffect(() => {
    getAPI('/watch/providers/tv', { 'watch_region': 'CA' })
      .then((json) => { setProviders(json.results); });
  }, []);

  return (
    <>
      <h2>Choose Services</h2>
      {providers.map(p => <span>{p.provider_name}</span>)}
    </>
  );
}

export default WatchProviders;
