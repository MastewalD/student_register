import React from 'react';
import StudentList from "../pages/StudentList";
import StudentRegistration from "../pages/StudentRegistration";
import SignOut from '../pages/SignOut';
import Dashboard from '../pages/Dashboard';
import UpdateStudent from '../pages/UpdateStudent';


const MainContent = ({ selected, isSidebarExpanded }) => {
    const contentStyle = {
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: isSidebarExpanded ? 'calc(100vw - 300px)' : 'calc(100vw - 120px)',
        transition: 'width 0.3s ease', 
    };

    return (
        <div style={contentStyle}>
            {(() => {
                switch (selected) {
                    case 'dashboard':
                        return <Dashboard />;
                    case 'registerStudent':
                        return <StudentRegistration />;
                    case 'listStudent':
                        return <StudentList />;
                    case "settingS":
                        return <UpdateStudent />;
                    case 'logout':
                        return <SignOut />;
                    default:
                        return <h1>Welcome! Please select an option.</h1>;
                }
            })()}
        </div>
    );
};

export default MainContent;