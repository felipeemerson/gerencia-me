import React from 'react';
import { getTranslation } from '../../utils/errors.translation';

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react';

const PageError = ({ error }) => {
    
    return (
        <>
            <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='600px'
                bg='unset'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    {getTranslation(error?.response?.data)}
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    Tente novamente!
                </AlertDescription>
            </Alert>
        </>
    );
}

export default PageError;