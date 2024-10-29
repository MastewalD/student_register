import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from "./pages/Signin"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
