import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useDeleteTasksFromStatus } from '../../api/tasks';
import { getSuccessfulToastObject, getErrorToastObject } from '../../utils/toast';

import { AiOutlineClear } from 'react-icons/ai';

import { Droppable } from 'react-beautiful-dnd';

import {
    VStack,
    Flex,
    Heading,
    Divider,
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import TaskCard from './task-card.component';

const TasksList = ({ tasks, types, status }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const auth = useAuth();
    const toast = useToast();
    const deleteTasksFromStatusMutation = useDeleteTasksFromStatus();

    const handleSuccess = () => {
        toast(getSuccessfulToastObject('Tarefas deletadas com sucesso'));
    }

    const handleError = () => {
        toast(getErrorToastObject(deleteTasksFromStatusMutation.error));
    }

    const handleDeleteTasksFromStatus = () => {
        deleteTasksFromStatusMutation.mutate({ accessToken: auth.accessToken, status }, { onSuccess: handleSuccess, onError: handleError });
        onClose();
    }

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
                        <Flex align='center' justify='space-between' w='100%'>
                            <Heading as='h2' size='md'>
                            {
                                status === 'todo' ? 'A fazer' : status === 'doing' ? 'Em progresso' : 'Concluídas'
                            }
                            </Heading>
                            <IconButton float='right' variant='ghost' icon={<AiOutlineClear />} onClick={onOpen} isDisabled={ !tasks.length > 0 } />
                        </Flex>
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
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tem certeza desta ação?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Todas as tarefas {status === 'todo' ? 'a fazer' : status === 'doing' ? 'em progresso' : 'concluídas'} serão removidas.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleDeleteTasksFromStatus}>
                        Confirmar
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TasksList;