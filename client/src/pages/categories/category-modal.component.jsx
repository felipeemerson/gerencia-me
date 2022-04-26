import React, { useRef } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from '@chakra-ui/react';

import CategoryForm from './category-form.component';

const CategoryModal = ({ isOpen, onClose, category }) => {
    const isEditing = Boolean(category);
    const initialRef = useRef();

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{isEditing ? "Editar categoria": "Criar categoria" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CategoryForm handleClose={onClose} category={category} initialFocusRef={initialRef} />
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CategoryModal;