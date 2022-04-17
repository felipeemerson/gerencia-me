import React from 'react';

import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@chakra-ui/react';

const AddButton = ({ onClick, text, ...props }) => {

    return (
        <Button
            rightIcon={<AiOutlinePlus/>}
            colorScheme='blue'
            color='white'
            variant='solid'
            onClick={onClick}
            { ...props }
        >
            { text }
        </Button>
    );
}

export default AddButton;