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
import moment from "moment";

function FieldCard(props) {
    return (
        <div className={"cardRow"} style={{display:"flex"}}>
        {props.fields.map((field) => (
            <div>{ field.cancelled &&
                <Card className={"card"} sx={{ maxWidth: 345,marginRight:"10px" }} key={field.fild.id}>
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
                    <Typography gutterBottom variant="h5" component="div">
                        <p>{field.fild.name}</p>
                    </Typography >
                    <Typography variant="h2" component="div">
                        <p style={{fontSize: "16px"}}>{"Starts: " + moment(field.beginning, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm")}</p>
                        <p style={{fontSize: "16px"}}>{"Ends: " + moment(field.ending, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm")}</p>
                    </Typography>
                </Card>}
            </div>))}
        </div>
    );
}

export default FieldCard;