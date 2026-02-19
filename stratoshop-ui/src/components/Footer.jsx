import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer shadow-lg">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo">Strato<span>Shop</span></div>
                    <p>The premium cloud shopping experience.</p>
                </div>
                <div className="footer-links">
                    <h4>Platform</h4>
                    <a href="#">Security</a>
                    <a href="#">API docs</a>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 StratoShop. Built on Kubernetes.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
