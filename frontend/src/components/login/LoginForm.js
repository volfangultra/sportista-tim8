import React, { useState } from 'react';
import "./LoginForm.css";
import { connect } from "react-redux";
import { login } from "../../auth/Auth";
import { toast, ToastContainer } from "react-toastify";
import { TextField, Button } from "@mui/material";
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginForm({ login }) {
    const [isRightPanelActive, setRightPanelActive] = useState(true);
    const [renterEmail, setRenterEmail] = useState('');
    const [renterPassword, setRenterPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showRenterPassword, setShowRenterPassword] = useState(false);
    const [showUserPassword, setShowUserPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleUserButtonClick = () => {
        setRightPanelActive(true);
    };

    const handleRenterButtonClick = () => {
        setRightPanelActive(false);
    };

    const handleRenterEmail = (event) => {
        setRenterEmail(event.target.value);
    }

    const handleRenterPassword = (event) => {
        setRenterPassword(event.target.value);
    }

    const handleUserEmail = (event) => {
        setUserEmail(event.target.value)
    }

    const handleUserPassword = (event) => {
        setUserPassword(event.target.value)
    }

    const toggleRenterPasswordVisibility = () => {
        setShowRenterPassword(!showRenterPassword);
    }

    const toggleUserPasswordVisibility = () => {
        setShowUserPassword(!showUserPassword);
    }

    const handleError = (errorMessage) => {
        setError(errorMessage)
    }

    const loginRenter = (event) => {
        event.preventDefault()
        login(renterEmail, renterPassword, false, false, true, handleError).then(() => {
            displayAlert()
        })
    }
    const loginUser = (event) => {
        event.preventDefault()
        login(userEmail, userPassword, false, true, false, handleError).then(() => {
            displayAlert()
        })
    }

    const displayAlert = () => {
        if (error && Object.keys(error).length > 0) {
            if (error.email != null) {
                toast.error(error.email, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else if (error.password != null) {
                toast.error(error.password, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else if(error.detail != null){
                toast.error(error.detail, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }else {
                toast.error('Error with login', {
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
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            loginUser(event); // Pozovi funkciju za prijavu korisnika
        }
    };
    const handleKeyPresss = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            loginRenter(event); // Pozovi funkciju za prijavu korisnika
        }
    };

    return (
        <div className="login-form-page">
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
            <div className={isRightPanelActive ? 'dowebok right-panel-active' : 'dowebok'} id="dowebok">
                <div className="form-container sign-up-container">
                    <form action="#" onKeyPress={handleKeyPress}>
                        <h3 className="loginh1">USER LOGIN</h3>
                        <TextField
                            type="email"
                            label="Email address"
                            onChange={handleUserEmail}
                            variant="outlined"
                            className="custom-input mt-3"
                            required
                        />
                        <TextField
                            type={showUserPassword ? "text" : "password"}
                            label="Password"
                            onChange={handleUserPassword}
                            variant="outlined"
                            className="custom-input mt-3"
                            required
                            InputProps={{
                                endAdornment: (
                                    <div style={{ cursor: "pointer" }} onClick={toggleUserPasswordVisibility}>
                                        {showUserPassword ? <FiEyeOff /> : <FiEye />}
                                    </div>
                                ),
                            }}
                        />
                        <a href="http://localhost:3000/reset_password" className="forgot_password">Forgot password?</a>
                        <Button className="mt-2 custom-button" onClick={loginUser} variant="outlined" color="primary">
                            LOGIN
                        </Button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#" onKeyPress={handleKeyPresss}>
                        <h3 className="loginh1">RENTER LOGIN</h3>
                        <TextField
                            type="email"
                            label="Email address"
                            onChange={handleRenterEmail}
                            variant="outlined"
                            className="custom-input mt-3"
                            required
                        />
                        <TextField
                            type={showRenterPassword ? "text" : "password"}
                            label="Password"
                            onChange={handleRenterPassword}
                            variant="outlined"
                            className="custom-input mt-3"
                            required
                            InputProps={{
                                endAdornment: (
                                    <div style={{ cursor: "pointer" }} onClick={toggleRenterPasswordVisibility}>
                                        {showRenterPassword ? <FiEyeOff /> : <FiEye />}
                                    </div>
                                ),
                            }}
                        />
                        <a href="http://localhost:3000/reset_password" className="forgot_password">Forgot password?</a>
                        <Button className="mt-2 custom-button" onClick={loginRenter} variant="outlined" color="primary">
                            LOGIN
                        </Button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="loginh1">Are you a renter?</h1>
                            <p className="loginp">Click here to login as renter.</p>
                            <Button id="signUser" className="custom-button2" onClick={handleRenterButtonClick} variant="outlined" color="primary">
                                Login
                            </Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="loginh1">Are you a user?</h1>
                            <p className="loginp">Click here to login as user.</p>
                            <Button id="signRenter" className="custom-button2" onClick={handleUserButtonClick} variant="contained" color="primary">
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { login })(LoginForm);
