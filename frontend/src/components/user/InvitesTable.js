import React from 'react';
import { TableContainer, Paper, Table, Button, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import moment from "moment";
import {SERVER_URL} from "../../auth/Consts";
import axios from "axios";
function InvitesTable(props) {
    console.log("Ov")
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
                            <div>
                                {!item.accepted && (
                                <TableRow key={item.pk}>
                                    <TableCell>1</TableCell>
                                    <TableCell>{item.sender_name}</TableCell>
                                    <TableCell>{item.field_name}</TableCell>
                                    <TableCell>{item.sport}</TableCell>
                                    <TableCell>{moment(item.start, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}</TableCell>
                                    <TableCell>{moment(item.start, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</TableCell>
                                    <TableCell>
                                        <div>
                                            <Button className="custom-button m-2" onClick={()=>{axios.post(`${SERVER_URL}/user/delete_invite/${item.id}/`)}}>REJECT</Button>
                                            <Button className="custom-button m-2" onClick={()=>{axios.post(`${SERVER_URL}/user/enter_team_play/${props.user.id}/${item.id}/${item.id_sender}/`).then(()=>{window.location.reload(false)})}}>ACCEPT</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>)
                                }
                            </div>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InvitesTable;

