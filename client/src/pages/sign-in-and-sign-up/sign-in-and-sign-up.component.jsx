import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Container } from '@chakra-ui/react';

import SignInForm from './sign-in-form.component';
import SignUpForm from './sign-up-form.component';


const SignInAndSignUpPage = () => {
    const [page, setPage] = useState('signIn');

    const handleChangePage = () => {
        page === 'signIn' ? setPage('signOut') : setPage('signIn');
    }

    return (
        <Container centerContent w="100vw" h="100vh" justifyContent="center">
            {
                page === 'signIn' ? <SignInForm handleChangePage={handleChangePage} /> : <SignUpForm handleChangePage={handleChangePage} />
            }
        </Container>
    );
}

export default SignInAndSignUpPage;