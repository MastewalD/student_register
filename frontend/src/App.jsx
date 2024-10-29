import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from "./pages/Signin";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    // Check if the user is logged in by looking for a token in local storage
    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
        <Router>
            <nav>
                <Navbar />
            </nav>
            <div className="app-container">
                <main>
                    <Routes>
                        <Route index element={<LandingPage />} />
                        <Route 
                            path='/home' 
                            element={isLoggedIn ? <Home /> : <Navigate to="/" />} // Redirect to landing page if not logged in
                        />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/signin' element={<Signin />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </Router>
    );
}

export default App;