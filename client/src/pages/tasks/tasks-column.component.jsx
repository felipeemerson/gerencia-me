import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { VStack, Heading } from '@chakra-ui/react';

import TaskCard from './task-card.component';

const TasksColumn = ({ tasks, types, status }) => {

    return (
        <>
            <Droppable droppableId={status}>
            {
                provided => (
                    <VStack minH='xs' minW='xs' ref={provided.innerRef} {...provided.droppableProps}>
                        <Heading as='h2' size='lg'>
                        {
                            status === 'todo' ? 'A fazer' : status === 'doing' ? 'Fazendo' : 'Feito'
                        }
                        </Heading>
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

export default TasksColumn;