import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import "../../pages/user/User.css";
import axios from "axios";
import { TextField, Box, Button } from '@mui/material';
import {toast} from "react-toastify";

const UserAccountOverview = (props) => {
    const [userData, setUserData] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        getUserData();
    }, [props.user]);

    function getUserData() {
        if(props.user)
            axios
                .get(`http://127.0.0.1:8000/user/getData/${props.user.id_logina_id}/`)
                .then((response) => {

                    //console.log(fields.length, response.data.length)
                    if(userData !== response.data)
                        setUserData(response.data)
                    setFirstName(response.data[0].fields.first_name);
                    setLastName(response.data[0].fields.last_name);
                    setEmail(response.data[1].fields.email);
                    setCity(response.data[1].fields.city);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    }

    function changeUserData() {
        let userObject;
        userObject = {
            first_name,
            last_name,
            email,
            city
        }
        if(props.user)
            axios
                .post(`http://127.0.0.1:8000/user/changeData/${props.user.id_logina_id}/`,userObject)
                .then((response) => {
                    console.log(response)

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    }

    function callFuns(){
        changeUserData()
        setTimeout(getUserData,300)
        toast.success('Account edited successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <form className="userAccountForm" action="#">
            {userData.length === 0 ? (
                <p>Loading user data...</p>
            ) : (
                <>
                    <Box mb={2}>
                        <TextField
                            className="custom-input"
                            label="First name"
                            value={first_name}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            className="custom-input"
                            label="Last name"
                            value={last_name}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            className="custom-input"
                            label="Email"
                            value={email}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            className="custom-input"
                            label="City"
                            value={city}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Box>
                </>
            )}
            <Button className="custom-button mt-3" onClick={callFuns}>
                SAVE
            </Button>
        </form>
    );
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});

export default connect(mapStateToProps,null)(UserAccountOverview);
