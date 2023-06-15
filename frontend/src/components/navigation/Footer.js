import "./Navbar&Footer.css";
import React from "react";
import Button from "@material-ui/core/Button";

function Footer() {
    return (
        <footer className="footer">
            <div className="copyright">
                &copy; 2023 SPORTISTA - TIM 8
            </div>
            <div className="admin-login">
                <a href="http://localhost:3000/admin-login"><Button style={{ color: "grey" }}>Admin Login</Button></a>
            </div>
        </footer>
    );
}

export default Footer;
