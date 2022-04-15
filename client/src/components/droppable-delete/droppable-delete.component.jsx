import React from 'react';
import { useTheme } from '@chakra-ui/react';

import { Droppable } from 'react-beautiful-dnd';

import { AiOutlineDelete } from 'react-icons/ai';

import { Flex, Heading } from '@chakra-ui/react';

const DroppableDelete = () => {
    const theme = useTheme();

    return (
        <>
            <Droppable droppableId='delete' direction='horizontal'>
            {
                provided => (
                    <Flex
                        w='lg'
                        h='200px'
                        borderWidth='1px'
                        borderRadius='lg'
                        justify='center'
                        alignItems='center'
                        direction='row'
                        bg='red.200'
                        borderColor='blackAlpha.400'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <AiOutlineDelete fontSize='24px' style={{color: theme.__cssVars['--chakra-colors-red-700'], marginBottom: '5px' }} />
                        <Heading as='span' size='md' color='red.700'>Apagar</Heading>
                        {provided.placeholder}
                    </Flex>
                )
            }
            </Droppable>
        </>
    );
}

export default DroppableDelete;