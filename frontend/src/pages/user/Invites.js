import React, {useEffect, useState} from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import InvitesTable from "../../components/user/InvitesTable";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import TeamInvitesTable from "../../components/user/TeamInvitesTable";
import AcceptedInvitesTable from "../../components/user/AcceptedInvitesTable";

function Invites({ user, isAuthenticated }) {
    const [invites, setInvites] = useState([])
    const [playInvites, setPlayInvites] = useState([])


    useEffect(()=>{
        if(user){
            axios.get(`${SERVER_URL}/user/get_invites/${user.id}/`).then((response)=>{
                setInvites(response.data)
            })
            axios.get(`${SERVER_URL}/user/get_play_invites/${user.id}/`).then((response)=>{
                setPlayInvites(response.data)
            })
        }
    }, [user])
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
                <h1>Invites</h1>
                <h5>List of invites from other users.</h5>
                <InvitesTable invites={playInvites} user={user}/>
                <h1 className={"mt-5"}>Team Invites</h1>
                <h5>List of invites from other users.</h5>
                <TeamInvitesTable invites={invites} user={user}/>
                <h1 className={"mt-5"}>Accepted Invites</h1>
                <h5>List of invites from other users.</h5>
                <AcceptedInvitesTable invites={playInvites} user={user}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Invites);