import React from 'react';

import { Alert, AlertIcon } from '@chakra-ui/react';

const FormError = ({ error }) => {

    return (
        <Alert status='error'>
            <AlertIcon />
            {error.response.data}
        </Alert>
    );
}

export default FormError;