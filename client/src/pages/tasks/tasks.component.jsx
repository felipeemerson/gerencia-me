import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useDeleteTask, useGetAllTasks, useUpdateTask } from '../../api/tasks';
import { useGetAllTypesFromUser } from '../../api/types';

import { AiOutlinePlus } from 'react-icons/ai';

import { DragDropContext } from 'react-beautiful-dnd';

import {
    Heading,
    Container,
    VStack,
    HStack,
    Button,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';

import TaskModal from './task-modal.component';
import TasksColumn from './tasks-column.component';

const TasksPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const auth = useAuth();

    const getAllTasksQuery = useGetAllTasks(auth.accessToken);
    const getAllTypesQuery = useGetAllTypesFromUser(auth.accessToken);
    const updateTaskMutation = useUpdateTask();
    //const deleteTaskMutation = useDeleteTask();

    const tasks = getAllTasksQuery.data;
    const types = getAllTypesQuery.data;
    const isLoading = getAllTasksQuery.isLoading && getAllTypesQuery.isLoading;

    const handleCreateTask = () => {
        onOpen();
    }

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
        <Container maxW='container.xl'>
            <Heading>Minhas tarefas</Heading>
            {
                isLoading ? (
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                ) : (
                    <DragDropContext
                        onDragEnd={handleDragEnd}
                    >

                        <VStack mb='15px'>
                            <HStack justifyContent='space-evenly'>
                                <TasksColumn
                                    tasks={tasks.filter(task => task.status === 'todo')}
                                    types={types}
                                    status='todo'
                                />

                                <TasksColumn
                                    tasks={tasks.filter(task => task.status === 'doing')}
                                    types={types}
                                    status='doing'
                                />

                                <TasksColumn
                                    tasks={tasks.filter(task => task.status === 'done')}
                                    types={types}
                                    status='done'
                                />
                            </HStack>
                        </VStack>
                    </DragDropContext>
                )
            }
            <Button rightIcon={<AiOutlinePlus/>} colorScheme='blue' color='white' variant='solid' onClick={handleCreateTask}>Nova tarefa</Button>
            <TaskModal isOpen={isOpen} onClose={onClose} />
        </Container>
    );
}

export default TasksPage;