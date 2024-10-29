// SignOut.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        
        navigate('/');
    };

    return (
        <div className="signout-container">
            <h2>Are you sure you want to sign out?</h2>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;