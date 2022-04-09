import axios from 'axios';

const BASE_URL = '/api/types';

export async function fetchAllTypesFromUser(accessToken) {
    const { data } = await axios({
        url: BASE_URL,
        method: 'get',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

export async function postType(accessToken, type) {
    const { data } = await axios({
        url: BASE_URL,
        method: 'post',
        headers: {
            "Authorization": accessToken
        },
        data: type
    });

    return data;
}