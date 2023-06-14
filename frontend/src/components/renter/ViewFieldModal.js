import {SERVER_URL} from "../../auth/Consts";
import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const DeleteConfirmationModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button className="custom-button" onClick={openModal}>
                VIEW
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <h5>FIELD INFO</h5>
                    <Button className="mt-3 custom-button">
                        CLOSE
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModal;
