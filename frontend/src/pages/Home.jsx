import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainComponent';
import { FaBars } from 'react-icons/fa'; 
import { FaTimes } from 'react-icons/fa';

import './Home.css';

const Home = () => {
    const [selected, setSelected] = useState('dashboard');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prev => !prev);
    };

    return (
        <div className="home">
            <div className="app-container">
                <Sidebar onSelect={setSelected} isExpanded={isSidebarExpanded} />
                <div className="toggle-button" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                    {isSidebarExpanded ? <FaBars /> : <FaTimes />}
                </div>
                <div className={`content ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
                    <MainContent selected={selected} />
                </div>
            </div>
        </div>
    );
};

export default Home;