import axios from 'axios';

const AUTH_URL = '/api/auth';

export function doLogin(credentials) {
    return axios.post(AUTH_URL, credentials);
}