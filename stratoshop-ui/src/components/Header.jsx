import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { getCartCount } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

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
                        <div className="dropdown-content glass">
                            <Link to="/category/electronics">Electronics</Link>
                            <Link to="/category/fashion">Fashion</Link>
                            <Link to="/category/home">Home & Living</Link>
                        </div>
                    </div>
                </nav>

                <div className="header-actions">
                    <form className="search-bar glass" onSubmit={handleSearch}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {isAuthenticated ? (
                        <div className="user-menu-wrapper">
                            <div className="user-profile glow-on-hover">
                                <div className="avatar">{user?.username ? user.username[0].toUpperCase() : 'U'}</div>
                                <span className="username-text">{user?.username}</span>
                                <div className="user-dropdown-nav glass">
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/orders">My Orders</Link>
                                    <button onClick={logout} className="logout-btn-inline">Logout</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary login-btn">
                            <User size={18} /> Login
                        </Link>
                    )}

                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingCart size={22} />
                        {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
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
