import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import { Button, TableBody, TableCell,TableRow, TableHead, Table, Paper, TableContainer } from "@mui/material";
import moment from "moment";

function TableNext10Bookings(props) {
    const [bookings, setBookings] = useState([])

    useEffect(()=>{
        getBookings()
    },[props.user])

    function getBookings(){
        if(props.user != null)
            axios.get(`${SERVER_URL}/renter/get_bookings/${props.user.id}/`)
                .then((response) => {
                    console.log(response.data)
                    setBookings(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching fields:', error);
                });
    }

    return (
        <>
            {bookings.length === 0 ? (
                <h2 style={{marginTop: "5rem"}}>You don't have recent bookings.</h2>
            ) : (
                    <div className="mt-5 box_shadow">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Field</TableCell>
                                <TableCell>Booked by</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking, index) => (
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{booking.field}</TableCell>
                                <TableCell>{booking.booked_by}</TableCell>
                                <TableCell>{booking.email}</TableCell>
                                <TableCell>{moment(booking.start).format('YYYY-MM-DD')}</TableCell>
                                <TableCell>{moment(booking.start).format('HH:mm')} - {moment(booking.end).format('HH:mm')}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2" onClick={() => {axios.post(`${SERVER_URL}/renter/cancel_booking/${booking["id"]}/`).then(()=>{getBookings()})}}>Reject</Button>
                                        <Button className="custom-button m-2" onClick={() => {axios.post(`${SERVER_URL}/renter/approve_booking/${booking["id"]}/`).then(()=>{getBookings()})}}>Approve</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    </div>
                )}
        </>
    );
}

export default TableNext10Bookings;

