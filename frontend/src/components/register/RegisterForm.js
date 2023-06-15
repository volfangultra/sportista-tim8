import React, { useState } from 'react';
import UserRegisterForm from './UserRegisterForm';
import RenterRegisterForm from './RenterRegisterForm';
import "./RegisterForm.css";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Paper, Grid } from '@material-ui/core';

function RegisterForm() {

    const [registrationType, setRegistrationType] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const handleRegistrationTypeChange = (event) => {
        setRegistrationType(event.target.value);
        setCurrentStep(2);
    };

    const renderCurrentStepForm = () => {
        if (currentStep === 1) {
            return (
                <FormControl component="fieldset">
                    <Typography variant="h5" align="center" gutterBottom>
                        Choose account type to register!
                    </Typography>
                    <RadioGroup
                        className="radio-group d-flex justify-content-evenly"
                        value={registrationType}
                        onChange={handleRegistrationTypeChange}
                        row
                    >
                        <FormControlLabel
                            className="registerType"
                            value="renter"
                            control={<Radio />}
                            label={<Typography variant="subtitle1">Renter</Typography>}
                        />
                        <FormControlLabel
                            className="registerType"
                            value="user"
                            control={<Radio />}
                            label={<Typography variant="subtitle1">User</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
            );
        } else if (currentStep === 2) {
            if (registrationType === 'user') {
                return <UserRegisterForm />;
            } else if (registrationType === 'renter') {
                return <RenterRegisterForm />;
            }
        }
        return null;
    };

    return (
        <div className="register-page">
            <Paper className="registerForm box_shadow" style={{ minWidth: '30rem' }}>
                <Grid container justifyContent="center">
                    {renderCurrentStepForm()}
                </Grid>
            </Paper>
        </div>
    );
}

export default RegisterForm;
