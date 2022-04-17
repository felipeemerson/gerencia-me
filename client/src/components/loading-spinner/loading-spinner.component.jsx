import React from 'react';

import { Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {

    return (
        <Spinner
            thickness='4px'
            speed='1s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            top='30vh'
            margin='0 auto'
            position='relative'
            display='block'
        />
    );
}

export default LoadingSpinner;