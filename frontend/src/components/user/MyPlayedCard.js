import "../../pages/user/User.css";
import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FieldDetailsModal from "./FieldDetailsModal";
import CancelBookingFieldModal from "./CancelBookingFieldModal";
import {Carousel} from "react-responsive-carousel";
import StarIcon from "@mui/icons-material/Star";
import {useState} from "react";
import {Rating} from "@mui/material";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import moment from "moment";

export function izracunaj_ratings(ratings, field_id){
    let suma = 0
    let broj = 0
    for (let i = 0; i < ratings.length; i++){
        if(ratings[i].fields.id_fielda === field_id)
            suma += ratings[i].fields.grade
            broj += 1
    }
    if (broj === 0) broj = 1
    return (suma/broj).toFixed(2)

}

function rating_od_usera(ratings, user_id, field_id){
    let ocjena = 0
    for (let i = 0; i < ratings.length; i++){
        if(ratings[i].fields.id_usera === user_id && ratings[i].fields.id_fielda === field_id)
            ocjena = ratings[i].fields.grade
    }
    return ocjena
}

function ratingState(grade){
    if (grade === 0)
        return "simple-controlled"

    return "read-only"
}

function FieldCard(props) {
    const [ratings, setRatings] = useState([])
    const [gradesField, setGradesField] = useState({})

    async function get_data(){
        if(props.user)
            await axios.get(`${SERVER_URL}/get_ratings/`)
                .then((response) => {
                    setRatings(response.data)
                    let temp = {}
                    for(let i = 0; i < props.fields.length; i++){
                        temp[props.fields[i].fild.id] = rating_od_usera(ratings, props.user.id, props.fields[i].fild.id)
                    }
                    setGradesField(temp)
                })
                .catch((error) => {
                    console.error('Error fetching fields:', error);
                });
    }

    useEffect(() => {
        const interval = setInterval(function() {
            get_data()
        }, 500);

        return () => {
            clearInterval(interval);
        };

    }, [props.user, gradesField]);


    return (
        <div className={"cardRow"} style={{display:"flex"}}>
        {props.fields.map((field) => (
            <div>{ field.played &&
                <Card className={"card"} sx={{ maxWidth: 345,marginRight:"10px" }} key={field.fild.id}>
                    <Carousel showThumbs={false}>
                        {field.fild.images.split("SPLIT").map((image) => (
                            <CardMedia
                                key={image}
                                component="img"
                                height="140"
                                image={image}
                                alt="Field"
                            />
                        ))}
                    </Carousel>
                    <Typography gutterBottom variant="h5" component="div">
                        <p>{field.fild.name}</p>
                    </Typography >
                    <Typography variant="h2" component="div">
                        <p style={{fontSize: "16px"}}>{"Starts: " + moment(field.beginning, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm")}</p>
                        <p style={{fontSize: "16px"}}>{"Ends: " + moment(field.ending, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm")}</p>
                    </Typography>
                    <CardActions className="d-flex justify-content-center" disableSpacing>
                        <Rating
                            key={gradesField[field.fild.id] + " " + field.fild.id}
                            name={ratingState(gradesField[field.fild.id])}
                            value={gradesField[field.fild.id]}
                            onChange={(event, newValue) => {
                                get_data().then(()=>{
                                    if(gradesField[field.fild.id] === 0)
                                        axios.post(`${SERVER_URL}/user/rate_field/${newValue}/${field.fild.id}/${props.user.id}/`)
                                })

                            }}
                        />
                    </CardActions>
                </Card>
            }</div>
        ))}
        </div>
    );
}

export default FieldCard;