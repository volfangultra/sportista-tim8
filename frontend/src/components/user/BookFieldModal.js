import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import {SERVER_URL} from "../../auth/Consts";
import axios from "axios";

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
            document.getElementById('price').value=(numSlots * props.field.fields.price).toString() + "$";
        else
            document.getElementById('price').value="";
    };

    const handleBooking = () => {
        //TO DO sredi alertove za pogresan unos
        if(selectedTimeFrom === 'NONE' || selectedTimeTo === 'NONE')
            alert("Please select time")
        if(selectedTimeFrom && selectedTimeTo){
            let start = new Date(selectedDate)
            let end = new Date(selectedDate)
            start.setHours(selectedTimeFrom.split(':')[0])
            start.setMinutes(selectedTimeFrom.split(':')[1])
            end.setHours(selectedTimeTo.split(':')[0])
            end.setMinutes(selectedTimeTo.split(':')[1])
            if(start >= end)
                alert("Wrong time selection")

            axios.post(`${SERVER_URL}/user/solo_book_field/`, {
                id_usera: props.user.id,
                id_sporta: props.field.fields.is_sport,
                id_fielda: props.field.pk,
                price: props.field.fields.price,
                start: start,
                ends:  end
            })
        }

    };

    // Generate time options from 8 AM to 12 PM
    const generateTimeOptions = (start, end, id) => {
        const options = [];
        //TO DO - provjeri da li odgovara sa terminima u bazi
        if(start !== undefined && end !== undefined){
            let start_date = new Date(selectedDate)
            let end_date = new Date(selectedDate)
            start_date.setHours(start.split(":")[0])
            end_date.setHours(end.split(":")[0])
            options.push(<option>NONE</option>)
            if(new Date().getDate() === start_date.getDate()){
                start_date.setHours(Math.max(parseInt(start.split(":")[0]), new Date().getHours()))
            }
            if(new Date().getDate() > start_date.getDate()){
                start_date.setHours(24)
            }
            for (let i = start_date.getHours(); i <= end_date.getHours(); i++) {
                let validan = true
                bookedDates.forEach((date) => {
                    date.start = new Date(date.start)
                    date.end = new Date(date.end)
                    if(date.start.getDate() === selectedDate.getDate() && date.start.getHours() <= i && i <= date.end.getHours() && date.id_field === id){
                        validan = false
                    }

                })
                if(validan)
                    options.push(
                        <option key={`${i}:00`} value={`${i}:00`}>{`${i}:00`}</option>,
                        <option key={`${i}:30`} value={`${i}:30`}>{`${i}:30`}</option>
                    );
            }

        }
        return options;
    };

    const openModal = () => {
        axios.get(`${SERVER_URL}/user/get_dates/${props.field.pk}/`).then((result)=>{
            setBookedDates(result.data)
        })
        setIsOpen(true)};
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button className="custom-button mt-2" onClick={openModal}>BOOK</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>BOOK THIS FIELD</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <input className="custom-input" type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(event) => {setSelectedDate(new Date(event.target.value))}}/>
                        <select className="custom-input" value={selectedTimeFrom} onChange={handleTimeChangeFrom}>
                            {generateTimeOptions(props.field.fields.starts, props.field.fields.ends, props.field.pk)}
                        </select>
                        <select className="custom-input" value={selectedTimeTo} onChange={handleTimeChangeTo}>
                            {generateTimeOptions(props.field.fields.starts, props.field.fields.ends, props.field.pk)}
                        </select>

                    {/* cijena bi trebalo da se izračuna po slotu, a cijena slota se pravi kada se pravi teren, slot je pola sata */}
                    <input className="custom-input" id="price" name="price" type="text" disabled={true}/>

                    {!isUserLoggedIn && <p>You need to be logged in to book this field.</p>}
                    {isUserLoggedIn ? (
                        <Button className="custom-button mt-3" onClick={handleBooking}>
                            BOOK
                        </Button>
                    ) : (
                        <Button className="custom-button mt-3" onClick={handleLogin}>
                            LOGIN
                        </Button>
                    )}

                </Modal.Body>
            </Modal>
        </>
    );
};

export default BookFieldModal;
