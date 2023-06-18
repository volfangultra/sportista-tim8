import React, {useEffect, useState} from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import MyTeamsComp from "../../components/user/MyTeams";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";

function MyTeams({ user, isAuthenticated }) {
    const [team, setTeam] = useState({})
    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)

    useEffect(()=>{
        if(user){
            axios.get(`${SERVER_URL}/user/get_team/${user.id}/`).then((response)=>{
                setTeam(response.data)
            })
        }
    }, [user])

    console.log("OV")
    console.log(team)


    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>My teams</h1>
                <h5>You can create teams here.</h5>
                <MyTeamsComp user={user} team={team} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(MyTeams);