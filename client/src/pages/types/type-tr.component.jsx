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
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import TypeModal from './type-modal.component';

const TypeTr = ({ type }) => {
    const auth = useAuth();
    const { mutate, error } = useDeleteType();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleSuccess = () => {
        toast({
            title: 'Tipo deletado com sucesso',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleError = () => {
        toast({
            title: error.response.data,
            status: 'error',
            duration: 2000,
            isClosable: true,
        });
    }

    const handleDelete = () => {
        mutate({ accessToken: auth.accessToken, typeId: type._id }, { onSuccess: handleSuccess, onError: handleError });
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