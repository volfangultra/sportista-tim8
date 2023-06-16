import "../../pages/user/User.css";
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FieldDetailsModal from "./FieldDetailsModal";
import CancelBookingFieldModal from "./CancelBookingFieldModal";
import {Carousel} from "react-responsive-carousel";
import StarIcon from "@mui/icons-material/Star";

function FieldCard(props) {
    return (
        <div style={{display:"flex"}}>
        {props.fields.map((field) => (
            <div>{ field.cancelled &&
                <Card sx={{ maxWidth: 345,marginRight:"10px" }} key={field.fild.id}>
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
                </Card>}
            </div>))}
        </div>
    );
}

export default FieldCard;