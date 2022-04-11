import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useGetAllTypesFromUser } from '../../api/types';

import { AiOutlinePlus } from 'react-icons/ai';

import {
    Container,
    Heading,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Button,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner
} from '@chakra-ui/react';

import TypeTr from './type-tr.component';
import TypeModal from './type-modal.component';

const TypesPage = () => {
    const auth = useAuth();
    const { isLoading, error, data, isError } = useGetAllTypesFromUser(auth.accessToken);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCreateType = () => {
        onOpen();
    }

    return (
        <Container>
            <Heading>Meus Tipos</Heading>
            {
                isError ? (
                    <>
                        <Alert
                            status='error'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='200px'
                            >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                {error.response.data}
                            </AlertTitle>
                            <AlertDescription maxWidth='sm'>
                                Tente novamente!
                            </AlertDescription>
                        </Alert>
                    </>
                ) : 
                    isLoading ? (
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    ) : (
                        <>
                            <TableContainer  m='5'>
                                <Table variant='simple' colorScheme='blue'>
                                    <Thead>
                                        <Tr>
                                            <Th>Nome</Th>
                                            <Th>Cor</Th>
                                            <Th isNumeric>Ações</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data.map(type => <TypeTr type={type} key={type._id} />)
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Button rightIcon={<AiOutlinePlus/>} colorScheme='blue' color='white' variant='solid' onClick={handleCreateType}>Novo tipo</Button>
                            <TypeModal isOpen={isOpen} onClose={onClose} />
                        </>
                    )
            }

        </Container>
    );
}

export default TypesPage;