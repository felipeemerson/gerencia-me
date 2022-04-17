import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useDeleteTask } from '../../api/tasks';
import { getSuccessfulToastObject, getErrorToastObject } from '../../utils/toast';

import { Draggable } from 'react-beautiful-dnd';

import { AiOutlineEllipsis } from 'react-icons/ai';

import {
    Flex,
    Text,
    Badge,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import TaskModal from './task-modal.component';

const TaskCard = ({ task, type, index }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const hasType = Boolean(type);
    const auth = useAuth();
    const deleteTaskMutation = useDeleteTask();
    const toast = useToast();

    const handleSuccess = () => {
        toast(getSuccessfulToastObject('Tarefa deletada com sucesso'));
    };

    const handleError = () => {
        toast(getErrorToastObject(deleteTaskMutation.error));
    }

    const handleDelete = () => {
        deleteTaskMutation.mutate({ accessToken: auth.accessToken, taskId: task._id }, { onSuccess: handleSuccess, onError: handleError });
    }
    
    return (
        <>
            <Draggable draggableId={task._id} index={index}>
            {
                provided => (
                    <Flex
                        w='xs'
                        minH='75px'
                        borderWidth='1px'
                        borderRadius='lg'
                        p='0.5em'
                        direction='column'
                        bg={hasType ? type.color : 'gray.400'}
                        borderColor='blackAlpha.400'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        
                        <Flex direction='row' justify='space-between'>
                            <Text textShadow="rgba(255, 255, 255, 0.7) 1px 1px 1px 1px" textColor={hasType ? type.color.split('.')[0] + '.800' : 'black'}>{task.title}</Text>
                            <Menu>
                                <MenuButton size='sm' variant='ghost' as={IconButton} icon={<AiOutlineEllipsis />} />
                                <MenuList minW='15px'>
                                    <MenuItem onClick={onOpen}>Editar</MenuItem>
                                    <MenuItem color='red.500' onClick={handleDelete}>Apagar</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                        {
                            hasType ? (
                                <Flex direction='row' alignSelf='end' mt='auto'>
                                    <Badge
                                        variant='subtle'
                                        colorScheme={type.color.split('.')[0]}    
                                    >   
                                        {type.name}
                                    </Badge>
                                </Flex>
                            ) : null
                        }
                        <TaskModal isOpen={isOpen} onClose={onClose} task={task} isEditing={isOpen} />
                    </Flex>
                )
            }
            </Draggable>
        </>
    );
}

export default TaskCard;