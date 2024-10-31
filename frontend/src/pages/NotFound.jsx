import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 
import {motion} from "framer-motion"
import {useNavigate} from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
    function handleClick(){
        navigate("/")
    }
    return (
        <div className="container">
            <motion.div 
             initial={{ y: "-500px" }}
             animate={{ y: 0 }}
             transition={{ duration:1,  type: 'spring', stiffness: 220 }}>
                <div className="card">
                <h1 className="heading">404</h1>
                <p className="message">Oops! The page you are looking for does not exist.</p>
                <button onClick={handleClick}>
                Go back to Home
                </button >
                </div>
                </motion.div>
        </div>
    );
};

export default NotFound;