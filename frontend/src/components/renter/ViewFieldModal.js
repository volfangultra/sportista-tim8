import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { SERVER_URL } from "../../auth/Consts";

const ViewFieldModal = ({ field }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [sport, setSport] = useState('');

    useEffect(() => {
        const sports = {
            1: "Basketball",
            2: "Airsoft",
            3: "Paintball",
            4: "Tennis",
            5: "Ice skating",
            6: "Football",
            7: "Volleyball",
            8: "Boxing",
            9: "Handball",
            10: "Table tennis",
            11: "Hockey"
        };
        setSport(sports[field.fields.is_sport]);
    }, [field]);

    return (
        <>
            <Button className="custom-button" onClick={openModal}>
                VIEW
            </Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <h5 style={{marginBottom: '2rem'}}>FIELD INFO</h5>
                    <div>
                        <p>Name: {field.fields.name}</p>
                        <p>Sport: {sport}</p>
                        <p>Location: {field.fields.address}</p>
                        <p>Description: {field.fields.details}</p>
                        <p>Start: {field.fields.starts}</p>
                        <p>End: {field.fields.ends}</p>
                        <p>Price: {field.fields.price}</p>
                    </div>
                    <Button className="mt-3 custom-button" onClick={closeModal}>
                        CLOSE
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ViewFieldModal;
