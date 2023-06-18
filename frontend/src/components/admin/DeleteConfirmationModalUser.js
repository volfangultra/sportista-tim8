import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';

const DeleteConfirmationModalUser = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteUser = (user_id) => {
        axios.delete(`http://127.0.0.1:8000/admin/users/deleteUser/${user_id}/`)
            .then((response) => {
                console.log('User deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const callFuns = () => {
        closeModal();
        console.log("Obrisat cu usera sa IDem: ")
        console.log(props.user_id)
        deleteUser(props.user_id);
        setTimeout(props.getU, 330)
    };

    return (
        <>
            <Button className="custom-button m-2" onClick={openModal}>
                DELETE
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <h5>Are you sure you want to delete the user?</h5>
                    <Button className="custom-button m-2" onClick={() => callFuns()}>
                        DELETE
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModalUser;