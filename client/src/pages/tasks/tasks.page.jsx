import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useGetAllTasks } from '../../api/tasks';
import { useGetAllCategories } from '../../api/categories';

import {
    Heading,
    Container,
    Flex,
    Divider,
    useDisclosure
} from '@chakra-ui/react';

import TasksLists from './tasks-lists.component';
import TaskModal from './task-modal.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import AddButton from '../../components/add-button/add-button.component';
import NoItems from '../../components/no-items/no-items.component';
import PageError from '../../components/page-error/page-error.component';

const TasksPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const auth = useAuth();

    const getAllTasksQuery = useGetAllTasks(auth.accessToken);
    const getAllCategoriesQuery = useGetAllCategories(auth.accessToken);

    const tasks = getAllTasksQuery.data;
    const categories = getAllCategoriesQuery.data;
    const isLoading = getAllTasksQuery.isLoading || getAllCategoriesQuery.isLoading;
    const isError = getAllCategoriesQuery.isError || getAllTasksQuery.isError;
    const error = getAllCategoriesQuery.isError ? getAllCategoriesQuery.error : getAllTasksQuery.isError;
    const hasTasks = tasks?.length > 0;

    const handleCreateTask = () => {
        onOpen();
    }

    return (
        <Container maxW='container.xl'>
            <Flex align='center' pb="5px">
                <Heading as='h1' size='md'>Minhas tarefas</Heading>
                {
                    hasTasks ? <AddButton text="Nova tarefa" size='sm' ml='10px' onClick={handleCreateTask} /> : null
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
                            hasTasks ? <TasksLists tasks={tasks} categories={categories} /> : (
                                <NoItems text="Nenhuma tarefa adicionada ainda!" buttonText="Nova tarefa" onButtonClick={handleCreateTask} />
                            )
                        }
                        </>
                    )
            }

            <TaskModal isOpen={isOpen} onClose={onClose} />

        </Container>
    );
}

export default TasksPage;