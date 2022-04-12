import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';
import { useCreateType, useUpdateType } from '../../api/types';

import {
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Alert,
    AlertIcon
} from '@chakra-ui/react';

import ColorPicker from '../../components/color-picker/color-picker.component';

const validationSchema = yup.object({
    name: yup
        .string()
        .max(25, 'O nome do tipo deve ter no máximo 25 caracteres')
        .required('Nome do tipo é obrigatório')
});

const TypeForm = ({ handleClose, type }) => {
    const auth = useAuth();
    const createTypeMutation = useCreateType();
    const updateTypeMutation = useUpdateType();
    const isEditing = Boolean(type);

    const formik = useFormik({
        initialValues: {
            name: isEditing ? type.name : '',
            color: isEditing ? type.color : 'gray.400'
        },
        validationSchema,
        onSubmit: (values) => {
            isEditing ?
                updateTypeMutation.mutate({ accessToken: auth.accessToken, type: 
                    {
                        color: values.color,
                        name: values.name,
                        _id: type._id,
                        userId: type.userId
                    }
                })
            :
                createTypeMutation.mutate({ accessToken: auth.accessToken, type: values });
        }
    });

    const handleColorChange = (color) => {
        formik.setFieldValue('color', color);
    }

    if (createTypeMutation.isSuccess || updateTypeMutation.isSuccess) {
        handleClose();
    }

    const hasError = () => {
        return updateTypeMutation.isError || createTypeMutation.isError;
    }

    const getError = () => {
        return isEditing ?
            updateTypeMutation.error.response.data
        :
            createTypeMutation.error.response.data;
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                    {
                        hasError() ? (
                            <Alert status='error'>
                                <AlertIcon />
                                {getError()}
                            </Alert>
                        ) : null
                    }

                    <FormControl isInvalid={formik.touched.name && Boolean(formik.errors.name)} isRequired>
                        <FormLabel htmlFor='name'>Nome</FormLabel>
                            <Input
                                type='text'
                                name='name'
                                placeholder='Digite o nome do tipo'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        <FormErrorMessage>
                        {formik.touched.name && formik.errors.name}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='color'>Cor</FormLabel>
                        <ColorPicker onChange={handleColorChange} color={formik.values.color} />
                    </FormControl>
                    <Button type='submit' colorScheme='blue' alignSelf='end'>Salvar</Button>
                </VStack>
            </form>
        </>
    );
}

export default TypeForm;