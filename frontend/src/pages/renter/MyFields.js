import React, {useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import axios from "axios";

//components
import RenterSidebar from "../../components/navigation/RenterSidebar";
import Field from "../../components/renter/Field";
import AddFieldModal from "../../components/renter/AddFieldModal";


function MyFields({ user, isAuthenticated }) {

    const [fields, setFields] = useState([]);

    useEffect(() => {
        getFields();
    }, [user]);

    // if(!isAuthenticated && user == null)
    //     return (<Navigate to={"/"}/>)

    function getFields() {
        if(user)
        axios
            .get(`http://127.0.0.1:8000/renter/my-fields/${user.id}/`)
            .then((response) => {
                setFields(response.data.reverse())
            })
            .catch((error) => {
                console.error('Error fetching fields:', error);
            });
    }

    return (
        <div className="background-grayish" style={{ display: 'flex' }}>
            <RenterSidebar />
            <div className="page-margin">
                <h1>My Fields</h1>
                <h5>List of all your fields.</h5>
                <ToastContainer
                    position="top-right"
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
                <Field user={user} fields={fields} getf={getFields}/>
                <AddFieldModal props={user} getf={getFields}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});


export default connect(mapStateToProps,null)(MyFields);