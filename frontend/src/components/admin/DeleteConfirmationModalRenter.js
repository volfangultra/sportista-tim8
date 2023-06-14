import {SERVER_URL} from "../../auth/Consts";
import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const DeleteConfirmationModalRenter = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteRenter = (renter_id) => {
        axios.delete(`http://127.0.0.1:8000/admin/renters/deleteRenter/${renter_id}/`)
            .then((response) => {
                console.log('Renter deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const callFuns = () => {
        closeModal();
        console.log("Obrisat cu rentera sa IDem: ")
        console.log(props.renter_id)
        deleteRenter(props.renter_id);
        setTimeout(props.getR, 330)
    };

    return (
        <>
            <Button className="custom-button m-2" onClick={openModal}>DELETE</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <h5>Are you sure you want to delete the renter?</h5>
                    <Button className="mt-3 custom-button" onClick={() => callFuns()}>DELETE</Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModalRenter;