import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const CATEGORIES_URL = '/api/categories';

async function getAllCategories(accessToken) {
    const { data } = await axios({
        url: CATEGORIES_URL,
        method: 'get',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

async function createCategory(accessToken, category) {
    const { data } = await axios({
        url: CATEGORIES_URL,
        method: 'post',
        headers: {
            "Authorization": accessToken
        },
        data: category
    });

    return data;
}

async function updateCategory(accessToken, category) {
    const { data } = await axios({
        url: CATEGORIES_URL + `/${category._id}`,
        method: 'put',
        headers: {
            "Authorization": accessToken
        },
        data: category
    });

    return data;
}

async function deleteCategory(accessToken, categoryId) {
    const { data } = await axios({
        url: CATEGORIES_URL + `/${categoryId}`,
        method: 'delete',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

export function useGetAllCategories(accessToken) {
    return useQuery('categories', () => getAllCategories(accessToken));
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, category }) => createCategory(accessToken, category), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('categories');
            queryClient.setQueryData('categories', old => [...old, result]);
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, category }) => updateCategory(accessToken, category), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('categories');
            queryClient.setQueryData('categories', old => old.map(category => category._id === result._id ? result : category));
        }
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, categoryId }) => deleteCategory(accessToken, categoryId), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('categories');
            queryClient.setQueryData('categories', old => old.filter(category => category._id !== result._id));
        }
    });
}