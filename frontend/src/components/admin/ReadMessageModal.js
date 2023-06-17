import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';

const ReadMessageModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    function archiveMessage() {
        axios.post(`http://127.0.0.1:8000/admin/inbox/archive/${props.pk}/`)
            .then((response) => {
                console.log('Message archived successfully');
            })
            .catch((error) => {
                console.error('Error archived message:', error);
            });
    }

    const callFuns = () => {
        closeModal();
        archiveMessage();
        setTimeout(props.getM, 330)
    };

    return (
        <>
            <Button className="custom-button m-2" onClick={openModal}>
                READ
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    {props.f_name} {props.s_name}
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5>{props.text}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="custom-button m-2" onClick={() => callFuns()}>
                        ARCHIVE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ReadMessageModal;