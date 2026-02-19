import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Shield, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [msg, setMsg] = useState({ text: '', type: '' });
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleAction = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: '' });
        try {
            if (isLogin) {
                const res = await api.post('/auth/login', {
                    username: formData.username,
                    password: formData.password,
                });

                const authData = res.data.data;
                if (authData && authData.token) {
                    authLogin(authData.username, authData.token);
                    navigate('/');
                }
            } else {
                await api.post('/users/register', formData);
                setMsg({ text: 'Neural Profile Initialized. Please login.', type: 'success' });
                setIsLogin(true);
            }
        } catch (err) {
            setMsg({
                text: err.response?.data?.message || 'Access Denied. Check credentials.',
                type: 'error'
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="blur-blob one"></div>
                <div className="blur-blob two"></div>
            </div>

            <div className="auth-card-wrapper animate-up">
                <div className="auth-card glass">
                    <div className="auth-header">
                        <div className="auth-icon-circle">
                            {isLogin ? <Shield size={32} /> : <ShieldCheck size={32} />}
                        </div>
                        <h2>{isLogin ? 'Identity Link' : 'New Protocol'}</h2>
                        <p>{isLogin ? 'Sign in to access the Strato network.' : 'Initialize your cloud-native profile.'}</p>
                    </div>

                    <form onSubmit={handleAction} className="auth-form">
                        {!isLogin && (
                            <div className="input-group">
                                <label><Mail size={16} /> Email</label>
                                <input
                                    type="email"
                                    placeholder="user@strato.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label><User size={16} /> Username</label>
                            <input
                                type="text"
                                placeholder="lakhan"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label><Lock size={16} /> Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary auth-btn glow">
                            {isLogin ? 'Authorize Access' : 'Register Profile'} <ArrowRight size={18} />
                        </button>
                    </form>

                    {msg.text && (
                        <div className={`auth-feedback ${msg.type}`}>
                            {msg.text}
                        </div>
                    )}

                    <div className="auth-footer">
                        <span>{isLogin ? "No access key?" : "Profile already active?"}</span>
                        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                            {isLogin ? 'Create Profile' : 'Link Identity'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
