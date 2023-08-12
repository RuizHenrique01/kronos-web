import axios from 'axios';
import environment from '../environments';

const token: string | null = localStorage.getItem('token');

const api = axios.create({
    baseURL: environment.API_URL,
    headers: {
        Authorization: token ? 'Bearer ' + token : null
    }
});

export default api;