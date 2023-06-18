import React, { useState } from 'react';
import "./LoginForm.css";
import { connect } from "react-redux";
import { login } from "../../auth/Auth";
import { TextField, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

function AdminLoginForm({ login }) {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [showAdminPassword, setShowAdminPassword] = useState(false)
    const [error, setError] = useState(null);

    const handleAdminEmail = (event) => {
        setAdminEmail(event.target.value);
    }

    const handleAdminPassword = (event) => {
        setAdminPassword(event.target.value);
    }

    const handleError = (errorMessage) => {
        setError(errorMessage)
    }

    const toggleAdminPasswordVisibility = () => {
        setShowAdminPassword(!setShowAdminPassword);
    }


    const loginAdmin = (event) => {
        event.preventDefault()
        login(adminEmail, adminPassword, true, false, false, handleError).then(() => {
            displayAlert()
        })
    }

    const displayAlert = () => {
        if (error) {
            if (error.email != null) {
                toast.error("Please enter your email", {
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
                toast.error("Please enter your password", {
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

    return (
        <div className="admin-login-form">
            <form>
                <h1 className="m-3">ADMIN LOGIN</h1>

                <TextField
                    label="Email address"
                    value={adminEmail}
                    onChange={handleAdminEmail}
                    variant="outlined"
                    className="custom-input mt-5"
                    required
                />

                <TextField
                    className="custom-input mt-3"
                    type={showAdminPassword ? "text" : "password"}
                    id="password"
                    label="Password"
                    value={adminPassword}
                    onChange={handleAdminPassword}
                    required
                    InputProps={{
                        endAdornment: (
                            <div style={{ cursor: "pointer" }} onClick={toggleAdminPasswordVisibility}>
                                {showAdminPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    className="mt-5 custom-button"
                    onClick={loginAdmin}
                    variant="outlined"
                >
                    LOGIN
                </Button>

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
            </form>
        </div>
    );
}

export default connect(null, {login})(AdminLoginForm);
