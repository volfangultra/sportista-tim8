import React, { useState, useEffect } from 'react';
import "../../components/navigation/Navbar&Footer.css"
import "./Home.css"

//components
import TopNavbar from "../../components/navigation/Navbar";
import Footer from "../../components/navigation/Footer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import FAQModal from "../../components/navigation/FAQFAB";

function MappedImage(){
    return (
        <div className="relative container-fluid d-flex justify-content-center home_slika" >
            <img src="/home_image.svg" alt="logo" className="mapped_image"/>
            <a href="/sport/basketball"><div className="basketball" title="basketball"></div></a>
            <a href="/sport/paintball"><div className="paintball" title="paintball and airsoft"></div></a>
            <a href="/sport/tennis"><div className="tennis" title="tennis"></div></a>
            <a href="/sport/ice_skating"><div className="ice_skating" title="ice skating"></div></a>
            <a href="/sport/football"><div className="football" title="football"></div></a>
            <a href="/sport/volleyball"><div className="volleyball" title="volleyball"></div></a>
            <a href="/sport/boxing"><div className="boxing" title="boxing"></div></a>
            <a href="/sport/handball"><div className="handball" title="handball"></div></a>
            <a href="/sport/table_tennis"><div className="table_tennis" title="table tennis"></div></a>
            <a href="/sport/hockey"><div className="hockey" title="hockey"></div></a>
        </div>
    );
}

const Home = ({ user, isAuthenticated }) => {

    // if(isAuthenticated && user != null)
    //     if(user.is_renter)
    //         return (<Navigate to={"/renter"}/>)
    //     else if(user.is_user)
    //         return (<Navigate to={"/user"}/>)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div>
                <div className="loader-container">
                    <div className="loader">
                        <div className="loader--dot"></div>
                        <div className="loader--dot"></div>
                        <div className="loader--dot"></div>
                        <div className="loader--dot"></div>
                        <div className="loader--dot"></div>
                        <div className="loader--dot"></div>
                        <div className="loader--text"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <TopNavbar />
            <main className="align-items-center justify-content-center d-flex text-center background-grayish">
                <h4 className="display-6 m-3 fw-bold">WELCOME TO SPORTISTA!</h4>
                <h4 className="display-6 mb-5 ">Book your favorite field in just a few clicks.</h4>
                <div className="justify-content-center d-flex">
                    <MappedImage />
                </div>
                <h2 className="display-5 mt-3">Click the sport you want to see!</h2>
            </main>
            <div style={{ position: 'fixed', bottom: '3rem', right: '20px' }}>
                <FAQModal />
            </div>
            <Footer />
        </div>
    );
};

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, user : state.auth.user});

export default connect(mapStateToProps,null)(Home);

