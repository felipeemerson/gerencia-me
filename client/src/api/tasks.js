import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const TASKS_URL = '/api/tasks';

async function getAllTasks(accessToken) {
    const { data } = await axios({
        url: TASKS_URL,
        method: 'get',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

async function createTask(accessToken, task) {
    const { data } = await axios({
        url: TASKS_URL,
        method: 'post',
        headers: {
            "Authorization": accessToken
        },
        data: task
    });

    return data;
}

async function updateTask(accessToken, task) {
    const { data } = await axios({
        url: TASKS_URL + `/${task._id}`,
        method: 'put',
        headers: {
            "Authorization": accessToken
        },
        data: task
    });

    return data;
}

async function deleteTask(accessToken, taskId) {
    const { data } = await axios({
        url: TASKS_URL + `/${taskId}`,
        method: 'delete',
        headers: {
            "Authorization": accessToken
        }
    });

    return data;
}

async function deleteTasksFromStatus(accessToken, status) {
    await axios({
        url: TASKS_URL + `/status/${status}`,
        method: 'delete',
        headers: {
            "Authorization": accessToken
        }
    });
}

export function useGetAllTasks(accessToken) {
    return useQuery('tasks', () => getAllTasks(accessToken));
}

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, task }) => createTask(accessToken, task), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('tasks');
            queryClient.setQueryData('tasks', old => [...old, result]);
        }
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, task }) => updateTask(accessToken, task), {
        onMutate: async (variables) => {
            await queryClient.cancelQueries('tasks');
            
            queryClient.setQueryData('tasks', old => old.map(task => {
                return task._id === variables.task._id ?
                    {
                        ...task,
                        status: variables.task.status
                    }
                :
                    task
            }));

            return { task: variables.task };
        },
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('tasks');
            queryClient.setQueryData('tasks', old => old.map(task => task._id === result._id ? result : task));
        },
        onError: async (result, variables, context) => {
            queryClient.setQueryData('tasks', old => old.map(task => {
                return task._id === context.task._id ? context.task : task
            }));
        }
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, taskId }) => deleteTask(accessToken, taskId), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('tasks');
            queryClient.setQueryData('tasks', old => old.filter(task => task._id !== result._id));
        }
    })
}

export function useDeleteTasksFromStatus() {
    const queryClient = useQueryClient();

    return useMutation(({ accessToken, status }) => deleteTasksFromStatus(accessToken, status), {
        onSuccess: async (result, variables, context) => {
            await queryClient.cancelQueries('tasks');
            queryClient.setQueryData('tasks', old => old.filter(task => task.status !== variables.status));
        }
    })
}