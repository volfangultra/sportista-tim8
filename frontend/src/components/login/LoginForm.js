import React, { useState } from 'react';
import "./LoginForm.css";
import {connect} from "react-redux";
import {login} from "../../auth/Auth";
import Button from '@material-ui/core/Button';
import {toast, ToastContainer} from "react-toastify";


function LoginForm({login}) {
    const [isRightPanelActive, setRightPanelActive] = useState(true);
    const [renterEmail, setRenterEmail] = useState('');
    const [renterPassword, setRenterPassword] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [error, setError] = useState(null);

    const handleUserButtonClick = () => {
        setRightPanelActive(true);
    };

    const handleRenterButtonClick = () => {
        setRightPanelActive(false);
    };

    const handleRenterEmail = (event)=>{
        setRenterEmail(event.target.value);
    }

    const handleRenterPassword = (event)=>{
        setRenterPassword(event.target.value);
    }

    const handleUserEmail = (event) => {
        setuserEmail(event.target.value)
    }

    const handleUserPassword = (event) => {
        setuserPassword(event.target.value)
    }

    const handleError = (errorMesage) => {
        setError(errorMesage)
    }

    const loginRenter = (event) => {
        event.preventDefault()
        login(renterEmail, renterPassword, false, false, true, handleError).then( () =>{
            displayAlert()
        })
    }
    const loginUser = (event) => {
        event.preventDefault()
        login(userEmail, userPassword, false, true, false, handleError).then( () =>{
            displayAlert()
        })
    }

    const displayAlert = () => {
        if (error && Object.keys(error).length > 0) {
            if (error.email != null) {
                toast.error(error.email, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else if (error.password != null) {
                toast.error(error.password, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else if(error.detail != null){
                toast.error(error.detail, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }else {
                toast.error('Error with login', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <div className="login-form-page">
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
            <div className={isRightPanelActive ? 'dowebok right-panel-active' : 'dowebok'} id="dowebok">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h3 className="loginh1">USER LOGIN</h3>
                        <input type="email" placeholder="Email address" onChange={handleUserEmail}/>
                            <input type="password" placeholder="Password" onChange={handleUserPassword}/>
                        <a href="http://localhost:3000/reset_password" className="forgot_password">Forgot password?</a>
                                <Button className="mt-2 custom-button" onClick={loginUser}>Login</Button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h3 className="loginh1">RENTER LOGIN</h3>
                        <input type="email" placeholder="Email address" onChange={handleRenterEmail}/>
                            <input type="password" placeholder="Password" onChange={handleRenterPassword}/>
                        <a href="http://localhost:3000/reset_password" className="forgot_password">Forgot password?</a>
                                <Button className="mt-2 custom-button" onClick={loginRenter}>Login</Button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="loginh1">Are you a renter?</h1>
                            <p className="loginp">Click here to login as renter.</p>
                            <Button id="signUser" className="custom-button2" onClick={handleRenterButtonClick}>Login</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="loginh1">Are you a user?</h1>
                            <p className="loginp">Click here to login as user.</p>
                            <Button id="signRenter" className="custom-button2" onClick={handleUserButtonClick}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, {login})(LoginForm);
