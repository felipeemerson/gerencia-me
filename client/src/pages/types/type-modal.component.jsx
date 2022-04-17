import React, { useRef } from 'react';

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
    const initialRef = useRef();

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{isEditing ? "Editar tipo": "Criar tipo" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TypeForm handleClose={onClose} type={type} initialFocusRef={initialRef} />
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TypeModal;