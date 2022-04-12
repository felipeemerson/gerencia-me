import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useDeleteType } from '../../api/types';

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import {
    Tr,
    Td,
    Text,
    Box,
    IconButton,
    useDisclosure
} from '@chakra-ui/react';

import TypeModal from './type-modal.component';

const TypeTr = ({ type }) => {
    const auth = useAuth();
    const { mutate } = useDeleteType();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = () => {
        mutate({ accessToken: auth.accessToken, typeId: type._id });
    }

    return (
        <Tr>
            <Td>
                <Text>{type.name}</Text>
            </Td>
            <Td>
                <Box bg={type.color} padding='5px 0px' />
            </Td>
            <Td isNumeric>
                <IconButton
                    colorScheme='blue'
                    aria-label='Edit type'
                    variant='ghost'
                    icon={<AiOutlineEdit />}
                    onClick={onOpen}
                />
                <IconButton
                    colorScheme='blue'
                    aria-label='Edit type'
                    variant='ghost'
                    icon={<AiOutlineDelete />}
                    onClick={handleDelete}
                />
                <TypeModal isOpen={isOpen} onClose={onClose} type={type} isEditing />
            </Td>
        </Tr>
    );
}

export default TypeTr;