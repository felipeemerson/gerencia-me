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

const TypeModal = ({ isOpen, onClose }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Criar novo tipo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TypeForm handleClose={onClose} />
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TypeModal;