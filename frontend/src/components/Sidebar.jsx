import React from 'react';
import './Sidebar.css'; 
import { MdDashboardCustomize } from "react-icons/md";
import { CiBoxList, CiLogout, CiSettings } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";

const Sidebar = ({ onSelect, isExpanded }) => {
    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className='side'>
                <div className="sidebar-item" onClick={() => onSelect('dashboard')}>
                    <MdDashboardCustomize />
                    {isExpanded && <span>Dashboard</span>}
                </div>
                <div className="sidebar-item" onClick={() => onSelect('registerStudent')}>
                    <IoMdCreate />
                    {isExpanded && <span>Register Student</span>}
                </div>
                <div className="sidebar-item" onClick={() => onSelect('listStudent')}>
                    <CiBoxList />
                    {isExpanded && <span>List Student</span>}
                </div>
                <div className="sidebar-item" onClick={() => onSelect('settingS')}>
                    <CiSettings />
                    {isExpanded && <span>Settings</span>}
                </div>
                <div className="sidebar-item" onClick={() => onSelect('logout')}>
                    <CiLogout />
                    {isExpanded && <span>Logout</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;