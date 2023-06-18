import React from 'react';
import { Card, CardHeader, CardMedia, List, ListItem, ListItemText } from '@mui/material';
import '../../pages/admin/Admin.css';

function MostRentedFields() {
    const mostRentedFields = [
        {
            name: 'Football Field',
            rentals: 23,
            image: 'https://images.pexels.com/photos/6078300/pexels-photo-6078300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            name: 'Basketball Court',
            rentals: 15,
            image: 'https://images.pexels.com/photos/5780600/pexels-photo-5780600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            name: 'Tennis Court',
            rentals: 11,
            image: 'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];

    return (
        <div className="mt-5">
            <div className="most-rented-fields-container">
                {mostRentedFields.map((field, index) => (
                    <Card key={index} className="most-rented-field-card">
                        <CardMedia component="img" height="200" image={field.image} alt={field.name} />

                        <CardHeader title={field.name} />

                        <List>
                            <ListItem>
                                <ListItemText primary={`Rentals: ${field.rentals}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Location: TBD" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Price: TBD" />
                            </ListItem>
                        </List>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MostRentedFields;
