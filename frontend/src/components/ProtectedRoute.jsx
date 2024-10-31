import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem('token') !== null;

    return isLoggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;