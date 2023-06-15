import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

//components
import Basketball from '../../components/sports/Basketball';
import Paintball from '../../components/sports/Paintball';
import Tennis from '../../components/sports/Tennis';
import IceSkating from '../../components/sports/IceSkating';
import Football from '../../components/sports/Football';
import Volleyball from '../../components/sports/Volleyball';
import Boxing from '../../components/sports/Boxing';
import Handball from '../../components/sports/Handball';
import TableTennis from '../../components/sports/TableTennis';
import Hockey from '../../components/sports/Hockey';
import TopNavbar from "../../components/navigation/Navbar";
import {Button, Menu, MenuItem, Pagination, Slider, TextField} from "@mui/material";
import Footer from "../../components/navigation/Footer";
import axios from "axios";
import {SERVER_URL} from "../../auth/Consts";
import * as fields from "react-bootstrap/ElementChildren";

function SportsPage() {

    const { sport } = useParams();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [priceRange, setPriceRange] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [sportFilter, setSport] = useState("");
    const [locationFilter, setLocationFilter] = useState('');
    const [fields, setFields] = useState([]);

    const objectFilter = {
        minPrice,
        maxPrice,
        priceRange,
        nameFilter,
        locationFilter
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleChildData = (data) => {
        setFields(data);
    };

    useEffect(() => {
        let min = 9999;
        let max = 0;

        fields.forEach((field) => {
            const price = field.fields.price;
            min = Math.min(min, price);
            max = Math.max(max, price);
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
        });
    }, [fields, minPrice, maxPrice]);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNameChange = (event) => {
        setNameFilter(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocationFilter(event.target.value);
    };

    const handlePriceChange = (event, newPriceRange) => {
        setPriceRange(newPriceRange);
    };

    const handleMinPriceChange = (event) => {
        const newMinPrice = event.target.value;
        setPriceRange([Number(newMinPrice), priceRange[1]]);
    };

    const handleMaxPriceChange = (event) => {
        const newMaxPrice = event.target.value;
        setPriceRange([priceRange[0], Number(newMaxPrice)]);
    };


    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
    }

    return (
        <div className="background-grayish">
            <TopNavbar />
            <Button
                id="dropdown-button"
                className="custom-button3"
                onClick={handleOpen}
                variant="contained"
                sx={{marginLeft:"10px"}}
            >
                FILTER FIELDS
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem>
                    <TextField
                        type="text"
                        label="Filter by name"
                        value={nameFilter}
                        onChange={handleNameChange}
                        variant="outlined"
                        fullWidth
                        onKeyDown={onKeyDown}
                    />
                </MenuItem>

                <MenuItem>
                    <TextField
                        type="text"
                        label="Filter by location"
                        value={locationFilter}
                        onChange={handleLocationChange}
                        variant="outlined"
                        fullWidth
                        onKeyDown={onKeyDown}
                    />
                </MenuItem>

                {priceRange && (
                    <MenuItem>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            min={minPrice}
                            max={maxPrice}
                            valueLabelDisplay="auto"
                            aria-labelledby="price-slider"
                        />
                    </MenuItem>
                )}

                {priceRange && (
                    <MenuItem>
                        <div className="justify-content-space-between">
                            <TextField
                                type="number"
                                label="Min Price"
                                value={priceRange[0]}
                                onChange={handleMinPriceChange}
                                inputProps={{
                                    min: minPrice,
                                    max: maxPrice,
                                }}
                                variant="outlined"
                                sx={{ width: '150px' }}
                            />
                            <TextField
                                type="number"
                                label="Max Price"
                                value={priceRange[1]}
                                onChange={handleMaxPriceChange}
                                inputProps={{
                                    min: minPrice,
                                    max: maxPrice,
                                }}
                                variant="outlined"
                                sx={{ width: '150px' }}
                            />
                        </div>
                    </MenuItem>
                )}
            </Menu>
        <div className="background-grayish sportsPage">

            {sport === 'basketball' && <Basketball header="Basketball" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'paintball' && <Paintball header="Paintball" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'tennis' && <Tennis header="Tennis" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'ice_skating' && <IceSkating header="Ice Skating" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'football' && <Football header="Football" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'volleyball' && <Volleyball header="Volleyball" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'boxing' && <Boxing header="Boxing" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'handball' && <Handball header="Handball" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'table_tennis' && <TableTennis header="Table Tennis" sendData={handleChildData} objectFilter={objectFilter}/>}
            {sport === 'hockey' && <Hockey header="Hockey" sendData={handleChildData} objectFilter={objectFilter}/>}
            <Pagination className="m-5" count={10} variant="outlined" shape="rounded" />
            <Footer />
        </div>
        </div>
    );
}

export default SportsPage;
