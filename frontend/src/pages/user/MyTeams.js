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


    useEffect(()=>{console.log("Prosloooo")
        getTeam();
    }, [user])

    async function getTeam(){
        if(user){
            console.log("Prosloooo213123213213")
            await axios.get(`${SERVER_URL}/user/get_team/${user.id}/`).then((response)=>{
                setTeam(response.data)
            })
        }
    }

    setTimeout(protect, 120);

    function protect()
    {
        if (!isAuthenticated && user == null)
            return (<Navigate to={"/"}/>)
    }


    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>My team</h1>
                <h5>You can create team here.</h5>
                {
                    <MyTeamsComp user={user} team={team} getTeam={getTeam} />

                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(MyTeams);