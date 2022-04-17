import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';
import { useCreateTask, useUpdateTask } from '../../api/tasks';
import { useGetAllTypesFromUser } from '../../api/types';

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
    const hasType = Boolean(task?.typeId);

    const auth = useAuth();
    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();
    const getAlltypesQuery = useGetAllTypesFromUser(auth.accessToken);
    
    const toast = useToast();

    const handleSuccess = () => {
        handleClose();
        toast({
            title: `Tarefa ${isEditing ? 'editada' : 'criada'} com sucesso`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    }

    const formik = useFormik({
        initialValues: {
            title: isEditing ? task.title : '',
            status: isEditing ? task.status : 'todo',
            typeId: isEditing && hasType ? task.typeId : ''
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
        formik.setFieldValue('typeId', event.target.value);
    }

    const typesIsLoading = getAlltypesQuery.isLoading;
    const types = getAlltypesQuery.data;
    const isError = createTaskMutation.isError || updateTaskMutation.isError || getAlltypesQuery.isError;
    const error = createTaskMutation.isError ? createTaskMutation.error
        :
            updateTaskMutation.isError ? updateTaskMutation.error
            :
                getAlltypesQuery.error;

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
                                <Radio value='doing'>Fazendo</Radio>
                                <Radio value='done'>Feito</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='typeId'>Tipo da tarefa</FormLabel>
                        <Select placeholder='Selecione o tipo da tarefa' onChange={handleTypeIdChange} value={formik.values.typeId}>
                        {
                            typesIsLoading ? null : types.map(type => <option key={type._id} value={type._id}>{type.name}</option>)
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