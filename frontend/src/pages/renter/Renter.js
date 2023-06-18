import React from 'react';
import "./Renter.css";

//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import {connect} from "react-redux";
import TableNext10Bookings from "../../components/renter/TableNext10Bookings";
import {Navigate} from "react-router-dom";
function Dashboard({isAuthenticated, user}) {
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
                <h1>Dashboard</h1>
                <h5>Table of your recent bookings.</h5>
                <TableNext10Bookings user={user}/>
            </div>

        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Dashboard);