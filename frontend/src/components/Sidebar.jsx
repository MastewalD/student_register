import React, { useState } from 'react';
import './Sidebar.css'; 
import { MdDashboardCustomize } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { FaExpandAlt } from "react-icons/fa";
import { ImShrink2 } from "react-icons/im";

const Sidebar = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? <ImShrink2/> : <FaExpandAlt/>}
            </div>
            <div className='side'>
                <div>
                <MdDashboardCustomize />
                <button onClick={() => onSelect('dashboard')}>Dashboard</button>
                </div>
                <div>
                    <IoMdCreate/>
                    <button onClick={() => onSelect('registerStudent')}>Register Student</button>
                </div>
                <div>
                    <CiBoxList/>
                    <button onClick={() => onSelect('listStudent')}>List Student</button>
                </div>
                <div>
                    <CiSettings/>
                    <button onClick={() => onSelect('logout')}>Setting</button>
                </div>
                <div>
                    <MdDarkMode/>
                    <button onClick={() => onSelect('logout')}>DarkMode</button>
                </div>
                <div>
                    <CiLogout/>
                    <button onClick={() => onSelect('logout')}>Logout</button>
                </div>
                
            </div>
        </div>
    );
};

export default Sidebar;