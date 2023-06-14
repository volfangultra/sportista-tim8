import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';

const FieldDetailsModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button className="custom-button mt-2" onClick={openModal}>Details</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <p>Address: {props.address}</p>
                    <p>Details: {props.details}</p>
                    <p>Price: {props.price}</p>
                    <p>Posto u bazi nemamo vise podataka o terenu, ovdje mozemo dodati jos kad je koji dostupan</p>
                    <Button className="custom-button mt-3">BOOK</Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FieldDetailsModal;
