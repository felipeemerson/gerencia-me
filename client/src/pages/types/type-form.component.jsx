import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';
import { useCreateType } from '../../api/types';

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

const TypeForm = ({ handleClose }) => {
    const auth = useAuth();
    const { mutate, isSuccess, isError, error, isLoading } = useCreateType();

    const formik = useFormik({
        initialValues: {
            name: '',
            color: 'gray.400'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutate({ accessToken: auth.accessToken, type: values });
        }
    });

    const handleColorChange = (color) => {
        formik.setFieldValue('color', color);
    }

    if (isSuccess) {
        handleClose();
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                    {
                        isError && !isLoading ? (
                            <Alert status='error'>
                                <AlertIcon />
                                {error.response.data}
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
                        <ColorPicker onChange={handleColorChange} />
                    </FormControl>
                    <Button type='submit' colorScheme='blue' alignSelf='end'>Salvar</Button>
                </VStack>
            </form>
        </>
    );
}

export default TypeForm;