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
                <Card sx={{ maxWidth: 345,marginRight:"10px" }} key={field.fild.id}>
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
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <p>{field.fild.name}</p>
                            <p>{field.beginning}</p>
                            <p>{field.ending}</p>
                        </Typography>
                    </CardContent>
                    <CardActions className="d-flex justify-content-evenly">
                        <CancelBookingFieldModal id={field.id} user={props.user} />
                        <FieldDetailsModal address={field.fild.address} details={field.fild.details} price={field.fild.price} />
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