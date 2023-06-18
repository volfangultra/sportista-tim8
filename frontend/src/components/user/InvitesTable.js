import React from 'react';
import { TableContainer, Paper, Table, Button, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function InvitesTable({ isAuthenticated, user }) {

function InvitesTable(props) {
    console.log("OVO")
    console.log(props.invites)
    return (
        <div className="mt-5 box_shadow">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Invited by</TableCell>
                            <TableCell>Field</TableCell>
                            <TableCell>Sport</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {  props.invites.map((item)=>(
                            <TableRow key={item.pk}>
                                <TableCell>1</TableCell>
                                <TableCell>alic.said@user.sportista.com</TableCell>
                                <TableCell>Garden City Konjic</TableCell>
                                <TableCell>Football</TableCell>
                                <TableCell>23-02-2023</TableCell>
                                <TableCell>17:00h - 20:00h</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2">REJECT</Button>
                                        <Button className="custom-button m-2">ACCEPT</Button>
                                    </div>
                                </TableCell>
                            </TableRow>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InvitesTable;

