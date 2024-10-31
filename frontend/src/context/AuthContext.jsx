import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, setToken, removeToken } from '../utils/auth'; // Utility functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};