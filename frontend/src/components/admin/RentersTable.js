import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from "@mui/material";
import {Form, Modal} from "react-bootstrap";

// components
import DeleteConfirmationModalRenter from "./DeleteConfirmationModalRenter";


function RentersTable() {

    const [renters, setRenters] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [selectedRenter, setSelectedRenter] = useState(null);

    const openModal = (user) => {
        setIsOpen(true);
        setSelectedRenter(user);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRenter(null);
        setWarningMessage("");
    };

    const sendWarningMessage = () => {

        const emailData = {
            sender_email: 'foul.official2305@outlook.com', // Naša adresa e-pošte
            recipient_email: selectedRenter.email,
            message: warningMessage,
        };

        axios
            .post('http://127.0.0.1:8000/admin/renters/send-email/', emailData)
            .then((response) => {
                console.log('Warning email sent successfully');
                closeModal();

            })
            .catch((error) => {
                console.error('Warning email sending failed:', error);
            });

        setIsOpen(false);

    };

    useEffect(() => {
        getRenters();
    }, []);

    function getRenters() {
        axios.get(`http://127.0.0.1:8000/admin/renters/getRenters/`)
            .then((response) => {
                setRenters(response.data);
            })
            .catch((error) => {
                console.error('Error fetching fields:', error);
            });
    }
    return (
        <div className="mt-5 box_shadow">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renters.map((renter, index) => (
                            <TableRow key={renter.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{renter.name}</TableCell>
                                <TableCell>{renter.email}</TableCell>
                                <TableCell>{renter.city}</TableCell>
                                <TableCell>{renter.phone}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2" onClick={() => openModal(renter)}>WARNING</Button>
                                        <Modal show={isOpen} onHide={closeModal}>
                                            <Modal.Header closeButton></Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group controlId="message">
                                                        <h5 className="mb-3 mt-2">Send warning message to this renter.</h5>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={4}
                                                            value={warningMessage}
                                                            onChange={(e) => setWarningMessage(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <div className="d-flex justify-content-center mt-3">
                                                        <Button className="custom-button m-2" onClick={closeModal}>
                                                            Cancel
                                                        </Button>
                                                        <Button className="custom-button m-2" onClick={() => sendWarningMessage()} >
                                                            SEND
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                        <DeleteConfirmationModalRenter renter_id={renter.id} getR={getRenters} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RentersTable;