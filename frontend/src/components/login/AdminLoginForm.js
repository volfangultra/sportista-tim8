import React, { useState } from 'react';
import "./LoginForm.css";
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {login} from "../../auth/Auth";

/* TODO:
   povezati da ide na /admin kad se loguje
*/

function AdminLoginForm({login}) {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');


    const loginAdmin = (event) => {
        event.preventDefault()
        login(adminEmail, adminPassword, true, false, false)
    }

    return (
        <div className="admin-login-form">
            <form>
                <h1 className="m-3">ADMIN LOGIN</h1>

                <input className="custom-input mt-5" type="email" id="email" placeholder="Email address"  onChange={(event)=>{setAdminEmail(event.target.value)}} />

                <input className="custom-input" type="password" id="password" placeholder="Password" onChange={(event)=>{setAdminPassword(event.target.value)}}/>

                <Button type="submit" className="mt-5 custom-button" onClick={ loginAdmin }>LOGIN</Button>
            </form>
        </div>
    );
}

export default connect(null, {login})(AdminLoginForm);
