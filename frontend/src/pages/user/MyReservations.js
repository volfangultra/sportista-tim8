import React, {useEffect, useState} from 'react';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import UserStats from "../../components/user/UserStats";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import MyReservationCard from "../../components/user/MyReservationCard";
import MyPlayedCard from "../../components/user/MyPlayedCard";
import axios from "axios";
import MyCanceledCard from "../../components/user/MyCanceledCard";

function MyReservations({ user, isAuthenticated }) {

    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)
    const [fields, setFields] = useState([]);
    const [scheduled, setScheduled] = useState(0);
    const [played, setPlayed] = useState(0);

    useEffect(() => {
        getFields();
    }, [fields, user]);
    async function getFields() {
        if(user) {
            await axios
                .get(`http://127.0.0.1:8000/user/my-reservations/${user.id}/`)
                .then((response) => {
                    setFields(response.data)
                    var play=0;
                    for(let i=0;i<fields.length;i++) {
                        if (fields[i].played) play++
                    }
                    setPlayed(play)
                    setScheduled(fields.length)
                })
                .catch((error) => {
                    console.error('Error fetching fields:', error);
                });
        }
    }




    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>My Reservations</h1>
                <h5>List of your bookings.</h5>
                <div className="fieldCards mb-5">
                    <MyReservationCard fields={fields} />
                </div>
                <h1>Confirmed Reservations</h1>
                <h5>List of played bookings.</h5>
                <div className="fieldCards mb-5">
                    <MyPlayedCard fields={fields} user={user}/>
                </div>
                <h1>Canceled Reservations</h1>
                <h5>List of cancelled reservations.</h5>
                <div className="fieldCards mb-5">
                    <MyCanceledCard fields={fields} user={user} />
                </div>
                <div style={{width: "65%"}}>
                    <h1 className="mt-5">Stats</h1>
                    <h5>The ratio of scheduled and played reservations.</h5>
                    <UserStats scheduled={scheduled} played={played} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(MyReservations);