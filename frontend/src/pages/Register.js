import React from 'react';

//components
import Navbar from "../components/navigation/Navbar";
import RegisterForm from "../components/register/RegisterForm";
import Footer from "../components/navigation/Footer";

function Register() {
    return (
        <div className="background-grayish" style={{ height: "100vh", width: "100%" }}>
            <Navbar />
            <div className="d-flex justify-content-center">
                <RegisterForm/>
            </div>
            <Footer />
        </div>
    );
}

export default Register;