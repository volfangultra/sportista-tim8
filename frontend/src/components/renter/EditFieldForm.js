import React, {useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {SERVER_URL} from "../../auth/Consts";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";

function EditFieldForm(props, { user, isAuthenticated } ) {

    var fieldObject;
    const [sport,setSport] = useState("");
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [price,setPrice] = useState("");
    const [img,setImg] = useState("");
    const [description,setDescription] = useState("");
    const [hasSports, setHasSports] = useState([]);
    const [gotData, setGotData] = useState(false);

    useEffect(() => {
        getFieldData();
    }, [user]);

    if(!gotData)
        axios.get( `${SERVER_URL}/get_sports/`).then((res) => {
            setHasSports(res.data)
            setGotData(true)
        })


    if(props.user != null){
        fieldObject ={
            user:props.user.id,
            sport,
            name,
            price,
            location,
            img,
            description
        }
    }

    function getBase64(file, cb) {

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            cb(reader.result)
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function editFieldData() {

        if (img) {
            getBase64(img, (result)=>{
                axios.post(`http://127.0.0.1:8000/renter/editFieldData/${props.field_id}/`, {...fieldObject, img:result})
                    .then(response => {
                        console.log(response.data);
                        // Handle the successful response
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle the error
                    });
            })
        } else {
            axios.post(`http://127.0.0.1:8000/renter/editFieldData/${props.field_id}/`, fieldObject )
                .then(response => {
                    console.log(response.data);
                    // Handle the successful response
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error
                });
        }
    }

    function getFieldData() {
        if(props.user)
            axios
                .get(`http://127.0.0.1:8000/renter/getFieldData/${props.field_id}/`)
                .then((response) => {
                    //console.log(fields.length, response.data.length)
                    if(fieldObject !== response.data) {
                        setName(response.data[0].fields.name);
                        setLocation(response.data[0].fields.address);
                        setPrice(response.data[0].fields.price);
                        setDescription(response.data[0].fields.details);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    }

    function callFuns(){
        editFieldData()
        setTimeout(props.getf, 300)
        props.closeModal()
    }

    return (
        <form encType="multipart/form-data">
            <Box mb={1}>
                <FormControl fullWidth>
                    <TextField
                        select
                        className="custom-input"
                        label="Select sport"
                        value={sport}
                        variant="outlined"
                        onChange={(e) => setSport(e.target.value)}
                    >
                        {hasSports.map((sport) => (
                            <MenuItem key={sport.pk} value={sport.pk}>
                                {sport.fields.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    variant="outlined"
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    variant="outlined"
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    type="file"
                    id="formBasicImg"
                    label="Image"
                    variant="outlined"
                    onChange={(e) => setImg(e.target.files[0])}
                    inputProps={{ multiple: true }}
                />
            </Box>

            <Box mb={3}>
                <TextField
                    className="custom-input"
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={3}
                    fullWidthrequired
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>

            <Box textAlign="center">
                <Button className="custom-button mt-3" onClick={callFuns}>
                    EDIT
                </Button>
            </Box>
        </form>
    );
}
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});

export default connect(mapStateToProps,null)(EditFieldForm);