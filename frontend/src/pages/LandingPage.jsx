import React from 'react';
import "./Landing.css";
import { motion } from 'framer-motion';
import Signin from './Signin';
import educationeImage from '../assets/educations.jpg'; 

function LandingPage() {
    return (
        <div className='land'>
            <div className="image"  >
             <img src={educationeImage} alt="" />
            </div>
            <div className="login">
              <Signin />
              </div>
        </div>
    );
}

export default LandingPage;