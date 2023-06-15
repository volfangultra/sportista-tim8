import React, { useState } from 'react';
import {connect} from "react-redux";
import {reset_password} from "./Auth";
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import {Navigate} from "react-router-dom";
import TopNavbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import TextField from "@material-ui/core/TextField";


function ResetPassword({reset_password}) {
    const [email, setEmail] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const handleEmailChange = (event)=>{
        setEmail(event.target.value);
    }

    const resetPassword = () => {
        reset_password(email)
        setRequestSent(true)
    }

    if(requestSent)
        return (
            <Navigate to="/"/>
        )

    return (
        <div>
            <TopNavbar/>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} className={"mt-5"}>
                <TextField
                    className="custom-input  w-50 "
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    variant="outlined"
                />
                <Button variant="outlined" onClick={resetPassword} className="nextButton">
                    Next
                </Button>
            </div>
            <Footer />
        </div>
    );
}

export default connect(null, {reset_password})(ResetPassword);
