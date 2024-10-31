import React from 'react';
import './Navbar.css'; 
import logo from "../assets/logo.png";
import { FaSun, FaMoon } from 'react-icons/fa';
function Navbar({ toggleGrayMode, isGrayMode } ) {
    return (
        <div className="navbar">
            <div>
                <img src={logo} alt="MD" style={{ }} />
            </div>
            <button onClick={toggleGrayMode} aria-label="Toggle color mode">
                {isGrayMode ? (
                    <FaSun size={24} title="Switch to Gray Mode" />
                    
                ) : (
                    <FaMoon size={24}  title="Switch to Light Mode" /> 
                )}
            </button>
        </div>
    );
}

export default Navbar;