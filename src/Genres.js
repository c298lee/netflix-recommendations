import { useEffect, useState } from "react";
import { getAPI } from "./lib/API";

function Genres({selectedGenres, onChange, type}) {
    const [genres, setGenres] = useState([]);
    console.log(selectedGenres);
    const selected = selectedGenres ? selectedGenres.split('|').map(id => parseInt(id)) : [];
    console.log(genres);
  
    useEffect(() => {
        getAPI(`/genre/${type}/list`).then((json) => { setGenres(json.genres)})
    }, []);
  
    return (
      <>
        <h2>Choose Genres</h2>
        {genres.map(m => (
            <div key={m.id} className="form-check form-check-inline">
            <input
            className="form-check-input"
            type="checkbox"
            value={m.id}
            checked={selected.includes(m.id)}
            onChange={(e) => {
                if (e.target.checked) {
                onChange([...selected, e.target.value].join('|'));
                } else {
                selected.splice(selected.indexOf(parseInt(e.target.value)), 1);
                onChange(selected.join('|'));
                }
            }}
            />
            <label className="form-check-label">{m.name}</label>
        </div>
        ))}
        {/* <h2>Choose TV Genres</h2>
        {tvGenres.map(t => (
            <div key={t.id} className="form-check form-check-inline">
            <input
            className="form-check-input"
            type="checkbox"
            value={t.id}
            checked={selected.includes(t.id)}
            onChange={(e) => {
                if (e.target.checked) {
                onChange([...selected, e.target.value].join('|'));
                } else {
                selected.splice(selected.indexOf(parseInt(e.target.value)), 1);
                onChange(selected.join('|'));
                }
            }}
            />
            <label className="form-check-label">{t.name}</label>
        </div>
        ))} */}
      </>
    );
  }
  
  export default Genres;