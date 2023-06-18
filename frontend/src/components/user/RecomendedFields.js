import React, {useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Carousel} from "react-responsive-carousel";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import BookFieldModal from "./BookFieldModal";
import FieldDetailsModal from "./FieldDetailsModal";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import {izracunaj_ratings} from "./MyPlayedCard";
import StarIcon from "@mui/icons-material/Star";

function RecommendedFields(props) {
    // Dummy data for recommended fields
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
    console.log(props.fields)
    console.log("HELLO")
    return (
        <div className="cardContainer">
            <div className="cardRow">
                {props.fields.map((field) => (
                    <div>
                        <Card className="card">
                            <Carousel showThumbs={false}>
                                {field.fields.images.split("SPLIT").map((image) => (
                                    <div>
                                        <img src={image} />
                                    </div>
                                ))}
                            </Carousel>
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {field.fields.name}
                                </Typography>
                            </CardContent>
                            <CardActions className="d-flex justify-content-evenly">
                                <BookFieldModal field={field} user={props.user}/>
                                <FieldDetailsModal name={field.fields.name} address={field.fields.address}
                                                   details={field.fields.details} price={field.fields.price}
                                                   is_sport={field.fields.is_sport} starts={field.fields.starts}
                                                   ends={field.fields.ends} title={"FIELD DETAILS"}/>
                            </CardActions>
                            <CardActions className="justify-content-between" disableSpacing>
                            <span style={{ marginLeft: "2rem", cursor: "pointer" }}></span>
                                <span style={{ marginRight: "2rem" }}>
                                {ratings.length != 0 &&
                                    <Typography component="span">{izracunaj_ratings(ratings, field.pk)} </Typography>
                                }
                                    <StarIcon color="primary" />
                            </span>
                            </CardActions>
                        </Card>
                </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedFields;
