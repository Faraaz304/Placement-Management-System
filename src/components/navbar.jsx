import React from 'react';
import { Link } from 'react-router-dom';
import "../CSS/Dashboard.css"

function Navbar() {
    return (
        <header>
            <div className="logo" title="University Management System">
                <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" alt=""/>
                <h2>P<span className="danger">M</span>S</h2>
            </div>
            <div className="navbar">
                <Link to="/dashboard" className="active">
                    <span className="material-icons-sharp">home</span>
                </Link>
                <Link to="/analyze-resume">
                    <span className="material-icons-sharp">Anaylse Resume</span>
                </Link> 
                <Link to="/add-job">
                    <span className="material-icons-sharp">Add Job</span>
                </Link>
                <Link to="/change-password">
                    <span className="material-icons-sharp">password</span>
                </Link>
                <Link to="/logout">
                    <span className="material-icons-sharp">logout</span>
                </Link>
            </div>
            <div id="profile-btn">
                <span className="material-icons-sharp">person</span>
            </div>
        </header>
    );
}

export default Navbar;
