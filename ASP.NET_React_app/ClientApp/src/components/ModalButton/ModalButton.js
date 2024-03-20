import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import style from './ModalButton.module.css'

const ModalButton = ({ modalContent, title, btnName }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    return (
        <div>
            <Button onClick={handleOpenModal}>
                {btnName}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={style.modalWindow}>{modalContent}</Modal.Body>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal>
        </div>
    );
};

export default ModalButton;