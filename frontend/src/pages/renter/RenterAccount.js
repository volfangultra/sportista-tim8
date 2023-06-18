import React from 'react';

//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import RenterAccountOverview from "../../components/renter/RenterAccountOverview";
import {ToastContainer} from "react-toastify";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

function RenterAccount({user,isAuthenticated}) {
    setTimeout(protect, 120);

    function protect()
    {
        if (!isAuthenticated && user == null)
            return (<Navigate to={"/"}/>)
    }
    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <RenterSidebar />
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
                <RenterAccountOverview user={user}/>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user: state.auth.user});


export default connect(mapStateToProps,null)(RenterAccount);