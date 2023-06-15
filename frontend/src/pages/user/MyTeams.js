import React from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import MyTeamsComp from "../../components/user/MyTeams";

function MyTeams({ user, isAuthenticated }) {

    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>My teams</h1>
                <h5>You can create teams here.</h5>
                <MyTeamsComp />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(MyTeams);