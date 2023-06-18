import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import InboxTable from "../../components/admin/InboxTable";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

function Inbox({user, isAuthenticated}) {
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
                <h1>Inbox</h1>
                <h5>All messages recieved from users and renters.</h5>
                <InboxTable />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Inbox);
