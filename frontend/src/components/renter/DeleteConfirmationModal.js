import { SERVER_URL } from "../../auth/Consts";
import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import {toast} from "react-toastify";

const DeleteConfirmationModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteField = (field_id) => {
        console.log(field_id);
        axios
            .delete(`${SERVER_URL}/renter/delete/${field_id}/`)
            .then((response) => {
                console.log('Field deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const callFuns = () => {
        closeModal();
        deleteField(props.field_id);
        setTimeout(props.getf, 330)
        toast.success('Field deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
            <Button className="custom-button" onClick={openModal}>
                DELETE
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <h5>Are you sure you want to delete the field?</h5>
                    <Button className="mt-3 custom-button" onClick={() => callFuns()}>
                        DELETE
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModal;
