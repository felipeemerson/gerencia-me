import React from 'react';

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
    useDisclosure
} from '@chakra-ui/react';

import TypeTr from './type-tr.component';
import TypeModal from './type-modal.component';

const TypesPage = () => {
    const types = [
        {
            name: 'Tipo um',
            color: 'blue',
            id: 1
        },
        {
            name: 'Tipo dois',
            color: 'green',
            id: 2
        },
        {
            name: 'Tipo três',
            color: 'cyan',
            id: 3
        }
    ]
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCreateType = () => {
        onOpen();
    }

    return (
        <Container>
            <Heading>Meus Tipos</Heading>
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
                            types.map(type => <TypeTr type={type} key={type.id} />)
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Button rightIcon={<AiOutlinePlus/>} colorScheme='blue' color='white' variant='solid' onClick={handleCreateType}>Novo tipo</Button>
            <TypeModal isOpen={isOpen} onClose={onClose} />
        </Container>
    );
}

export default TypesPage;