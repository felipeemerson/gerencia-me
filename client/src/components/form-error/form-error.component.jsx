import React from 'react';
import { getTranslation } from '../../utils/errors.translation';

import { Alert, AlertIcon } from '@chakra-ui/react';

const FormError = ({ error }) => {

    return (
        <Alert status='error'>
            <AlertIcon />
            {getTranslation(error.response.data)}
        </Alert>
    );
}

export default FormError;