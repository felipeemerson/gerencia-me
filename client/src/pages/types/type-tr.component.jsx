import React from 'react';

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import {
    Tr,
    Td,
    Text,
    Box,
    IconButton
} from '@chakra-ui/react';


const TypeTr = ({ type }) => {
    return (
        <Tr>
            <Td>
                <Text>{type.name}</Text>
            </Td>
            <Td>
                <Box bg={type.color + '.500'} padding='5px 0px' />
            </Td>
            <Td isNumeric>
                <IconButton
                    colorScheme='blue'
                    aria-label='Edit type'
                    variant='ghost'
                    icon={<AiOutlineEdit />}
                />
                <IconButton
                    colorScheme='blue'
                    aria-label='Edit type'
                    variant='ghost'
                    icon={<AiOutlineDelete />}
                />
            </Td>
        </Tr>
    );
}

export default TypeTr;