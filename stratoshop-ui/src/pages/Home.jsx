import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from 'lucide-react';
import Catalog from './Catalog';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="mesh-gradient"></div>
                <div className="container hero-container animate-up">
                    <div className="badge-wrapper">
                        <span className="hero-badge"><Sparkles size={14} /> Premium Online Shopping</span>
                    </div>
                    <h1>Shop Trusted <span className="text-gradient">Brands</span> With Confidence</h1>
                    <p>Electronics, fashion, and home essentials with real product details, clear pricing, and secure checkout.</p>
                    <div className="hero-cta">
                        <a href="#catalog" className="btn btn-primary glow">
                            Browse Catalog <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="hero-highlights">
                        <div className="highlight-item">
                            <ShieldCheck size={20} />
                            <span>Secure Payment</span>
                        </div>
                        <div className="highlight-item">
                            <Zap size={20} />
                            <span>Fast Delivery</span>
                        </div>
                        <div className="highlight-item">
                            <Globe size={20} />
                            <span>Trusted Brands</span>
                        </div>
                    </div>
                </div>
            </section>

            <div id="catalog">
                <Catalog />
            </div>
        </div>
    );
};

export default Home;
