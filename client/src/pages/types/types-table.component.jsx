import React from 'react';

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr
} from '@chakra-ui/react';

import TypeTr from './type-tr.component';

const TypesTable = ({ types }) => {

    return (
        <>
            <TableContainer m='5' mr='auto' ml='auto' maxW='xl'>
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
                            [...types].map(type => <TypeTr type={type} key={type._id} />)
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TypesTable;