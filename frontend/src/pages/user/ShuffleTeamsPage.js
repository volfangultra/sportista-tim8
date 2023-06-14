import React from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import ShuffleTeams from "../../components/user/ShuffleTeams";

function ShuffleTeamsPage({ user, isAuthenticated }) {

    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>Shuffle teams</h1>
                <h5>You can create random teams here.</h5>
                <ShuffleTeams />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(ShuffleTeamsPage);