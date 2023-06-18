import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import moment from "moment";

const ViewFieldModal = ({ field }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const formattedStart = formatTime(field.fields.starts);
    const formattedEnd = formatTime(field.fields.ends);

    function formatTime(time) {
        if (time.includes('-')) {
            // Format: YYYY-MM-DD HH:mm:ss
            return moment(time, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
        } else {
            // Format: HH:mm:ss
            return moment(time, "HH:mm:ss").format("HH:mm");
        }
    }

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
                <Modal.Header closeButton>
                    <Modal.Title>FIELD DETAILS</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">

                    <div className="d-flex flex-column align-items-center">
                        <p><b>Name:</b> {field.fields.name}</p>
                        <p><b>Sport:</b> {sport}</p>
                        <p><b>Location:</b> {field.fields.address}</p>
                        <p className="text-center"><b>Description:</b> {field.fields.details}</p>
                        <p><b>Working hours:</b></p>
                        <div className="d-flex justify-content-between w-50">
                            <p><b>From:</b> {formattedStart}</p>
                            <p><b>To:</b> {formattedEnd}</p>
                        </div>
                        <p><b>Price per slot:</b> {field.fields.price} KM</p>
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
