import React, {useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";

const CancelBookingFieldModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=>{

    }, [])
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
            <Button className="custom-button" onClick={openModal}>CANCEL</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <h5>Are you sure you want to cancel this reservation?</h5>
                    <Button className="custom-button mt-3" onClick={()=>{axios.post(`${SERVER_URL}/renter/cancel_booking/${props.id}/`).then(()=>{closeModal(); window.location.reload(false);})}}>
                        CANCEL
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CancelBookingFieldModal;
