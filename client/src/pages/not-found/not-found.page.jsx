import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

import { AiOutlineWarning } from 'react-icons/ai';

import {
    VStack,
    Heading,
    Text,
    Icon,
    Button
} from '@chakra-ui/react';

const NotFoundPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { isLoggedIn } = auth;

    console.log(isLoggedIn);

    const handleClick = () => [
        navigate(isLoggedIn ? "/" : "/login")
    ]

    return (
        <>
            <VStack mt='250px'>
                <Icon w='125px' h='125px' as={AiOutlineWarning} color='orange.500' />
                <Heading as='h1' size='2xl' color='orange.500'>404</Heading>
                <Text fontSize='lg'>Não encontramos o que está procurando...</Text>
                <Button variant='link' onClick={handleClick}>{ isLoggedIn ? "Ir para a página inicial" : "Fazer login"}</Button>
            </VStack>
        </>
    );
}

export default NotFoundPage;