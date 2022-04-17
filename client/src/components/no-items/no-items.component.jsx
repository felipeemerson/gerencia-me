import React from 'react';

import {
    Alert,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react';

import AddButton from '../add-button/add-button.component';

const NoItems = ({ buttonText, text, onButtonClick }) => {

    return (
        <Alert
            status='warning'
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
                {text}
            </AlertTitle>
            <AddButton size='xs' w='200px' onClick={onButtonClick} text={buttonText} alignSelf='center' />
        </Alert>
    );
}

export default NoItems;