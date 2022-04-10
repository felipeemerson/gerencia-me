import axios from 'axios';

const USERS_URL = '/api/users';

export async function createUser(user) {
    const { data, headers } = await axios.post(USERS_URL, user);

    return { user: data, token: headers["authorization"] };
}

export async function getMe(accessToken) {
    const { data } = await axios({
        url: USERS_URL + '/me',
        method: 'get',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}