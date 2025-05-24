
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchJSON = (endpoint) =>
    fetch(`${API_BASE_URL}${endpoint}`).then(res => res.json());
