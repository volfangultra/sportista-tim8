import React, { useState } from 'react';
import { connect } from "react-redux";
import { reset_password_confirm } from "./Auth";
import { Navigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";

//components
import TopNavbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

function ResetPasswordConfirm({match, reset_password_confirm}) {
    const [password, setPassword] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const {uid,token} = useParams()
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }

    const resetPasswordConfirm = () => {
        reset_password_confirm(uid,token,password)
        setRequestSent(true)
    }

    if(requestSent)
        return (
            <Navigate to={"/login"}/>
        )

    return (
        <div>
            <TopNavbar />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <TextField
                    className="mt-5 mb-3 w-25"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    variant="outlined"
                />
                <Button className="custom-button mt-3" onClick={resetPasswordConfirm}>
                Next
            </Button>
            </div>
            <Footer />
        </div>
    );
}

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
