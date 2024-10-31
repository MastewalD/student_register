import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import './SignOut.css'; 

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="signout-container">
            <motion.div 
                className="signout-card"
                initial={{ y: "-500px" }}
                animate={{ y: 0 }}
                transition={{ duration:1,  type: 'spring', stiffness: 220 }} > 
            <h2 className='h2'>
            Are you sure you want to log out?
            </h2>
               
                  
        
                <button onClick={handleSignOut} className="logout">Log Out</button>
            </motion.div>
        </div>
    );
};

export default SignOut;