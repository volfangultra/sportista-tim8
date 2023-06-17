import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';

//components
import EditFieldForm from "./EditFieldForm";

const EditFieldModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button className="custom-button" onClick={openModal}>
                EDIT
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <EditFieldForm field_id={props.field_id} closeModal={closeModal} getf={props.getf}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditFieldModal;
