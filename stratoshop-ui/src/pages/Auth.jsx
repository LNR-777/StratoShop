import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ text: '', type: '' });
        const result = await login(formData.username, formData.password);
        if (result.success) {
            navigate('/');
        } else {
            setMsg({ text: result.message || 'Invalid username or password.', type: 'error' });
        }
        setLoading(false);
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
                            <Shield size={32} />
                        </div>
                        <h2>Sign in</h2>
                        <p>Access your StratoShop account.</p>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="input-group">
                            <label><User size={16} /> Username</label>
                            <input
                                type="text"
                                placeholder="enter username"
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

                        <button type="submit" className="btn btn-primary auth-btn glow" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'} <ArrowRight size={18} />
                        </button>
                    </form>

                    {msg.text && (
                        <div className={`auth-feedback ${msg.type}`}>
                            {msg.text}
                        </div>
                    )}

                    <div className="auth-footer">
                        <span>New here?</span>
                        <Link to="/register" className="toggle-btn">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
