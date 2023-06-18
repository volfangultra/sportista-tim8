import React from 'react';
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

function TeamInvitesTable(props) {
    console.log(props.invites)
    return (
        <div className="mt-5 box_shadow">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Invited by</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {  props.invites.map((item)=>(
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.sender_name}</TableCell>
                                <TableCell>
                                    <div>
                                        <Button className="custom-button m-2" onClick={()=>{}}>REJECT</Button>
                                        <Button className="custom-button m-2" onClick={()=>{axios.post(`${SERVER_URL}/user/enter_team/${props.user.id}/${item.id}/${item.id_sender}/`).then(()=>{window.location.reload(false)})}}>ACCEPT</Button>
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

export default TeamInvitesTable;

