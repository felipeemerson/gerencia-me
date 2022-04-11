import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const TYPES_URL = '/api/types';



async function getAllTypesFromUser(accessToken) {
    const { data } = await axios({
        url: TYPES_URL,
        method: 'get',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

async function createType(accessToken, type) {
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

async function deleteType(accessToken, typeId) {
    const { data } = await axios({
        url: TYPES_URL + `/${typeId}`,
        method: 'delete',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

export function useGetAllTypesFromUser(accessToken) {
    return useQuery('types', () => getAllTypesFromUser(accessToken));
}

export function useCreateType() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, type }) => createType(accessToken, type), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('types');
            queryClient.setQueryData('types', old => [...old, result]);
        }
    });
}

export function useDeleteType() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, typeId }) => deleteType(accessToken, typeId), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('types');
            queryClient.setQueryData('types', old => old.filter(type => type._id !== result._id));
        }
    });
}