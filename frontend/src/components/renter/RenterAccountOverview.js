import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import "../../pages/renter/Renter.css";
import axios from "axios";
import { TextField, Button, Box } from '@mui/material';

const RenterAccountOverview = (props) => {
    const [renterData, setRenterData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    useEffect(() => {
        getRenterData();
    }, [props.user]);

    function getRenterData() {
        if(props.user)
            axios
                .get(`http://127.0.0.1:8000/renter/getData/${props.user.id_logina_id}/`)
                .then((response) => {

                    //console.log(fields.length, response.data.length)
                    if(renterData !== response.data)
                        setRenterData(response.data)
                        setName(response.data[0].fields.name);
                        setEmail(response.data[1].fields.email);
                        setCity(response.data[1].fields.city);
                        setPhoneNumber(response.data[0].fields.phone_number);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    }

    function changeRenterData() {
        let renterObject;
        renterObject = {
            name,
            email,
            city,
            phone_number
        }
        if(props.user)
            axios
                .post(`http://127.0.0.1:8000/renter/changeData/${props.user.id_logina_id}/`, renterObject)
                .then((response) => {
                    console.log(response)

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    }

    function callFuns(){
        changeRenterData()
        setTimeout(getRenterData,300)
    }


    return (
        <form className="renterAccountForm" action="#">
            {renterData.length === 0 ? (
                <p>Loading renter data...</p>
            ) : (
                <>
                    <Box mb={3}>
                        <TextField
                            className="custom-input"
                            label="Full name"
                            value={name}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            className="custom-input"
                            label="Email"
                            value={email}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            className="custom-input"
                            label="City"
                            value={city}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            className="custom-input"
                            label="Phone number"
                            value={phone_number}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Box>
                </>
            )}
            <Button className="custom-button mt-3" onClick={callFuns} >
                SAVE
            </Button>
        </form>
    );
};


const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(RenterAccountOverview);
