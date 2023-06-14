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
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function FieldCard(props) {
    return (
        <div className="cardContainer">
            <div className="cardRow">
            {props.fields.map((field) => (
                <Card className="card">
                    <Carousel showThumbs={false}>
                        {field.fields.images.split("SPLIT").map((image) => (
                            <div>
                                <img src={image} alt="Field photo" />
                            </div>
                        ))}
                    </Carousel>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {field.fields.name}
                        </Typography>
                    </CardContent>
                    <CardActions className="d-flex justify-content-evenly">
                        <BookFieldModal field={field} user={props.user}/>
                        <FieldDetailsModal name={field.fields.name} address={field.fields.address} details={field.fields.details} price={field.fields.price} />
                    </CardActions>
                </Card>
            ))}
            </div>
        </div>
    );
}

export default FieldCard;
