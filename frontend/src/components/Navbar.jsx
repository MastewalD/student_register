import React from 'react';
import './Navbar.css'; 
import logo from "../assets/logo.png"

function Navbar() {
    return (
        <div className="navbar">
            <div>
                <img src={logo} alt="MD"  style={{height:80,padding:5,marginLeft:30 }}/>
            </div>
            

        </div>
    );
}

export default Navbar;