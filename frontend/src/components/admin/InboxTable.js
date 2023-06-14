import React from 'react';
import "../../pages/admin/Admin.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

function InboxTable() {
    return (
        <div className="mt-5 box_shadow">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>Acc Type</TableCell>
                            <TableCell>Email address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>NEDO</TableCell>
                            <TableCell>Renter</TableCell>
                            <TableCell>nedim_csgo@hotmail.com</TableCell>
                            <TableCell>Sarajevo</TableCell>
                            <TableCell>38761143021</TableCell>
                            <TableCell>
                                <div>
                                    <Button className="custom-button m-2">DELETE</Button>
                                    <Button className="custom-button m-2">READ</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InboxTable;
