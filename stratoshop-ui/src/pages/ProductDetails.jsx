import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, Box, Info, Cpu } from 'lucide-react';
import api from '../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data.data || res.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setProduct({
                id,
                name: 'Quantum Laptop X1',
                price: 1299.99,
                category: 'Electronics',
                description: 'Experience unparalleled computing power with the Quantum X1. Featuring a 16-core neural processor and a vibrant Infinity-O display, this is the ultimate tool for developers and designers.',
                stockQuantity: 42
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="loading-state full-height">
            <div className="loader"></div>
            <p>Synchronizing Neural Link...</p>
        </div>
    );

    return (
        <div className="details-container animate-up">
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-btn-pill">
                    <ArrowLeft size={16} /> Back to Catalog
                </button>

                <div className="details-layout">
                    <div className="details-gallery glass">
                        <div className="main-image-wrapper">
                            <img
                                src={product.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'}
                                alt={product.name}
                            />
                        </div>
                    </div>

                    <div className="details-content">
                        <div className="details-header">
                            <span className="badge-details">{product.category}</span>
                            <h1>{product.name}</h1>
                            <div className="price-tag-large">
                                <span className="cur">$</span>
                                <span className="val">{product.price.toString().split('.')[0]}</span>
                                <span className="dec">.{product.price.toString().split('.')[1] || '00'}</span>
                            </div>
                        </div>

                        <p className="details-desc">{product.description || 'Premium cloud-native hardware, engineered for the next generation of digital excellence.'}</p>

                        <div className="spec-grid">
                            <div className="spec-item glass">
                                <Cpu size={20} />
                                <div className="spec-label">Process</div>
                                <div className="spec-val">Neural Engine</div>
                            </div>
                            <div className="spec-item glass">
                                <Box size={20} />
                                <div className="spec-label">Availability</div>
                                <div className="spec-val">In Stock</div>
                            </div>
                        </div>

                        <div className="stock-banner">
                            <ShieldCheck size={18} />
                            <span>{product.stockQuantity} nodes currently active in local cluster.</span>
                        </div>

                        <div className="action-row">
                            <button className="btn btn-primary buy-btn-large glow">
                                <ShoppingCart size={22} /> Add to Collection
                            </button>
                            <button className="btn btn-secondary wishlist-btn">
                                <Info size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
