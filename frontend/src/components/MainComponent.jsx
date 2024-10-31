import React from 'react';
import StudentList from "../pages/StudentList"
import StudentRegistration from "../pages/StudentRegistration"
import SignOut from '../pages/SignOut';
import Dashboard from '../pages/Dashboard';
import UpdateStudent from '../pages/UpdateStudent';
const MainContent = ({ selected }) => {
    switch (selected) {
        case 'dashboard':
            return <Dashboard/>;
        case 'registerStudent':
            return <StudentRegistration />;
        case 'listStudent':
            return <StudentList/>;
        case "settingS":
            return <UpdateStudent/>
        case 'logout':
            return <SignOut/>;
        default:
            return <h1>Welcome! Please select an option.</h1>;
    }
};

export default MainContent;