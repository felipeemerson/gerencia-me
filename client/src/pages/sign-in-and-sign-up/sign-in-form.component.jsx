import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../contexts/auth.context';

import  {
    AiOutlineUser,
    AiFillEye,
    AiFillEyeInvisible
} from 'react-icons/ai';

import {
    Heading, 
    VStack,
    Avatar,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Link
} from '@chakra-ui/react';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória')
});

const SignInForm = ({ handleChangePage }) => {
    const auth = useAuth();
    const { login } = auth;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            login(values);
        }
    });

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    return (
        <VStack>
                <Avatar color="blue.500" bg="white" icon={<AiOutlineUser fontSize="3em" />} />
                <Heading size="lg">Entre</Heading>
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>
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
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        name='password'
                                        placeholder='Digite sua senha'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button bg="white" h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? <AiFillEyeInvisible fontSize='1.5em' /> : <AiFillEye fontSize='1.5em' />}
                                        </Button>
                                    </InputRightElement>
                                    </InputGroup>
                            <FormErrorMessage>
                            {formik.touched.password && formik.errors.password}
                            </FormErrorMessage>
                        </FormControl>

                        <Button type='submit' colorScheme='blue' isFullWidth>Entrar</Button>

                        <Link onClick={handleChangePage}>Ainda não tem cadastro? Cadastre-se</Link>
                    </VStack>
                </form>
            </VStack>
    );
}

export default SignInForm;