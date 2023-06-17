import React, {useEffect, useRef, useState} from 'react';
import "./User.css";

//components
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import FieldCard from "../../components/user/FieldCard";
import Tab from "../../components/user/Tab";
import RecommendedFields from "../../components/user/RecomendedFields";
import {Button, ClickAwayListener, Collapse, Menu, MenuItem, Popper, Slider, TextField} from "@mui/material";
import Paper from "@material-ui/core/Paper";
import {SERVER_URL} from "../../auth/Consts";


function Dashboard({user, isAuthenticated}) {
    var [fields, setFields] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [priceRange, setPriceRange] = useState(null);
    const [activeTab, setActiveTab] = useState('fields');
    const [nameFilter, setNameFilter] = useState('');
    const [sportFilter, setSport] = useState("");
    const [locationFilter, setLocationFilter] = useState('');
    const [hasSports, setHasSports] = useState([]);
    const [gotData, setGotData] = useState(false);
    const [loading, setLoading] = useState(false)
    const[recommended, setRecommended] = useState([])
    const[recommendedFields, setRecommendedFields] = useState([])

    const [anchorEl, setAnchorEl] = useState(null);


    function convertTimeStringToTime(timeString) {
        var timeParts = timeString.split(":");
        var hours = parseInt(timeParts[0], 10);
        var minutes = parseInt(timeParts[1], 10);

        var time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);

        return time;
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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

    useEffect(() => {
        getFields();
    }, [user]);
    async function getFields() {
        if (user) {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/dashboard');
                const response2 = await axios.get(`${SERVER_URL}/user/get_recommended_fields/${user.id}/`).then((response)=>{
                    setRecommended(response.data)
                    var temp = []
                    fields.forEach((field)=>{
                        if((convertTimeStringToTime(user.monday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.monday_end) < convertTimeStringToTime(field.fields.ends)) ||
                            (convertTimeStringToTime(user.tuesday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.tuesday_end) < convertTimeStringToTime(field.fields.ends)) ||
                            (convertTimeStringToTime(user.wednesday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.wednesday_end) < convertTimeStringToTime(field.fields.ends)) ||
                            (convertTimeStringToTime(user.thursday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.thursday_end) < convertTimeStringToTime(field.fields.ends)) ||
                            (convertTimeStringToTime(user.friday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.friday_end) < convertTimeStringToTime(field.fields.ends)) ||
                            (convertTimeStringToTime(user.saturday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.saturday_end) < convertTimeStringToTime(field.fields.ends)) ||
                            (convertTimeStringToTime(user.sunday_start) > convertTimeStringToTime(field.fields.starts) || convertTimeStringToTime(user.sunday_end) < convertTimeStringToTime(field.fields.ends))){
                            temp.push(field)
                        }

                    })
                    console.log("HELL")
                    for(let i = 0; i < temp.length; i++){
                        for(let j = 0; j < recommended.length; j++){
                            if(temp[i].pk === recommended[j].field)
                                temp[i]["approximate_grade"] = recommended[j].grade
                        }
                    }

                    temp.sort((a, b) => (a.approximate_grade < b.approximate_grade) ? 1 : -1)
                    console.log(temp)
                    setRecommendedFields(temp)



                });
                if (fields.length !== response.data.length) {
                    setFields(response.data.reverse());
                }




            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        }
    }

    if (!gotData)
        axios.get(`${SERVER_URL}/get_sports/`).then((res) => {
            setHasSports(res.data);
            setGotData(true);
        });

    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)
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

    fields = fields.filter((field) => {
        // Apply name filter
        if (nameFilter && field.fields.name.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1) {
            return false;
        }

        if (sportFilter != "" && sportFilter != field.fields.is_sport)
            return false

        // Apply location filter
        if (locationFilter && field.fields.address.toLowerCase().indexOf(locationFilter.toLowerCase()) === -1) {
            return false;
        }

        if (priceRange!=null && (priceRange[0] > field.fields.price || priceRange[1] < field.fields.price)) {
            return false;
        }


        return true;
    });


    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
    }

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>Dashboard</h1>
                <h5>List of available fields for booking.</h5>

                <div className="tabs">
                    <Tab
                        label="All Fields"
                        active={activeTab === 'fields'}
                        onClick={() => handleTabChange('fields')}
                    />
                    <Tab
                        label="Recommended Fields"
                        active={activeTab === 'recommended'}
                        onClick={() => {handleTabChange('recommended'); getFields();}}
                    />
                    <Button
                        id="dropdown-button"
                        className="custom-button3"
                        onClick={handleOpen}
                        variant="contained"
                    >
                        FILTER FIELDS
                    </Button>

                    <Menu
                        sx={{
                                float: "none"
                            }}
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
                                placeholder="Filter by name"
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
                                placeholder="Filter by location"
                                value={locationFilter}
                                onChange={handleLocationChange}
                                variant="outlined"
                                fullWidth
                                onKeyDown={onKeyDown}
                            />
                        </MenuItem>

                        <MenuItem>
                            <TextField
                                select
                                className="custom-input"
                                label="Select sport"
                                variant="outlined"
                                value={sportFilter}
                                onChange={(e) => setSport(e.target.value)}
                            >
                                <MenuItem key={""} value={""}>
                                    All
                                </MenuItem>
                                {hasSports.map((sport) => (
                                    <MenuItem key={sport.pk} value={sport.pk}>
                                        {sport.fields.name}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                </div>
                <div className="fieldCards">
                    {activeTab === 'fields' && <FieldCard onlyFavorites={false} fields={fields} user={user} />}
                    {activeTab === 'recommended' && (<RecommendedFields fields={recommendedFields} />)}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Dashboard);
