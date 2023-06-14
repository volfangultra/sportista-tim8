import React, {useEffect, useState} from 'react';
import "./User.css";

//components
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import UserSidebar from "../../components/navigation/UserSidebar";
import FieldCard from "../../components/user/FieldCard";
import Tab from "../../components/user/Tab";
import RecommendedFields from "../../components/user/RecomendedFields";


function Dashboard({user, isAuthenticated}) {
    const [fields, setFields] = useState([]);
    const [activeTab, setActiveTab] = useState('fields');

    const notify = () => toast.error('ERRRRRROR!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notify2 = () => toast.success('SUCCCEEEESS', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        getFields();
    }, [fields, user]);
    function getFields() {
        if(user)
            axios
                .get(`http://127.0.0.1:8000/user/dashboard`)
                .then((response) => {


                    if(fields.length !== response.data.length)
                        setFields(response.data.reverse())
                })
                .catch((error) => {
                    console.error('Error fetching fields:', error);
                });
    }
    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)
    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <UserSidebar />
            <div className="page-margin">
                <h1>Dashboard</h1>
                <h5>List of available fields for booking.</h5>

                <button onClick={notify}>Notify!</button>
                <button onClick={notify2}>Notify2!</button>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                {/* Same as */}

                <div className="tabs">
                    <Tab
                        label="All Fields"
                        active={activeTab === 'fields'}
                        onClick={() => handleTabChange('fields')}
                    />
                    <Tab
                        label="Recommended Fields"
                        active={activeTab === 'recommended'}
                        onClick={() => handleTabChange('recommended')}
                    />
                </div>
                <div className="fieldCards">
                    {activeTab === 'fields' && <FieldCard onlyFavorites={false} fields={fields} user={user} />}
                    {activeTab === 'recommended' && <RecommendedFields />}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(Dashboard);
