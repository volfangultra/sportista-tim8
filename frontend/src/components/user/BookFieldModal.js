import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button, MenuItem, TextField } from '@mui/material';
import { SERVER_URL } from "../../auth/Consts";
import axios from "axios";

import {toast, ToastContainer} from "react-toastify";

const BookFieldModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTimeFrom, setSelectedTimeFrom] = useState('NONE'); // Selected time slot
    const [selectedTimeTo, setSelectedTimeTo] = useState('NONE'); // Selected time slot
    const [numSlots, setNumSlots] = useState(0); // Number of slots
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [bookedDates, setBookedDates] = useState([])
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    useEffect(() => {
        setIsUserLoggedIn(!!props.user);
    }, [props.user]);

    const handleLogin = () => {
        window.location.href = '/login';
    };

    const resetModal = () => {
        setSelectedTimeFrom("NONE")
        setSelectedTimeTo("NONE")
        setSelectedDate(new Date())

    }

    const handleTimeChangeFrom = (event) => {
        const newTimeFrom = event.target.value;
        setSelectedTimeFrom(newTimeFrom);
        calculateNumSlots(newTimeFrom, selectedTimeTo);
    };

    const handleTimeChangeTo = (event) => {
        const newTimeTo = event.target.value;
        setSelectedTimeTo(newTimeTo);
        calculateNumSlots(selectedTimeFrom, newTimeTo);
    };

    const calculateNumSlots = (timeFrom, timeTo) => {
        const from = new Date(`2000/01/01 ${timeFrom}`);
        const to = new Date(`2000/01/01 ${timeTo}`);
        const diffInMillis = Math.abs(to - from);
        const numSlots = Math.ceil(diffInMillis / (30 * 60 * 1000));
        setNumSlots(numSlots);
        if(numSlots)
            document.getElementById('price').value=(numSlots * props.field.fields.price).toString() + "KM";
        else
            document.getElementById('price').value="";
    };

    const handleBooking = (as_team) => {
        //TO DO sredi alertove za pogresan unos
        if(selectedTimeFrom === 'NONE' || selectedTimeTo === 'NONE') {
            toast.error("Please select time", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return
        }

        if(selectedTimeFrom && selectedTimeTo){
            let validan = true
            let start = new Date(selectedDate)
            let end = new Date(selectedDate)
            start.setHours(selectedTimeFrom.split(':')[0])
            start.setMinutes(selectedTimeFrom.split(':')[1])
            end.setHours(selectedTimeTo.split(':')[0])
            end.setMinutes(selectedTimeTo.split(':')[1])
            if(start >= end) {
                toast.error("Wrong time selection", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return
            }
            bookedDates.forEach((date) => {
                if(date.start.getDate() === selectedDate.getDate()){
                    const time_appointed_start = 60 * start.getHours() + start.getMinutes()
                    const time_appointed_end = 60 * end.getHours() + end.getMinutes()
                    const time_start = 60 * date.start.getHours() + date.start.getMinutes()
                    const time_end = 60 * date.end.getHours() + date.end.getMinutes()
                    validan = !((time_start > time_appointed_start && time_end <= time_appointed_end) || (time_start >= time_appointed_start && time_end < time_appointed_end))
                }
            })

            if(!validan){
                toast.error("Field is reserved at that time.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return
            }
            if(start >= end){
                toast.error("Wrong date selection", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return
            }
            if(as_team === false)
                axios.post(`${SERVER_URL}/user/solo_book_field/`, {
                    id_usera: props.user.id,
                    id_sporta: props.field.fields.is_sport,
                    id_fielda: props.field.pk,
                    price: props.field.fields.price,
                    start: start,
                    ends:  end
                })
            else
                axios.post(`${SERVER_URL}/user/team_book_field/${props.team.id}/`, {
                    id_usera: props.user.id,
                    id_sporta: props.field.fields.is_sport,
                    id_fielda: props.field.pk,
                    price: props.field.fields.price,
                    start: start,
                    ends:  end
                })
        }
        closeModal()

        toast.success('Field booked successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    };

    // Generate time options from 8 AM to 12 PM
    const generateTimeOptions = (start, end, id) => {
        const options = [];

        if (start !== undefined && end !== undefined) {
            let start_date = new Date(selectedDate);
            let end_date = new Date(selectedDate);
            start_date.setHours(start.split(':')[0]);
            end_date.setHours(end.split(':')[0]);

            options.push(
                <MenuItem key="NONE" value="NONE">
                    NONE
                </MenuItem>
            );

            if (new Date().getDate() === start_date.getDate()) {
                start_date.setHours(Math.max(parseInt(start.split(':')[0]), new Date().getHours()));
            }

            if (new Date().getDate() > start_date.getDate()) {
                start_date.setHours(24);
            }

            for (let i = start_date.getHours(); i <= end_date.getHours(); i++) {
                let validHour = true;
                let validHalfHour = true;

                bookedDates.forEach((date) => {
                    date.start = new Date(date.start);
                    date.end = new Date(date.end);

                    if (
                        date.start.getDate() === selectedDate.getDate() &&
                        date.start.getHours() <= i &&
                        i <= date.end.getHours() &&
                        date.id_field !== id &&
                        !(date.end.getMinutes() === 0 && i === date.end.getHours())
                    ) {
                        validHour = false;
                    }

                    if (
                        date.start.getDate() === selectedDate.getDate() &&
                        date.start.getHours() <= i &&
                        i <= date.end.getHours() &&
                        date.id_field !== id &&
                        !(date.end.getMinutes() === 30 && i === date.end.getHours())
                    ) {
                        if (!(validHour === true && i === date.end.getHours())) validHalfHour = false;
                    }

                    if (i === end_date.getHours()) validHalfHour = false;
                });

                if (validHour) {
                    options.push(
                        <MenuItem key={`${i}:00`} value={`${i}:00`}>
                            {`${i}:00`}
                        </MenuItem>
                    );
                }

                if (validHalfHour) {
                    options.push(
                        <MenuItem key={`${i}:30`} value={`${i}:30`}>
                            {`${i}:30`}
                        </MenuItem>
                    );
                }
            }
        }

        if (options.length === 1) {
            options.push(
                <MenuItem key="NONE" value="NONE">
                    NONE
                </MenuItem>
            );
        }

        return options;
    };


    const openModal = () => {
        axios.get(`${SERVER_URL}/user/get_dates/${props.field.pk}/`).then((result)=>{
            setBookedDates(result.data)
        })
        setIsOpen(true)};
    const closeModal = () => {resetModal(); setIsOpen(false)};

    function handleFindingTeamate() {
        if(selectedTimeFrom === 'NONE' || selectedTimeTo === 'NONE') {
            toast.error("Please select time", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return
        }

        if(selectedTimeFrom && selectedTimeTo) {
            let validan = true
            let start = new Date(selectedDate)
            let end = new Date(selectedDate)
            start.setHours(selectedTimeFrom.split(':')[0])
            start.setMinutes(selectedTimeFrom.split(':')[1])
            end.setHours(selectedTimeTo.split(':')[0])
            end.setMinutes(selectedTimeTo.split(':')[1])
            if (start >= end) {
                toast.error("Wrong time selection", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return
            }
            bookedDates.forEach((date) => {
                if (date.start.getDate() === selectedDate.getDate()) {
                    const time_appointed_start = 60 * start.getHours() + start.getMinutes()
                    const time_appointed_end = 60 * end.getHours() + end.getMinutes()
                    const time_start = 60 * date.start.getHours() + date.start.getMinutes()
                    const time_end = 60 * date.end.getHours() + date.end.getMinutes()
                    validan = !((time_start > time_appointed_start && time_end <= time_appointed_end) || (time_start >= time_appointed_start && time_end < time_appointed_end))
                }
            })

            if (!validan) {
                toast.error("Field is reserved at that time.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return
            }
            if (start >= end) {
                toast.error("Wrong date selection", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return
            }

            axios.post(`${SERVER_URL}/user/find_user/${props.user.id}/${props.field.pk}/`, {
                id_usera: props.user.id,
                id_sporta: props.field.fields.is_sport,
                id_fielda: props.field.pk,
                price: props.field.fields.price,
                start: start,
                ends: end

            });
        }

        closeModal()

        toast.success('Field booked successfully!', {
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
        <>
            <Button className="custom-button" onClick={openModal}>BOOK</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <TextField
                        label="Date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(event) => {setSelectedDate(new Date(event.target.value))}}
                        type="date"
                        variant="outlined"
                        className="custom-input"
                        required
                    />

                    <TextField
                        label="From"
                        select
                        value={selectedTimeFrom}
                        onChange={handleTimeChangeFrom}
                        inputProps={{ id: 'selectedTimeFrom' }}
                        className="custom-input mt-2"
                        required
                    >
                        {generateTimeOptions(props.field.fields.starts, props.field.fields.ends, props.field.pk).map((option) => (
                            <MenuItem key={option.key} value={option.props.value}>
                                {option.props.value}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="To"
                        select
                        value={selectedTimeTo}
                        variant="outlined"
                        onChange={handleTimeChangeTo}
                        inputProps={{ id: 'selectedTimeTo' }}
                        className="custom-input mt-2"
                        required
                    >
                        {generateTimeOptions(props.field.fields.starts, props.field.fields.ends, props.field.pk).map((option) => (
                            <MenuItem key={option.key} value={option.props.value}>
                                {option.props.value}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Price"
                        type="text"
                        variant="outlined"
                        className="custom-input mt-2"
                        id="price"
                        name="price"
                        disabled={true}
                        InputLabelProps={{ shrink: true }}
                        required
                    />


                    {!isUserLoggedIn && <p className="mt-3">You need to be logged in to book this field.</p>}
                    {isUserLoggedIn ? (
                        <div>
                        <div className={"justify-content-around d-flex"}>
                            <Button className="custom-button m-2" onClick={() => handleBooking(false)}>
                                BOOK
                            </Button>

                        </div>
                            <div style={{display:"flex"}}>
                                <div className={"row"}>
                                <Button className="custom-button mt-3" onClick={() => handleBooking(true)}>
                                    BOOK as Team
                                </Button>
                                <Button className="custom-button mt-3" onClick={handleFindingTeamate}>
                                    FIND Teammate
                                </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Button className="custom-button mt-3" onClick={handleLogin}>
                            LOGIN
                        </Button>
                    )}

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />

                </Modal.Body>
            </Modal>
        </>
    );
};

export default BookFieldModal;
