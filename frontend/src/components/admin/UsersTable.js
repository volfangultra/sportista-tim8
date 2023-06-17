import React, {useEffect, useState} from "react";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import { Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from "@mui/material";

//components
import DeleteConfirmationModalUser from "./DeleteConfirmationModalUser";

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedUser(null);
        setWarningMessage("");
    };


    const sendWarningMessage = () => {

        const emailData = {
            sender_email: 'foul.official2305@outlook.com', // Naša adresa e-pošte
            recipient_email: selectedUser.email,
            message: warningMessage,
        };

        axios
            .post('http://127.0.0.1:8000/admin/users/send-email/', emailData)
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
        getUsers();
    }, []);

    function getUsers() {
        axios.get(`http://127.0.0.1:8000/admin/users/getUsers/`)
            .then((response) => {
                setUsers(response.data);

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
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Email address</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.gender ? 'male' : 'female'}</TableCell>
                                <TableCell>{user.city}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2" onClick={() => openModal(user)}>WARNING</Button>
                                        <Modal show={isOpen} onHide={closeModal}>
                                        <Modal.Header closeButton></Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group controlId="message">
                                                    <h5 className="mb-3 mt-2">Send warning message to this user.</h5>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        value={warningMessage}
                                                        onChange={(e) => setWarningMessage(e.target.value)}
                                                    />
                                                </Form.Group>
                                            <div className="d-flex justify-content-center mt-3">
                                                <Button className="custom-button m-2" onClick={closeModal}>
                                                    CANCEL
                                                </Button>
                                                <Button className="custom-button m-2" onClick={() => sendWarningMessage()} >
                                                    SEND
                                                </Button>
                                            </div>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>
                                        <DeleteConfirmationModalUser user_id={user.id} getU={getUsers}/>
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

export default UsersTable;
