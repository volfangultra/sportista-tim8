import React from 'react';
import { useState } from 'react';
import {TextField, Button, MenuItem, Grid, Typography} from '@mui/material';
import "../../pages/user/User.css";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";

function MyTeamsComp(props) {

    const [friendEmail, setFriendEmail] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);

    const handleFriendEmailChange = (event) => {
        setFriendEmail(event.target.value);
    };


    const handleInviteFriend = () => {
        if (friendEmail && props.user) {
            axios.post(`${SERVER_URL}/user/send_invite/${props.user.id}/`, {email:friendEmail}).then((response)=>{

            })
        }
    }
    console.log("HEL")
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
            ...teamMembers.map((member) => member.username),
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

    return (
        <div>
            <div className="my-teams-comp-container mt-5">
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

                {teamMembers.length > 0 && (
                    <div>
                        <h4>Team Members:</h4>
                        <ul>
                            {teamMembers.map((member, index) => (
                                <li key={index}>
                                    <span>{member.username}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
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
        </div>
    );
}

export default MyTeamsComp;
