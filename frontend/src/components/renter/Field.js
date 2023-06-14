import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

/* components */
import EditFieldModal from "./EditFieldModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import ViewFieldModal from "./ViewFieldModal";

function Field(props) {

    return (
        <div className="cardContainer mt-5">
            <div className="cardRow">
                {props.fields.map((field) => (
                    <Card className="card2" key={field.pk}>
                        <Carousel showThumbs={false}>
                            {field.fields.images.split("SPLIT").map((image) => (
                                <div>
                                    <img src={image} alt="Field photo" />
                                </div>
                            ))}
                        </Carousel>
                        <CardContent className="d-flex flex-column">
                            <Typography gutterBottom variant="h5" component="h2">
                                {field.fields.name}
                            </Typography>
                            <Divider className="mt-3 mb-3" />
                            <div className="d-flex flex-row align-items-center justify-content-evenly">
                                <Button>
                                    <ViewFieldModal />
                                </Button>
                                <Button>
                                    <EditFieldModal field_id={field.pk} getf={props.getf} />
                                </Button>
                                <Button>
                                    <DeleteConfirmationModal field_id={field.pk} getf={props.getf} />
                                </Button>
                            </div>
                            <Divider className="mt-3 mb-3" />
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <Typography component="span">AVAILABILITY:</Typography>
                                {field.fields.lock &&
                                <Switch  defaultChecked={true} onChange={(event, checked) => {axios.post(`${SERVER_URL}/renter/lock_field/${field.pk}/${checked ? 1 : 0}/`)}} />
                            }
                            {!field.fields.lock &&
                                <Switch onChange={(event, checked) => {axios.post(`${SERVER_URL}/renter/lock_field/${field.pk}/${checked ? 1 : 0}/`)}} />
                            }
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Field;