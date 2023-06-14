import "../../pages/user/User.css";
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FieldDetailsModal from "./FieldDetailsModal";
import BookFieldModal from "./BookFieldModal";
import CancelBookingFieldModal from "./CancelBookingFieldModal";
import {Carousel} from "react-responsive-carousel";

function FieldCard(props) {
    console.log(props.fields)
    return (
        <div style={{display:"flex"}}>
        {props.fields.map((field) => (
        <Card sx={{ maxWidth: 345,marginRight:"10px" }}>
            <Carousel showThumbs={false}>
                {field.fild.images.split("SPLIT").map((image) => (
                    <CardMedia
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
            <CardActions className="d-flex justify-content-between">
                <CancelBookingFieldModal />
                <FieldDetailsModal address={field.fild.address} details={field.fild.details} price={field.fild.price} />
            </CardActions>
            <CardActions className="float-end" disableSpacing>
                <Typography component="span">4.5/5 </Typography>
                <StarIcon color="primary" fontSize="small" />
            </CardActions>
        </Card>))}
        </div>
    );
}

export default FieldCard;