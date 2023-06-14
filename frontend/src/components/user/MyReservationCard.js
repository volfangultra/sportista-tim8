import "../../pages/user/User.css";
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FieldDetailsModal from "./FieldDetailsModal";
import CancelBookingFieldModal from "./CancelBookingFieldModal";

function FieldCard() {
    return (
        <Card className="card4">
            <CardMedia
                component="img"
                height="140"
                image={require('../../resources/images/teren1.jpg')}
                alt="Field"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Field Name
                </Typography>
            </CardContent>
            <CardActions className="d-flex justify-content-evenly">
                <CancelBookingFieldModal />
                <FieldDetailsModal />
            </CardActions>
        </Card>
    );
}

export default FieldCard;