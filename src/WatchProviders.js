import { useEffect, useState } from "react";
import { getAPI } from "./lib/API";

const IMG_URL = 'http://image.tmdb.org/t/p/';
const LOGO_SIZE = 'w45';

function WatchProviders({ selectedProviders, onChange }) {
  const [providers, setProviders] = useState([]);
  console.log(providers);
  const selected = selectedProviders ? selectedProviders.split('|').map(id => parseInt(id)) : [];
  console.log(selected);

  useEffect(() => {
    getAPI('/watch/providers/tv', { 'watch_region': 'CA' })
      .then((json) => { setProviders(json.results); });
  }, []);

  return (
    <>
      <h2>Choose Services</h2>
      {providers.map(p => (
        <div key={p.provider_id} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value={p.provider_id}
            checked={selected.includes(p.provider_id)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...selected, e.target.value].join('|'));
              } else {
                selected.splice(selected.indexOf(parseInt(e.target.value)), 1);
                onChange(selected.join('|'));
              }
            }}
          />
          <label className="form-check-label"><img src={`${IMG_URL}${LOGO_SIZE}${p.logo_path}`} alt={p.provider_name} /></label>
        </div>
      ))}
    </>
  );
}

export default WatchProviders;
