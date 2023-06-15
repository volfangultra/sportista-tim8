import "../../pages/user/User.css";
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import FieldDetailsModal from "./FieldDetailsModal";
import BookFieldModal from "./BookFieldModal";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";


function FieldCard(props) {
    const [favoriteMap, setFavoriteMap] = useState({});
    const [favorite, setFavorite] = useState(true);

    useEffect(()=>{
        let temp = {}
        if(props.fields != null){
            props.fields.forEach((field)=> {
                temp[field.pk] = false
            })
        }
        if(props.user != null)
            axios.get(`${SERVER_URL}/user/get_favorite_fields/${props.user.id}/`)
                .then((response) => {
                    for (let field in response.data)
                        temp[response.data[field]] = true

                    setFavoriteMap(temp)

                })
                .catch((error) => {
                    console.error('Error fetching fields:', error);
                });
    }, [favorite])
    return (
        <div className="cardContainer">
            <div className="cardRow">
            {props.fields.map((field) => (
                <div>
                    {(!props.onlyFavorites || favoriteMap[field.pk]) &&
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
                                               details={field.fields.details} price={field.fields.price}/>
                        </CardActions>
                        <CardActions className="justify-content-between" disableSpacing>
                                <span style={{ marginLeft: "2rem", cursor: "pointer" }}>
                                    {!favoriteMap[field.pk] &&
                                        <FavoriteBorder color="primary" onClick={() => {
                                            axios.post(`${SERVER_URL}/user/favorite_field/${field.pk}/${props.user.id}/`).then(() => {
                                                setFavorite(!favorite)
                                            })
                                        }}/>
                                    }
                                    {favoriteMap[field.pk] &&
                                        <Favorite color="primary" onClick={() => {
                                            axios.post(`${SERVER_URL}/user/unfavorite_field/${field.pk}/${props.user.id}/`).then(() => setFavorite(!favorite))
                                        }}/>
                                    }
                                </span>
                                <span style={{ marginRight: "2rem" }}>
                                    <Typography component="span">4.5/5 </Typography>
                                    <StarIcon color="primary" />
                                </span>
                        </CardActions>
                    </Card>}
                </div>
            ))}
            </div>
        </div>
    );
}

export default FieldCard;
