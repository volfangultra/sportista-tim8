import React from 'react';
import { useState } from 'react';
import { TextField, Button, Rating, Grid, Typography} from '@mui/material';
import { FaStar, FaTimes } from "react-icons/fa";
import "../../pages/user/User.css";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import {toast, ToastContainer} from "react-toastify";
import { Modal } from "react-bootstrap";

function MyTeamsComp(props) {

    const [friendEmail, setFriendEmail] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleFriendEmailChange = (event) => {
        setFriendEmail(event.target.value);

    };


    const handleInviteFriend = () => {
        if (friendEmail && props.user) {
            axios.post(`${SERVER_URL}/user/send_invite/${props.user.id}/`, {email:friendEmail}).then((response)=>{
            })
            toast.success('Friend invited successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    console.log(props.team)

    const [playerNames, setPlayerNames] = useState('');
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);


    const handlePlayerNamesChange = (event) => {
        setPlayerNames(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const playerNamesArray = playerNames.split(",").map((name) => name.trim());
        const shuffledPlayers = shuffleArray([
            ...props.team.users.map((member) => member.first_name + " " + member.last_name),
            ...playerNamesArray,
        ]);

        const teamAPlayers = [];
        const teamBPlayers = [];

        const halfLength = shuffledPlayers.length / 2;

        for (let i = 0; i < shuffledPlayers.length; i++) {
            if (i < halfLength) {
                teamAPlayers.push(shuffledPlayers[i]);
            } else {
                teamBPlayers.push(shuffledPlayers[i]);
            }
        }

        setTeamA(teamAPlayers);
        setTeamB(teamBPlayers);
    };

    const handleClearInput = () => {
        setPlayerNames('');
        setTeamA([]);
        setTeamB([]);
    };

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const [ratings, setRatings] = useState({});

    const handleRate = (index, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [index]: rating
        }));
        handleClose();
    };

    const deleteMember = () => {
        //za brisanje membera u timu
    };

    console.log(props.team)

    return (
        <div className={"d-flex justify-content-between"}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="my-teams-comp-container mt-5 mr-3">
                    <h4>Team Members</h4>
                    <ul>
                        {props.team.users.map((member, index) => (
                            <li key={index}>
                                <Typography>
                                    <FaTimes onClick={()=>deleteMember(index)} style={{ cursor: "pointer", color: "red", marginRight: "5px" }} />
                                    {member.first_name + " " + member.last_name}
                                    <Button variant="text" onClick={handleOpen}>Rate</Button>
                                </Typography>
                                <Modal show={isOpen} onHide={handleClose} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Rate User</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className={"d-flex justify-content-center"}>
                                            <Rating
                                                value={rating}
                                                onChange={(event, newValue) => setRating(newValue)}
                                            />
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={()=> {handleRate(index); handleClose()}}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </li>
                        ))}
                    </ul>
                <div>
                    <TextField
                        className="teams-inputs mt-2"
                        label="Friend's Email"
                        type="email"
                        value={friendEmail}
                        onChange={handleFriendEmailChange}
                    />
                </div>
                <Button className="custom-button5 mt-5 mb-5" onClick={handleInviteFriend}>
                    SEND INVITE
                </Button>
            </div>
            <div className="my-teams-comp-container mt-5">
                    <h4>Shuffle your team</h4>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <TextField
                                    sx={{
                                        width: "25rem",
                                        marginTop: "2rem"
                                    }}
                                    label="Add more players (separated by comma)"
                                    value={playerNames}
                                    onChange={handlePlayerNamesChange}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid className="mt-3" container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button className="custom-button" type="submit">Shuffle</Button>
                            </Grid>
                            <Grid item>
                                <Button className="custom-button" onClick={handleClearInput}>Clear</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <div className="team-container">
                        <div>
                            <Typography variant="h5" component="h3" align="center">
                                Team A:
                            </Typography>
                            {teamA.length > 0 ? (
                                <ul>
                                    {teamA.map((player, index) => (
                                        player && <li key={index}>{player}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                        <div>
                            <Typography variant="h5" component="h3" align="center">
                                Team B:
                            </Typography>
                            {teamB.length > 0 ? (
                                <ul>
                                    {teamB.map((player, index) => (
                                        <li key={index}>{player}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default MyTeamsComp;
