import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from "@mui/material";

const DeleteConfirmationModalMessage = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteMessage = () => {
        axios.delete(`http://127.0.0.1:8000/admin/inbox/delete/${props.msg_pk}/`)
            .then((response) => {
                console.log('Message deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting message:', error);
            });
    };

    const callFuns = () => {
        closeModal();
        console.log("Obrisat cu poruku sa PK: ")
        console.log(props.msg_pk)
        deleteMessage(props.msg_pk);
        setTimeout(props.getM, 330)
    };

    return (
        <>
            <Button className="custom-button m-2" onClick={openModal}>
                DELETE
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <h5>Are you sure you want to delete the message?</h5>
                    <Button className="custom-button m-2" onClick={() => callFuns()}>
                        DELETE
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModalMessage;