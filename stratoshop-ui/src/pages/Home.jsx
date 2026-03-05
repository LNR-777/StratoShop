import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Filter, ShieldCheck, Zap, Globe } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data.data || response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([
                { id: 1, name: 'Quantum Laptop X1', price: 1299.99, category: 'Electronics', description: 'Next-gen computing power.' },
                { id: 2, name: 'Nebula Smartwatch', price: 199.99, category: 'Wearables', description: 'Your life, synced.' },
                { id: 3, name: 'Neural Headphones', price: 299.99, category: 'Audio', description: 'Pure sound, zero noise.' },
                { id: 4, name: 'Infinity Display', price: 499.99, category: 'Electronics', description: 'Beyond resolution.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="mesh-gradient"></div>
                <div className="container hero-container animate-up">
                    <div className="badge-wrapper">
                        <span className="hero-badge"><Sparkles size={14} /> The Next Evolution of Shopping</span>
                    </div>
                    <h1>Your Digital <span className="text-gradient">Experience</span> Reimagined</h1>
                    <p>Discover premium products powered by a high-performance cloud ecosystem. Seamless, secure, and built for the future of commerce.</p>
                    <div className="hero-cta">
                        <button className="btn btn-primary glow">
                            Shop Now <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-secondary">Watch Demo</button>
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
                            <span>Global Network</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="catalog-section container section-padding">
                <div className="section-header">
                    <div className="header-info">
                        <h2 className="section-title">New Arrivals</h2>
                        <p className="section-subtitle">Curated premium goods from our global microservices network.</p>
                    </div>
                    <div className="filter-controls glass">
                        <Filter size={18} />
                        <button className="active">All</button>
                        <button>Electronics</button>
                        <button>Audio</button>
                        <button>Wearables</button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="loader"></div>
                        <p>Loading your personalized catalog...</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
