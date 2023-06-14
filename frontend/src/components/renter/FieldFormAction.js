import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { SERVER_URL } from "../../auth/Consts";
import Button from "@material-ui/core/Button";
import { Box, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import defaultImage from '../../../src/resources/images/favicon.jpg';

function FieldFormAction(props) {

    const [sport, setSport] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [images, setImages] = useState(null);
    const [description, setDescription] = useState("");
    const [hasSports, setHasSports] = useState([]);
    const [gotData, setGotData] = useState(false);

    if (!gotData)
        axios.get(`${SERVER_URL}/daj_sportove`).then((res) => {
            setHasSports(res.data);
            setGotData(true);
        });

    const objekat = {
        user: props.user.id,
        sport: sport,
        name: name,
        price: price,
        location: location,
        img: images ? Array.from(images) : [defaultImage],
        description: description,
        start:start,
        end:end
    };

    function convertImagesToStrings(fileList) {
        const promises = Array.from(fileList).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageData = reader.result;
                    resolve(imageData);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        return Promise.all(promises);
    }

    function posalji() {
        if (images) {
            convertImagesToStrings(images)
                .then((imageStrings) => {
                    axios
                        .post(`${SERVER_URL}/renter/spremi`, { ...objekat, img: imageStrings })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .post(`${SERVER_URL}/renter/spremi`, objekat)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function callFuns() {
        posalji();
        props.closeModal();
        setTimeout(props.getF, 330);
    }
    const handleKeyPress =(event) =>{

        if (event.key === 'Enter') {
            callFuns();
        }
    }

    return (
        <form encType="multipart/form-data" onKeyPress={handleKeyPress}>
            <Box mb={1}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="formBasicSport">Sport</InputLabel>
                    <Select
                        className="custom-input"
                        aria-label="Select sport"
                        variant="outlined"
                        onChange={(e) => setSport(e.target.value)}
                    >
                        <MenuItem value="">Select sport</MenuItem>
                        {hasSports.map((sport) => (
                            <MenuItem key={sport.pk} value={sport.pk}>
                                {sport.fields.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                />
            </Box>
            <Box mb={1}>
                <label htmlFor="start">Start:</label>
                <input type="time" onChange={(e)=>setStart(e.target.value)}/>
                <label htmlFor="end">End:</label>
                <input type="time" onChange={(e)=>setEnd(e.target.value)}/>
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    variant="outlined"
                    label="Location"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Box>

            <Box mb={1}>
                <TextField
                    className="custom-input"
                    variant="outlined"
                    label="Price"
                    onChange={(e) => setPrice(e.target.value)}
                />
            </Box>

            <Box mb={1}>
                <InputLabel htmlFor="formBasicImg">Image</InputLabel>
                <TextField
                    className="custom-input"
                    type="file"
                    id="formBasicImg"
                    onChange={(e) => setImages(e.target.files)}
                    inputProps={{ multiple: true }}
                />
            </Box>

            {!images && (
                <Box mb={1}>
                    <img src={defaultImage} alt="Default" width="200" height="200" style={{ display: "none" }} />
                </Box>
            )}

            <Box mb={3}>
                <InputLabel htmlFor="textarea">Description</InputLabel>
                <TextareaAutosize
                    className="custom-input"
                    id="textarea"
                    rows={3}
                    maxLength={60}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>

            <Box textAlign="center">
                <Button variant="outlined" className="mt-3" onClick={callFuns}>
                    {props.action}
                </Button>
            </Box>
        </form>
    );
}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated, user: state.auth.user });

export default connect(mapStateToProps, null)(FieldFormAction);
