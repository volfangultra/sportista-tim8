import React from 'react';
import "./Renter.css";

//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import {connect} from "react-redux";
import TableNext10Bookings from "../../components/renter/TableNext10Bookings";
function Dashboard({isAuthenticated, user}) {

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <RenterSidebar />
            <div className="page-margin">
                <h1>Dashboard</h1>
                <h5>Table of your 10 next bookings.</h5>
                <TableNext10Bookings user={user}/>
            </div>

        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Dashboard);