import axios from 'axios';

const TYPES_URL = '/api/types';

export async function getAllTypesFromUser(accessToken) {
    const { data } = await axios({
        url: TYPES_URL,
        method: 'get',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

export async function createType(accessToken, type) {
    const { data } = await axios({
        url: TYPES_URL,
        method: 'post',
        headers: {
            "Authorization": accessToken
        },
        data: type
    });

    return data;
}