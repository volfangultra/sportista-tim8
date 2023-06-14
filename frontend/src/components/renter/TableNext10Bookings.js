import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";

function TableNext10Bookings({ isAuthenticated,user }) {

    return (
        <div className="mt-5 box_shadow">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Field</TableCell>
                            <TableCell>Booked by</TableCell>
                            <TableCell>Phone number</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Test</TableCell>
                                <TableCell>Test</TableCell>
                                <TableCell>Test</TableCell>
                                <TableCell>Test</TableCell>
                                <TableCell>Test</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2">DECLINE</Button>
                                        <Button className="custom-button m-2">APPROVE</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableNext10Bookings;

