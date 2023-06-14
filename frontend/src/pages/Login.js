import React from 'react';

//components
import Navbar from "../components/navigation/Navbar";
import LoginForm from "../components/login/LoginForm";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import Footer from "../components/navigation/Footer";

function Login({ isAuthenticated, user }) {

    if(isAuthenticated && user != null)
        if(user.is_renter)
            return (<Navigate to={"/renter"}/>)
        else if(user.is_user)
            return (<Navigate to={"/user"}/>)

    return (
        <div className="background-grayish" style={{ height: "100vh", width: "100%" }}>
            <Navbar />
            <div className="d-flex justify-content-center">
                <LoginForm/>
                <Footer />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user: state.auth.user});


export default connect(mapStateToProps,null)(Login);