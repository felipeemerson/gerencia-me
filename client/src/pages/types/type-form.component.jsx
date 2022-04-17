import React from 'react';
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
    useToast
} from '@chakra-ui/react';

import ColorPicker from '../../components/color-picker/color-picker.component';
import FormError from '../../components/form-error/form-error.component';

const validationSchema = yup.object({
    name: yup
        .string()
        .max(25, 'O nome do tipo deve ter no máximo 25 caracteres')
        .required('Nome do tipo é obrigatório')
});

const TypeForm = ({ handleClose, type, initialFocusRef }) => {
    const auth = useAuth();
    const createTypeMutation = useCreateType();
    const updateTypeMutation = useUpdateType();
    const toast = useToast();
    const isEditing = Boolean(type);

    const handleSuccess = () => {
        toast({
            title: `Tipo ${isEditing ? 'editado' : 'criado'} com sucesso`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        handleClose();
    }

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
                }, { onSuccess: handleSuccess })
            :
                createTypeMutation.mutate({ accessToken: auth.accessToken, type: values }, { onSuccess: handleSuccess });
                
        }
    });

    const handleColorChange = (color) => {
        formik.setFieldValue('color', color);
    }

    const isError = updateTypeMutation.isError || createTypeMutation.isError;
    const error = updateTypeMutation.isError ?
            updateTypeMutation.error
        :
            createTypeMutation.error;

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                    {
                        isError ? <FormError error={error} /> : null
                    }

                    <FormControl isInvalid={formik.touched.name && Boolean(formik.errors.name)} isRequired>
                        <FormLabel htmlFor='name'>Nome</FormLabel>
                            <Input
                                type='text'
                                name='name'
                                placeholder='Digite o nome do tipo'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                ref={initialFocusRef}
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