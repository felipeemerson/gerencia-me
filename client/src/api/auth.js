import axios from 'axios';

const AUTH_URL = '/api/auth';

export async function doLogin(credentials) {
    let result = await axios.post(AUTH_URL, credentials);
    const token = result.data;

    return token;
}