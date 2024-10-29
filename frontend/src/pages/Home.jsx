import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainComponent';
import './Home.css';

const Home = () => {
    const [selected, setSelected] = useState('dashboard');

    return (
        <div className="app-container">
            <div className='sidebar'>
                <Sidebar onSelect={setSelected} />
            </div>
            
            <div className="content">
                <MainContent selected={selected} />
            </div>
        </div>
    );
};

export default Home;