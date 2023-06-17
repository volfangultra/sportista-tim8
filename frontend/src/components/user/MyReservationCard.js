import "../../pages/user/User.css";
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FieldDetailsModal from "./FieldDetailsModal";
import CancelBookingFieldModal from "./CancelBookingFieldModal";
import {Carousel} from "react-responsive-carousel";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import {izracunaj_ratings} from "./MyPlayedCard";
import moment from "moment";

function FieldCard(props) {
    const [ratings, setRatings] = useState([])
    useEffect(() => {
        axios.get(`${SERVER_URL}/get_ratings/`)
            .then((response) => {
                setRatings(response.data)

            })
            .catch((error) => {
                console.error('Error fetching fields:', error);
            });
    }, []);

    return (
        <div style={{display:"flex"}}>
        {props.fields.map((field) => (
            <div>{ field.played === false && field.cancelled === false &&
                <Card className={"card"} sx={{marginRight:"10px" }} key={field.fild.id}>
                    <Carousel showThumbs={false}>
                        {field.fild.images.split("SPLIT").map((image) => (
                            <CardMedia key={image}
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
                    <CardActions className="d-flex justify-content-evenly">
                        <CancelBookingFieldModal id={field.id} user={props.user} />
                        <FieldDetailsModal name={field.fild.name} address={field.fild.address}
                                           details={field.fild.details} price={field.price}
                                           is_sport={field.fild.is_sport} starts={field.beginning}
                                           ends={field.ending} title={"RESERVATION DETAILS"}/>
                    </CardActions>
                    <CardActions className="float-end" disableSpacing>
                        {ratings.length != 0 &&
                        <Typography component="span">{izracunaj_ratings(ratings, field.fild.id)} </Typography>
                        }
                        <StarIcon color="primary" fontSize="small" />
                    </CardActions>
                </Card>}</div>))

        }
        </div>
    );
}

export default FieldCard;