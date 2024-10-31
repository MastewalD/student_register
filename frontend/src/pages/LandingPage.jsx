import React, { useEffect, useState } from 'react';
import "./LandingPage.css";
import { motion } from 'framer-motion';
import Signin from './Signin';
import educationImage from '../assets/educations.jpg'; 

function LandingPage() {
    const [deviceType, setDeviceType] = useState('desktop');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDeviceType('mobile');
            } else if (window.innerWidth < 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className='land'>
                {deviceType !== 'mobile' && (
                    <motion.div  
                        initial={{ x: "-200px" }}
                        animate={{ x: 0 }}
                        transition={{ duration:0.5, type: 'spring', stiffness: 220 }}
                        className="image"
                    >
                        <img src={educationImage} alt="" />
                    </motion.div>
                )}
                <div className="login">
                    <div>
                    <motion.div
                        initial={{ x:"200px"}}
                        animate={{ x: 0 }}
                        transition={{type:'spring',stiffness:220}}
                    >
                        <Signin />
                    </motion.div>

                    </div>
                    
                </div>
            </div>
          
        </div>
    );
}

export default LandingPage;