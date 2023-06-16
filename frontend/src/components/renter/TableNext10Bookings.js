import React, {useEffect, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";

function TableNext10Bookings(props) {
    const [bookings, setBookings] = useState([])
    useEffect(()=>{
        console.log("HELLO", props.user)
        if(props.user != null)
            axios.get(`${SERVER_URL}/renter/get_bookings/${props.user.id}/`)
                .then((response) => {
                    console.log(response.data)
                    setBookings(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching fields:', error);
                });
    },[props.user])

    console.log(bookings)
    return (
        <div className="mt-5 box_shadow">
            {bookings.map((booking) => (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Field</TableCell>
                                <TableCell>Booked by</TableCell>
                                <TableCell>email</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>{booking.field}</TableCell>
                                <TableCell>{booking.booked_by}</TableCell>
                                <TableCell>{booking.email}</TableCell>
                                <TableCell>{booking.start.split(" ")[0]}</TableCell>
                                <TableCell>{booking.start.split(" ")[1] + " - " + booking.end.split(" ")[1]}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2" onClick={() => {axios.post(`${SERVER_URL}/renter/cancel_booking/${booking["id"]}/`).then(()=>{setBookings([])})}}>DENY</Button>
                                        <Button className="custom-button m-2" onClick={() => {axios.post(`${SERVER_URL}/renter/approve_booking/${booking["id"]}/`).then(()=>{setBookings([])})}}>APPROVE</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}

        </div>
    );
}

export default TableNext10Bookings;

