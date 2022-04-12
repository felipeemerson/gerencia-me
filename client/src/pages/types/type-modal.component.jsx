import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from '@chakra-ui/react';

import TypeForm from './type-form.component';

const TypeModal = ({ isOpen, onClose, type }) => {
    const isEditing = Boolean(type);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{isEditing ? "Editar tipo": "Criar tipo" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TypeForm handleClose={onClose} type={type} />
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TypeModal;