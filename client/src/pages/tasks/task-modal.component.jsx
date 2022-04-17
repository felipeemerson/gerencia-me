import React, { useRef } from 'react';

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
    const initialRef = useRef();

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{isEditing ? "Editar tarefa": "Criar tarefa" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TaskForm handleClose={onClose} task={task}  initialFocusRef={initialRef} />
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TaskModal;