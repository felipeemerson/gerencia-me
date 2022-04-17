import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';

import  { AiOutlineUserAdd } from 'react-icons/ai';

import {
    Heading, 
    VStack,
    Avatar,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Link
} from '@chakra-ui/react';

import FormError from '../../components/form-error/form-error.component';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
    confirmPassword: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Confirme a senha')
        .oneOf([yup.ref("password")], "As senhas são diferentes"),
    name: yup
        .string()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('Nome é obrigatório')
});

const SignUpForm = ({ handleChangePage }) => {
    const auth = useAuth();
    const { createUserAndDoLogin, isSignUpError, signUpError } = auth;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            const {confirmPassword, ...user } = values
            createUserAndDoLogin(user);
        }
    });

    return (
        <VStack>
                <Avatar color="blue.500" bg="white" icon={<AiOutlineUserAdd fontSize="4em" />}/>
                <Heading size="lg">Cadastre-se</Heading>
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>
                        {
                            isSignUpError ? <FormError error={{ response: { data: signUpError } }} /> : null
                        }
                        <FormControl isInvalid={formik.touched.name && Boolean(formik.errors.name)} isRequired>
                            <FormLabel htmlFor='name'>Nome</FormLabel>
                                <Input
                                        type='text'
                                        name='name'
                                        placeholder='Digite seu nome'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                            <FormErrorMessage>
                            {formik.touched.name && formik.errors.name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.email && Boolean(formik.errors.email)} isRequired>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='Digite seu email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            <FormErrorMessage>
                            {formik.touched.email && formik.errors.email}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.password && Boolean(formik.errors.password)} isRequired>
                            <FormLabel htmlFor='password'>Senha</FormLabel>
                                <Input
                                        type='password'
                                        name='password'
                                        placeholder='Digite sua senha'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                            <FormErrorMessage>
                            {formik.touched.password && formik.errors.password}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} isRequired>
                            <FormLabel htmlFor='confirmPassword'>Confirmar senha</FormLabel>
                                <Input
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='Confirme sua senha'
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                    />
                            <FormErrorMessage>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword}
                            </FormErrorMessage>
                        </FormControl>

                        <Button type='submit' colorScheme='blue' isFullWidth>Cadastrar</Button>

                        <Link onClick={handleChangePage}>Já tem cadastro? Entre</Link>
                    </VStack>
                </form>
            </VStack>
    );
}

export default SignUpForm;