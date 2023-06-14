import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';

const CancelBookingFieldModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button className="custom-button mt-2" onClick={openModal}>CANCEL</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <h5>Are you sure you want to cancel this reservation?</h5>
                    <Button className="custom-button mt-3" >
                        CANCEL
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CancelBookingFieldModal;
