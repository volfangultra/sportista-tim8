import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import "../../pages/user/User.css";
import Button from '@material-ui/core/Button';

const ShuffleTeams = () => {
    const [playerNames, setPlayerNames] = useState('');
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);

    const handlePlayerNamesChange = (event) => {
        setPlayerNames(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const playerNamesArray = playerNames.split(',').map((name) => name.trim());
        const shuffledPlayers = shuffleArray(playerNamesArray);
        const halfLength = Math.ceil(shuffledPlayers.length / 2);
        const teamAPlayers = shuffledPlayers.slice(0, halfLength);
        const teamBPlayers = shuffledPlayers.slice(halfLength);

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
        <div className="shuffle-box mt-5">
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField
                            sx={{
                                width: "30rem"
                            }}
                            label="Enter player names (seperated by comma)"
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
            <Grid className="mt-5" container spacing={2}>
                <div className="d-flex justify-content-center w-100">
                    <Grid item xs={6}>
                        <Typography variant="h5" component="h3">Team A:</Typography>
                        {teamA.length > 0 ? (
                            <ul>
                                {teamA.map((player, index) => (
                                    <li key={index}>{player}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>•</Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" component="h3">Team B:</Typography>
                        {teamB.length > 0 ? (
                            <ul>
                                {teamB.map((player, index) => (
                                    <li key={index}>{player}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>•</Typography>
                        )}
                    </Grid>
                </div>
            </Grid>
        </div>
    );
};

export default ShuffleTeams;
