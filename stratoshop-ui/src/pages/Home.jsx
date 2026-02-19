import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
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
                        <span className="hero-badge"><Sparkles size={14} /> Powered by Kubernetes</span>
                    </div>
                    <h1>The Future of <span className="text-gradient">Commerce</span> is Here</h1>
                    <p>Experience the ultimate cloud-native shopping ecosystem. High-performance microservices, premium goods, and a state-of-the-art interface.</p>
                    <div className="hero-cta">
                        <button className="btn btn-primary glow">
                            Explore Catalog <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-secondary">System Status</button>
                    </div>
                </div>
            </section>

            <section className="catalog-section container">
                <div className="section-header">
                    <div className="header-info">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Curated premium goods from our global cloud network.</p>
                    </div>
                    <div className="filter-controls glass">
                        <Filter size={18} />
                        <button className="active">All</button>
                        <button>Electronics</button>
                        <button>Audio</button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="loader"></div>
                        <p>Syncing catalog across clusters...</p>
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
