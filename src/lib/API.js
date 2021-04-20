import { API_KEY } from '../Constants';
const API_URL = 'https://api.themoviedb.org/3';

export function getAPI(endpoint, params = {}) {
  return fetch(`${API_URL}${endpoint}?api_key=${API_KEY}${Object.entries(params).map(([k, v]) => `&${k}=${v}`).join('')}`)
    .then(response => response.json());
}

export function postAPI(endpoint, data, params = {}) {
  return fetch(`${API_URL}${endpoint}?api_key=${API_KEY}${Object.entries(params).map(([k, v]) => `&${k}=${v}`).join('')}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(response => response.json());
}
