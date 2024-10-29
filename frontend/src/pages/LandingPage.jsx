import React from 'react'
import {motion} from "framer-motion"
function LandingPage() {
  return (
    <div>
      <h1>this is landing page</h1>
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 ,x: 500}}
            exit={{ opacity: 0 }}
        >
            <h1> WELCOME TO, MD!</h1>
        </motion.div>
       
      <div>one</div>

    </div>
  )
}

export default LandingPage
