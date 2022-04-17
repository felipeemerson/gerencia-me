import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useUpdateTask } from '../../api/tasks';

import { DragDropContext } from 'react-beautiful-dnd';

import {
    VStack,
    Stack,
    useMediaQuery
} from '@chakra-ui/react';

import TasksList from './tasks-list.component';

const TasksLists = ({ tasks, types, onCreateTask }) => {
    const auth = useAuth();
    const updateTaskMutation = useUpdateTask();
    const [ isLargeThan1280 ] = useMediaQuery('(min-width: 1280px)');

    const handleDragEnd = result => {
        const { draggableId, source, destination } = result;
        const task = tasks.find(task => task._id === draggableId);

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId
            //&& destination.index === source.index  // use this if need to save the order too
        ) return;

        if ( destination.droppableId === 'delete') {
            //deleteTaskMutation.mutate({ accessToken: auth.accessToken, taskId: task._id });
            return;
        }
        
        updateTaskMutation.mutate({ accessToken: auth.accessToken, task: {
            _id: task._id,
            title: task.title,
            status: destination.droppableId,
            userId: task.userId,
            typeId: task.typeId
        }});
    }

    return (
        <>
            <DragDropContext
                onDragEnd={handleDragEnd}
            >

                <VStack mt='30' mb='15px'>
                    <Stack direction={isLargeThan1280 ? 'row' : 'column'} justifyContent='space-evenly'>
                        <TasksList
                            tasks={tasks.filter(task => task.status === 'todo')}
                            types={types}
                            status='todo'
                        />

                        <TasksList
                            tasks={tasks.filter(task => task.status === 'doing')}
                            types={types}
                            status='doing'
                        />

                        <TasksList
                            tasks={tasks.filter(task => task.status === 'done')}
                            types={types}
                            status='done'
                        />
                    </Stack>
                </VStack>
            </DragDropContext>
        </>
    );
}

export default TasksLists;