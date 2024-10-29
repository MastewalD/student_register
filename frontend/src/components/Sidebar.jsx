// src/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css'; // Import CSS for styling

const Sidebar = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? '<<' : '>>'}
            </button>
            <nav>
                <button onClick={() => onSelect('dashboard')}>Dashboard</button>
                <button onClick={() => onSelect('registerStudent')}>Register Student</button>
                <button onClick={() => onSelect('listStudent')}>List Student</button>
                <button onClick={() => onSelect('logout')}>Logout</button>
            </nav>
        </div>
    );
};

export default Sidebar;