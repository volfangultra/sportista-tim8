import React from 'react';
import "./Admin.css";

//components
import AdminSidebar from "../../components/navigation/AdminSidebar";
import DashboardCharts from "../../components/admin/DashboardCharts";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

function Dashboard({user, isAuthenticated}) {


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
                <h1>Dashboard</h1>
                <h5>Welcome to admin dashboard.</h5>
                <DashboardCharts />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Dashboard);
