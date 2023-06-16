import React, {useEffect, useState} from 'react';
import "../../pages/admin/Admin.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import axios from "axios";
import DeleteConfirmationModalUser from "./DeleteConfirmationModalUser";
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
