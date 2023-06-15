import React, { useState } from 'react';
import { connect } from "react-redux";
import { reset_password } from "./Auth";
import Button from '@material-ui/core/Button';
import { Navigate } from "react-router-dom";
import TopNavbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword({ reset_password }) {
    const [email, setEmail] = useState('');
    const [requestSent, setRequestSent] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const resetPassword = () => {
        if (email) {
            reset_password(email);
            setRequestSent(true);
        } else {
            toast.error("Please enter your email.", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    if (requestSent)
        return (
            <Navigate to="/" />
        )

    return (
        <div>
            <TopNavbar />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <TextField
                    className="mt-5 mb-3 w-25"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    variant="outlined"
                />
                <Button className="custom-button mt-3" onClick={resetPassword}>
                    Next
                </Button>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default connect(null, { reset_password })(ResetPassword);
