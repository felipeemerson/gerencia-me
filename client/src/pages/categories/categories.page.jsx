import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useGetAllCategories } from '../../api/categories';

import {
    Container,
    Flex,
    Heading,
    useDisclosure,
    Divider
} from '@chakra-ui/react';

import CategoriesTable from './categories-table.component';
import CategoryModal from './category-modal.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import AddButton from '../../components/add-button/add-button.component';
import NoItems from '../../components/no-items/no-items.component';
import PageError from '../../components/page-error/page-error.component';

const CategoriesPage = () => {
    const auth = useAuth();
    const { isLoading, error, data: categories, isError } = useGetAllCategories(auth.accessToken);
    const hasCategories = categories?.length > 0;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCreateCategory = () => {
        onOpen();
    }

    return (
        <Container maxW='container.xl'>
            <Flex align='center' pb="5px">
                <Heading as='h1' size='md'>Minhas Categorias</Heading>
                {
                    hasCategories ? <AddButton size='sm' ml='10px' onClick={handleCreateCategory} text="Nova categoria" /> : null
                }
            </Flex>
            <Divider />

            {
                isLoading ? <LoadingSpinner />
                :
                    isError ? <PageError error={error} />
                    : (
                        <>
                        {
                            hasCategories ? <CategoriesTable categories={categories} /> : (
                                <NoItems text="Nenhuma categoria adicionada ainda!" buttonText="Nova categoria" onButtonClick={handleCreateCategory} />
                            )
                        }
                        </>
                    )
            }
            
            <CategoryModal isOpen={isOpen} onClose={onClose} />
        </Container>
    );
}

export default CategoriesPage;