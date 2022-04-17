import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { VStack, Heading, Divider } from '@chakra-ui/react';

import TaskCard from './task-card.component';

const TasksList = ({ tasks, types, status }) => {

    return (
        <>
            <Droppable droppableId={status}>
            {
                provided => (
                    <VStack
                        minH='xs'
                        minW='xs'
                        borderWidth='1px'
                        borderRadius='lg'
                        p='3'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Heading as='h2' size='md'>
                        {
                            status === 'todo' ? 'A fazer' : status === 'doing' ? 'Fazendo' : 'Feito'
                        }
                        </Heading>
                        <Divider />
                        {
                            Boolean(types) ? tasks.map((task, index) => (
                                <TaskCard key={task._id} task={task} index={index} type={types.find(type => type._id === task.typeId)} />
                            )) : null
                        }
                        { provided.placeholder }
                    </VStack>
                )
            }
            </Droppable>
        </>
    );
}

export default TasksList;