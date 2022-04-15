import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from '@chakra-ui/react';

import TaskForm from './task-form.component';

const TaskModal = ({ isOpen, onClose, task }) => {
    const isEditing = Boolean(task);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{isEditing ? "Editar tarefa": "Criar tarefa" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TaskForm handleClose={onClose} task={task} />
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TaskModal;