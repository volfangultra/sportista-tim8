import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import moment from "moment";

const FieldDetailsModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [sport, setSport] = useState('');

    const formattedStart = formatTime(props.starts);
    const formattedEnd = formatTime(props.ends);

    function formatTime(time) {
        if (time.includes('-')) {
            // Format: YYYY-MM-DD HH:mm:ss
            return moment(time, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
        } else {
            // Format: HH:mm:ss
            return moment(time, "HH:mm:ss").format("HH:mm");
        }
    }

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
        setSport(sports[props.is_sport]);
    }, [props.is_sport]);


    return (
        <>
            <Button className="custom-button" onClick={openModal}>Details</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <p>Name: {props.name}</p>
                    <p>Sport: {sport}</p>
                    <p>Location: {props.address}</p>
                    <p>Description: {props.details}</p>
                    <p>Start: {formattedStart}</p>
                    <p>End: {formattedEnd}</p>
                    <p>Price: {props.price}</p>
                    <Button className="mt-3 custom-button" onClick={closeModal}>
                        CLOSE
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FieldDetailsModal;
