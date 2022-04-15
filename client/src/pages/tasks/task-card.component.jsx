import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useDeleteTask } from '../../api/tasks';

import { Draggable } from 'react-beautiful-dnd';

import { AiOutlineEllipsis } from 'react-icons/ai';

import {
    Flex,
    Heading,
    Badge,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure
} from '@chakra-ui/react';

import TaskModal from './task-modal.component';

const TaskCard = ({ task, type, index }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const hasType = Boolean(type);
    const auth = useAuth();
    const deleteTaskMutation = useDeleteTask();

    const handleDelete = () => {
        deleteTaskMutation.mutate({ accessToken: auth.accessToken, taskId: task._id });
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
                            <Heading as='h4' size='md'>{task.title}</Heading>
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