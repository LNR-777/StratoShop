import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const applySession = (authData) => {
        const userData = {
            username: authData.username,
            role: authData.role,
            userId: authData.userId,
        };
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const authData = response.data.data;
            if (!authData?.token) {
                return { success: false, message: 'Login failed' };
            }
            applySession(authData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const register = async (userData) => {
        try {
            await api.post('/users/register', userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
