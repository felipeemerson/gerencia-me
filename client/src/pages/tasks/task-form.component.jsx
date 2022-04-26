import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';
import { useCreateTask, useUpdateTask } from '../../api/tasks';
import { useGetAllCategories } from '../../api/categories';
import { getSuccessfulToastObject } from '../../utils/toast';

import {
    VStack,
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    RadioGroup,
    Radio,
    Select,
    Button,
    useToast
} from '@chakra-ui/react';

import FormError from '../../components/form-error/form-error.component';

const validationSchema = yup.object({
    title: yup
        .string()
        .max(100, 'O nome do tipo deve ter no máximo 25 caracteres')
        .required('Nome do tipo é obrigatório'),
    status: yup
        .string()
        .oneOf(['todo', 'doing', 'done'])
        .required('Status é obrigatório')
});

const TaskForm =  ({ task, handleClose, initialFocusRef }) => {
    const isEditing = Boolean(task);
    const hasCategory = Boolean(task?.categoryId);

    const auth = useAuth();
    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();
    const getAllCategoriesQuery = useGetAllCategories(auth.accessToken);
    
    const toast = useToast();

    const handleSuccess = () => {
        handleClose();
        toast(getSuccessfulToastObject(`Tarefa ${isEditing ? 'editada' : 'criada'} com sucesso`));
    }

    const formik = useFormik({
        initialValues: {
            title: isEditing ? task.title : '',
            status: isEditing ? task.status : 'todo',
            categoryId: isEditing && hasCategory ? task.categoryId : ''
        },
        validationSchema,
        onSubmit: (values) => {
            isEditing ?
                updateTaskMutation.mutate({
                        accessToken: auth.accessToken,
                        task: { ...values, _id: task._id,userId: task.userId }
                    },
                    { onSuccess: handleSuccess }
                ) :
                    createTaskMutation.mutate({ accessToken: auth.accessToken, task: values }, { onSuccess: handleSuccess })
        }
    });

    const handleStatusChange = (status) => {
        formik.setFieldValue('status', status);
    }

    const handleTypeIdChange = (event) => {
        formik.setFieldValue('categoryId', event.target.value);
    }

    const categoriesIsLoading = getAllCategoriesQuery.isLoading;
    const categories = getAllCategoriesQuery.data;
    const isError = createTaskMutation.isError || updateTaskMutation.isError || getAllCategoriesQuery.isError;
    const error = createTaskMutation.isError ? createTaskMutation.error
        :
            updateTaskMutation.isError ? updateTaskMutation.error
            :
                getAllCategoriesQuery.error;

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <VStack>
                    {                      
                        isError ? <FormError error={error} /> : null
                    }
                    <FormControl isInvalid={formik.touched.title && Boolean(formik.errors.title)} isRequired>
                        <FormLabel htmlFor='title'>Descrição</FormLabel>
                        <Input
                            type='text'
                            name='title'
                            placeholder='Digite a descrição'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            ref={initialFocusRef}
                        />
                        <FormErrorMessage>
                        {formik.touched.title && formik.errors.title}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.touched.status && Boolean(formik.errors.status)} isRequired>
                        <FormLabel htmlFor='status'>Status</FormLabel>
                        <RadioGroup onChange={handleStatusChange} value={formik.values.status}>
                            <Stack direction='row'>
                                <Radio value='todo'>A fazer</Radio>
                                <Radio value='doing'>Em progresso</Radio>
                                <Radio value='done'>Concluída</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='categoryId'>Categoria da tarefa</FormLabel>
                        <Select placeholder='Selecione a categoria da tarefa' onChange={handleTypeIdChange} value={formik.values.categoryId}>
                        {
                            categoriesIsLoading ? null : categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                        }
                        </Select>
                    </FormControl>

                    <Button type='submit' colorScheme='blue' alignSelf='end'>Salvar</Button>
                </VStack>
            </form>
        </>
    );
}

export default TaskForm;