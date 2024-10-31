import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainComponent';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const [selected, setSelected] = useState('dashboard');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setIsSidebarExpanded(prev => !prev);
        }
    };

    
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsSidebarExpanded(false); 
        } else {
            setIsSidebarExpanded(true); 
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); 
        
     
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="home">
            <div className="app-container">
                <Sidebar onSelect={setSelected} isExpanded={isSidebarExpanded} />
                <div 
                    className={`toggle-button ${window.innerWidth < 768 ? 'disabled' : ''}`} 
                    onClick={toggleSidebar} 
                    aria-label="Toggle Sidebar"
                >
                    {isSidebarExpanded ? <FaTimes /> : <FaBars />}
                </div>
                <div className={`content ${isSidebarExpanded ? '' : 'collapsed'}`}>
                    <MainContent selected={selected} />
                </div>
            </div>
        </div>
    );
};

export default Home;