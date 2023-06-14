import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import "./RegisterForm.css";
import {register} from "../../auth/Auth";
import {connect} from "react-redux";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import {toast, ToastContainer} from "react-toastify";
import {Checkbox, MenuItem, TextField} from "@mui/material";
import {FormControlLabel} from "@material-ui/core";
import {FiEye, FiEyeOff} from "react-icons/fi";

function UserRegisterForm({register}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userDateOfBirth, setUserDateOfBirth] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [userAvailability, setUserAvailability] = useState({});
    const [playsSports, setplaysSports] = useState([]);
    const [gotData, setGotData] = useState(false);
    const [chosenSports, setChosenSprots] = useState([]);
    const [showUserPassword, setShowUserPassword] = useState(false);

    if(!gotData)
        axios.get( `${SERVER_URL}/daj_sportove`).then((res) => {
            setplaysSports(res.data)
            setGotData(true)
        })

    const handleUserFirstNameChange = (event) => {
        const inputText = event.target.value;
        setUserFirstName(inputText.charAt(0).toUpperCase() + inputText.slice(1));
    };

    const handleUserLastNameChange = (event) => {
        const inputText = event.target.value;
        setUserLastName(inputText.charAt(0).toUpperCase() + inputText.slice(1));
    };

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    const handleUserGenderChange = (event) => {
        setUserGender(event.target.value);
    }

    const handleUserDateOfBirthChange = (event) => {
        setUserDateOfBirth(event.target.value);
    }

    const handleNextStep = () => {
        if (currentStep === 1 && !userFirstName) {
            toast.error('Please enter your first name.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 1 && !userLastName) {
            toast.error('Please enter your last name.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 1 && !userEmail) {
            toast.error('Please enter your email address.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 1 && !userPassword) {
            toast.error('Please enter your password.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 1 && (!/\d/.test(userPassword) || userPassword.length < 8)) {
            toast.error('Please enter a password with at least 8 characters and containing numbers.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 2 && !userGender) {
            toast.error('Please enter your gender.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 2 && !userDateOfBirth) {
            toast.error('Please enter your date of birth.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 3 && chosenSports.length === 0) {
            toast.error('Please select at least one sport.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (currentStep === 4 && Object.keys(userAvailability).length === 0) {
            toast.error('Please select at least one range of hours.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setCurrentStep(currentStep+1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };


    const handleTermsAcceptance = (event) => {
        setTermsAccepted(event.target.checked);
    };

    useEffect(() => {
        if (userEmail && !isValidEmail(userEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    }, [userEmail]);

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    };

    const handleUserAvailabilityChange = (day, startHour, endHour) => {
        const updatedAvailability = { ...userAvailability };

        if (!updatedAvailability[day]) {
            updatedAvailability[day] = {};
        }

        updatedAvailability[day] = {
            startHour,
            endHour
        };

        setUserAvailability(updatedAvailability);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        if (!termsAccepted) {
            toast.error('Please agree to the terms and conditions and privacy policy if you want to proceed.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        const DATA = {
            first_name: userFirstName,
            last_name: userLastName,
            gender: userGender,
            date_of_birth: userDateOfBirth,
            sports: chosenSports,
            user_availability: userAvailability,
            city: "Sarajevo"
        }
        register(userEmail, userPassword, false, true, false, DATA).then(() => {
            setFormSubmitted(true)
        })
    };

    const handleSportChange = (event) => {
        if (event.target.checked)
            chosenSports.push(event.target.value)
        else{
            const index = chosenSports.indexOf(event.target.value);
            if (index > -1)
                chosenSports.splice(index, 1);

        }
    }

    const handleLoginButtonClick = () => {
        window.location.href = '/login';
    };

    const toggleUserPasswordVisibility = () => {
        setShowUserPassword(!showUserPassword);
    }

    const renderCurrentStepForm = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="steps">
                            <div className="step active"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                        </div>
                        <div className="text-center">
                            <h5 className="mt-5 mb-5">Personal info</h5>
                            <TextField
                                sx={{ minWidth: "18rem" }}
                                className="custom-input"
                                type="text"
                                id="firstName"
                                label="First name"
                                variant="outlined"
                                value={userFirstName}
                                onChange={handleUserFirstNameChange}
                                required
                            />
                        </div>

                        <div>
                            <TextField
                                className="custom-input mt-2"
                                type="text"
                                id="lastName"
                                label="Last name"
                                variant="outlined"
                                value={userLastName}
                                onChange={handleUserLastNameChange}
                                required
                            />
                        </div>

                        <div>
                            <TextField
                                className="custom-input mt-2"
                                type="email"
                                id="email"
                                label="E-mail"
                                variant="outlined"
                                value={userEmail}
                                onChange={handleUserEmailChange}
                                required
                            />
                            {emailError && <div className="error">{emailError}</div>}
                        </div>

                        <div>
                            <TextField
                                className="custom-input mt-2"
                                type={showUserPassword ? "text" : "password"}
                                id="password"
                                label="Password"
                                variant="outlined"
                                value={userPassword}
                                onChange={handleUserPasswordChange}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <div style={{ cursor: "pointer" }} onClick={toggleUserPasswordVisibility}>
                                            {showUserPassword ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                    ),
                                }}
                            />
                        </div>

                        <Button onClick={handleNextStep} className="nextButton custom-button">
                            Next
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="steps">
                            <div className="step completed"></div>
                            <div className="step active"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                        </div>
                        <div className="text-center">
                            <h5 className="mt-5 mb-5">More personal info</h5>

                            <div>
                                <TextField
                                    className="custom-input"
                                    type="text"
                                    id="city"
                                    label="City"
                                    variant="outlined"
                                    required
                                />
                            </div>
                            <TextField
                                select
                                className="custom-input mt-2"
                                label="Select gender"
                                value={userGender}
                                onChange={handleUserGenderChange}
                                required
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>
                        </div>

                        <div className="form-group">
                            <TextField
                                className="custom-input  mt-2"
                                type="date"
                                label="Date of Birth"
                                variant="outlined"
                                value={userDateOfBirth}
                                onChange={handleUserDateOfBirthChange}
                                required
                            />
                        </div>

                        <div>
                            <Button onClick={handlePrevStep} className="previousButton custom-button">
                                Previous
                            </Button>
                            <Button onClick={handleNextStep} className="nextButton custom-button">
                                Next
                            </Button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="steps">
                            <div className="step completed"></div>
                            <div className="step completed"></div>
                            <div className="step active"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                        </div>
                        <div className="text-center">
                            <h5 className="mt-5 mb-5">Which sports are you interested in?</h5>
                            <div className="sports-container">
                                {playsSports.map((sport) => (
                                    <div key={sport.pk} className="sport-item">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id={sport.pk}
                                                    value={sport.pk}
                                                    onChange={handleSportChange}
                                                />
                                            }
                                            label={sport.fields.name}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <Button className="custom-button previousButton" onClick={handlePrevStep}>
                                    Previous
                                </Button>
                                <Button className="custom-button nextButton" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </>
                );
            case 4:
                const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                return (
                    <>
                        <div className="steps">
                            <div className="step completed"></div>
                            <div className="step completed"></div>
                            <div className="step completed"></div>
                            <div className="step active"></div>
                            <div className="step"></div>
                        </div>
                        <div className="text-center">
                            <h5 className="mt-5 mb-5">When are you available?</h5>
                            <div>
                                {daysOfWeek.map((day) => (
                                    <div key={day} className="d-flex align-items-center">
                                        <div className="d-flex align-items-center col-2 m-2">
                                            <label>{day}</label>
                                        </div>
                                        <div className="col">
                                            <div className="mb-1">
                                                <TextField
                                                    type="time"
                                                    className="custom-time-input"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        handleUserAvailabilityChange(day, e.target.value, userAvailability[day]?.endHour)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-1">
                                                <TextField
                                                    type="time"
                                                    className="custom-time-input"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        handleUserAvailabilityChange(day, userAvailability[day]?.startHour, e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <Button className="custom-button previousButton" onClick={handlePrevStep}>
                                    Previous
                                </Button>
                                <Button className="custom-button nextButton" onClick={handleNextStep}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </>
                );
            case 5:
                if (formSubmitted) {
                    return (
                        <>
                            <div className="text-center">
                                <h3 className="mb-5">Welcome to Sportista Field Rental!</h3>
                                <h4>Thank you for registering! Please check your email to activate your account.</h4>
                                <h4>After that, you can proceed to login.</h4>
                            </div>
                            <div className="float-end mb-3">
                                <Button onClick={handleLoginButtonClick} className="custom-button nextButton">
                                    Login
                                </Button>
                            </div>
                        </>
                    );
                } else {
                    return (
                        <>
                            <div className="scrollable-container">
                                <div className="steps">
                                    <div className="step completed"></div>
                                    <div className="step completed"></div>
                                    <div className="step completed"></div>
                                    <div className="step completed"></div>
                                    <div className="step active"></div>
                                </div>
                                <div className="mb-3">
                                    <h5 className="mt-5 mb-5">Terms and Conditions</h5>
                                    <div>
                                        <p>Welcome to Sportista Field Rental!</p>
                                        <p>
                                            By using our platform, you agree to comply with the following terms and conditions:
                                        </p>
                                        <p>
                                            1. Use of the Platform
                                            - You are responsible for maintaining the confidentiality of your account.
                                            - You agree not to use the platform for any illegal or unauthorized purposes.
                                        </p>
                                        <p>
                                            2. Field Rental
                                            - The platform facilitates the rental of sports fields.
                                            - The availability and booking process may vary and are subject to specific terms outlined on the platform.
                                            - Any disputes or issues regarding field rental are the responsibility of the field renter and user.
                                        </p>
                                        <p>
                                            3. Liability
                                            - We are not responsible for any accidents, injuries, or damages that may occur during field rental.
                                            - Users and renters are advised to establish their own agreements regarding liability and responsibilities.
                                        </p>
                                        <p>
                                            4. Privacy
                                            - We collect and store user data in accordance with our privacy policy.
                                            - We implement security measures to protect user information, but we cannot guarantee complete security.
                                        </p>
                                        <p>
                                            5. Disclaimer
                                            - The platform is provided "as is" and we do not make any warranties or representations.
                                            - We are not responsible for the accuracy or availability of the platform's content.
                                        </p>
                                        <p>
                                            By using our platform, you agree to these terms and conditions.
                                            If you do not agree, please refrain from using the platform.
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <FormControlLabel
                                        control={<Checkbox className="mt-4 mb-4" required onChange={handleTermsAcceptance} />}
                                        label="I agree to the terms and conditions and privacy policy"
                                    />
                                </div>
                                <div className="mb-3">
                                    <Button className="custom-button nextButton" type="button" onClick={handleSubmit}>
                                        Register
                                    </Button>
                                </div>
                            </div>
                        </>
                    );
                }
            default:
                return null;
        }
    };

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit} >
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
            {renderCurrentStepForm()}
        </div>
    );
}

export default connect(null, {register})(UserRegisterForm);