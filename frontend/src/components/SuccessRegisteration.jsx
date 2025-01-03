import React from 'react';
import './SuccessRegisteration.css'; 
import {motion} from "framer-motion"

const SuccessRegisteration = () => {
    function handleClick(){
      window.location.reload()
    }
    return (
        <div className="container">
            <motion.div 
             initial={{ y: "-500px" }}
             animate={{ y: 0 }}
             transition={{ duration:1,  type: 'spring', stiffness: 220 }}>
                <div className="card">
                <h3>Registration Successful!</h3>
                <button onClick={handleClick}>
                Go to Dashboard
                </button >
                </div>
                </motion.div>
        </div>
    );
};

export default SuccessRegisteration;