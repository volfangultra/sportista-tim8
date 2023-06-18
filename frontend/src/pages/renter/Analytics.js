import React from 'react';

//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import AnalyticCharts from "../../components/renter/AnalyticCharts";

function Analytics({isAuthenticated,user}) {

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
                <h1>Analytics</h1>
                <h5>Statistics and graphs for your profile and fields.</h5>
                <AnalyticCharts renter_id={user.id}/>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Analytics);

