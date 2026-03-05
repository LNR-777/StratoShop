import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ text: '', type: '' });
        try {
            await api.post('/users/register', formData);
            setMsg({ text: 'Neural Profile Initialized. Redirecting to login...', type: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setMsg({
                text: err.response?.data?.message || 'Access Denied. Check credentials.',
                type: 'error'
            });
        } finally {
            setLoading(false);
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
                            <ShieldCheck size={32} />
                        </div>
                        <h2>New Protocol</h2>
                        <p>Initialize your cloud-native profile.</p>
                    </div>

                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="input-group">
                            <label><User size={16} /> Username</label>
                            <input
                                type="text"
                                placeholder="choose a username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

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

                        <button type="submit" className="btn btn-primary auth-btn glow" disabled={loading}>
                            {loading ? 'Initializing...' : 'Register Profile'} <ArrowRight size={18} />
                        </button>
                    </form>

                    {msg.text && (
                        <div className={`auth-feedback ${msg.type}`}>
                            {msg.text}
                        </div>
                    )}

                    <div className="auth-footer">
                        <span>Profile already active?</span>
                        <Link to="/login" className="toggle-btn">Link Identity</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
