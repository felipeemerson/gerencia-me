import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useGetAllTypesFromUser } from '../../api/types';

import {
    Container,
    Flex,
    Heading,
    useDisclosure,
    Divider
} from '@chakra-ui/react';

import TypesTable from './types-table.component';
import TypeModal from './type-modal.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import AddButton from '../../components/add-button/add-button.component';
import NoItems from '../../components/no-items/no-items.component';
import PageError from '../../components/page-error/page-error.component';

const TypesPage = () => {
    const auth = useAuth();
    const { isLoading, error, data: types, isError } = useGetAllTypesFromUser(auth.accessToken);
    const hasTypes = types?.length > 0;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCreateType = () => {
        onOpen();
    }

    return (
        <Container maxW='container.xl'>
            <Flex align='center' pb="5px">
                <Heading as='h1' size='md'>Meus Tipos</Heading>
                {
                    hasTypes ? <AddButton size='sm' ml='10px' onClick={handleCreateType} text="Novo tipo" /> : null
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
                            hasTypes ? <TypesTable types={types} /> : (
                                <NoItems text="Nenhum tipo adicionado ainda!" buttonText="Novo tipo" onButtonClick={handleCreateType} />
                            )
                        }
                        </>
                    )
            }
            
            <TypeModal isOpen={isOpen} onClose={onClose} />
        </Container>
    );
}

export default TypesPage;