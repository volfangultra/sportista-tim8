import React, {useState} from "react";
import "./Contact.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import {Box, FormControl, MenuItem, Select, TextField} from "@mui/material";

function ContactForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    function sendMessage(){
        axios.post(`${SERVER_URL}/inbox/message/`, {
            firstName,
            lastName,
            subject,
            message
        })

        alert("Message successfully sent to admin!")
    }

    return (
        <form className="contact-form mt-5">
            <Box mb={2}>
                <TextField
                    className="custom-input"
                    id="first_name"
                    name="first_name"
                    label="First name"
                    fullWidth
                    onChange={(e) => {setFirstName(e.target.value)}} required
                />
            </Box>
            <Box mb={2}>
                <TextField
                    className="custom-input"
                    id="last_name"
                    name="last_name"
                    label="Last name"
                    fullWidth
                    onChange={(e) => {setLastName(e.target.value)}} required
                />
            </Box>
            <Box mb={3}>
                <FormControl fullWidth>
                    <TextField
                        select
                        sx={{ width: "14rem" }}
                        className="custom-input contact-input"
                        id="subject"
                        name="subject"
                        label="Subject"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        required
                    >
                        <MenuItem value="Inquiry">Inquiry</MenuItem>
                        <MenuItem value="Feedback">Feedback</MenuItem>
                        <MenuItem value="Support">Support</MenuItem>
                    </TextField>
                </FormControl>
            </Box>
            <Box mb={3}>
                <TextField
                    sx={{
                        width: "14rem"
                    }}
                    className="custom-input"
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows={5}
                    fullWidth
                    onChange={(e) => { setMessage(e.target.value) }}
                    required
                />
            </Box>
            <Button className="custom-button mt-3" onClick={sendMessage} type={"submit"}>SEND</Button>
        </form>
    );
}

export default ContactForm;
