import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute'; 
import NotFound from "./pages/NotFound";

function App() {
    const [isGrayMode, setIsGrayMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('grayMode');
        if (savedMode === 'true') {
            setIsGrayMode(true);
        }
    }, []);

    const toggleGrayMode = () => {
        setIsGrayMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('grayMode', newMode);
            return newMode;
        });
    };

    return (
        <AuthProvider>
            <Router>
                <nav>
                    <Navbar toggleGrayMode={toggleGrayMode} isGrayMode={isGrayMode} />
                </nav>
                <div className={`app-container ${isGrayMode ? 'gray-mode' : 'light-mode'}`}>
                    <main>
                        <Routes>
                            <Route index element={<LandingPage />} />
                            <Route 
                                path='/home' 
                                element={<ProtectedRoute element={<Home />} />} 
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;