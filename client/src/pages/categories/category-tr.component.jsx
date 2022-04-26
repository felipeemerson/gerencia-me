import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useDeleteCategory } from '../../api/categories';
import { getSuccessfulToastObject, getErrorToastObject } from '../../utils/toast';

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

import CategoryModal from './category-modal.component';

const CategoryTr = ({ category }) => {
    const auth = useAuth();
    const { mutate, error } = useDeleteCategory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleSuccess = () => {
        toast(getSuccessfulToastObject('Categoria removida com sucesso'));
    };

    const handleError = () => {
        toast(getErrorToastObject(error));
    }

    const handleDelete = () => {
        mutate({ accessToken: auth.accessToken, categoryId: category._id }, { onSuccess: handleSuccess, onError: handleError });
    }

    return (
        <Tr>
            <Td>
                <Text>{category.name}</Text>
            </Td>
            <Td>
                <Box bg={category.color} padding='5px 0px' />
            </Td>
            <Td isNumeric>
                <IconButton
                    colorScheme='blue'
                    aria-label='Edit category'
                    variant='ghost'
                    icon={<AiOutlineEdit />}
                    onClick={onOpen}
                />
                <IconButton
                    colorScheme='blue'
                    aria-label='Delete category'
                    variant='ghost'
                    icon={<AiOutlineDelete />}
                    onClick={handleDelete}
                />
                <CategoryModal isOpen={isOpen} onClose={onClose} category={category} isEditing />
            </Td>
        </Tr>
    );
}

export default CategoryTr;