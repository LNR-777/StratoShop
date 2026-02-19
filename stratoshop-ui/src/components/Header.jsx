import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled glass' : ''}`}>
            <div className="container header-content">
                <Link to="/" className="logo">
                    Strato<span>Shop</span>
                </Link>

                <nav className="nav-links">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Catalog</Link>
                    <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Orders</Link>
                    <div className="nav-dropdown">
                        <span>Explore <ChevronDown size={14} /></span>
                    </div>
                </nav>

                <div className="header-actions">
                    <div className="search-bar glass">
                        <Search size={18} />
                        <input type="text" placeholder="Search products..." />
                    </div>

                    {isAuthenticated ? (
                        <div className="user-menu-wrapper">
                            <div className="user-profile glow-on-hover">
                                <div className="avatar">{user ? user[0].toUpperCase() : 'U'}</div>
                                <span>{user}</span>
                            </div>
                            <button onClick={logout} className="icon-btn logout-btn" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary login-btn">
                            <User size={18} /> Login
                        </Link>
                    )}

                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingCart size={22} />
                        <span className="badge">0</span>
                    </Link>

                    <button className="icon-btn menu-btn">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
