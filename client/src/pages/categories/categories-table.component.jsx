import React from 'react';

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr
} from '@chakra-ui/react';

import CategoryTr from './category-tr.component';

const CategoriesTable = ({ categories }) => {

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
                            categories.map(category => <CategoryTr category={category} key={category._id} />)
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CategoriesTable;