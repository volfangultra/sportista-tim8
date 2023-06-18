import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import UsersTable from "../../components/admin/UsersTable";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

function Users({isAuthenticated, user}) {
    setTimeout(protect, 120);

    function protect()
    {
        if (!isAuthenticated && user == null)
            return (<Navigate to={"/"}/>)
    }
    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <AdminSidebar />
            <div className="page-margin">
                <h1>Users</h1>
                <h5>Table of registered users.</h5>
                <UsersTable />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user: state.auth.user});


export default connect(mapStateToProps,null)(Users);


