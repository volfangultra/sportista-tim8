import React from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import UserAccountOverview from "../../components/user/UserAccountOverview";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";

function UserAccount({ user, isAuthenticated }) {

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
                <h1>Account</h1>
                <h5>Edit you account information here.</h5>
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
		        <UserAccountOverview user={user}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(UserAccount);