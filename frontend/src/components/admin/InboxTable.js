import React, {useEffect, useState} from 'react';
import "../../pages/admin/Admin.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from "axios";

//components
import DeleteConfirmationModalMessage from "./DeleteConfirmationModalMessage";
import ReadMessageModal from "./ReadMessageModal";

function InboxTable() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, []);


     function getMessages() {
         axios.get(`http://127.0.0.1:8000/admin/inbox/getMessages/`)
            .then((response) => {
                 setMessages(response.data);
                 console.log("evo response.data", response.data)
                 console.log("evo messages", messages)

            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }

    return (
        <div className="mt-5 box_shadow">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>From</TableCell>

                            <TableCell>Subject</TableCell>
                            <TableCell>Text</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.map((message, index) => (
                            <TableRow key={message.pk}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{message.fields.first_name} {message.fields.last_name}</TableCell>
                                <TableCell>{message.fields.subject}</TableCell>
                                <TableCell>{message.fields.text}</TableCell>

                                <TableCell>
                                    <div>
                                        <DeleteConfirmationModalMessage msg_pk={message.pk} getM={getMessages}/>
                                        <ReadMessageModal pk={message.pk} text={message.fields.text} f_name={message.fields.first_name} s_name={message.fields.last_name} getM={getMessages}/>
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

export default InboxTable;
