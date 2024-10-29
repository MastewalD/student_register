// src/MainContent.js
import React from 'react';
import StudentList from "../pages/StudentList"
import StudentRegistration from "../pages/StudentRegistration"
const MainContent = ({ selected }) => {
    switch (selected) {
        case 'dashboard':
            return <h1>Dashboard Content</h1>;
        case 'registerStudent':
            return <StudentRegistration />;
        case 'listStudent':
            return <StudentList/>;
        case 'logout':
            return <h1>You have logged out.</h1>;
        default:
            return <h1>Welcome! Please select an option.</h1>;
    }
};

export default MainContent;