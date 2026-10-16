import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Mail, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const ROLE_LABELS = {
    ADMIN: { label: 'Admin', color: '#f59e0b' },
    USER: { label: 'Customer', color: '#6366f1' },
};

const Profile = () => {
    const { user, logout } = useAuth();
    const roleInfo = ROLE_LABELS[user?.role] || { label: user?.role || 'User', color: '#6366f1' };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="blur-blob one"></div>
                <div className="blur-blob two"></div>
            </div>

            <div className="auth-card-wrapper animate-up" style={{ maxWidth: '480px' }}>
                <div className="auth-card glass">
                    <div className="auth-header">
                        <div className="auth-icon-circle" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                            {user?.username ? user.username[0].toUpperCase() : <User size={32} />}
                        </div>
                        <h2>{user?.username}</h2>
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '3px 14px',
                                borderRadius: '20px',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                background: `${roleInfo.color}22`,
                                color: roleInfo.color,
                                border: `1px solid ${roleInfo.color}44`,
                            }}
                        >
                            <Shield size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                            {roleInfo.label}
                        </span>
                    </div>

                    <div style={{ padding: '0 8px 16px' }}>
                        {user?.email && (
                            <div className="input-group" style={{ marginBottom: '12px' }}>
                                <label><Mail size={15} /> Email</label>
                                <p style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', margin: 0 }}>
                                    {user.email}
                                </p>
                            </div>
                        )}

                        <div className="input-group" style={{ marginBottom: '24px' }}>
                            <label><User size={15} /> Username</label>
                            <p style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', margin: 0 }}>
                                {user?.username}
                            </p>
                        </div>

                        <Link to="/orders" className="btn btn-primary auth-btn glow" style={{ marginBottom: '12px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                            <ShoppingBag size={18} /> View My Orders
                        </Link>

                        <button
                            onClick={logout}
                            className="auth-btn"
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 600 }}
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
