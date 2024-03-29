import React from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import ContactForm from "../../components/contact/ContactForm";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";

function Contact({ user, isAuthenticated }) {

    setTimeout(protect, 120);

    function protect()
    {
        if (!isAuthenticated && user == null)
            return (<Navigate to={"/"}/>)
    }

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>Contact</h1>
                <h5>Contact support team for any questions.</h5>
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
                <ContactForm />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Contact);