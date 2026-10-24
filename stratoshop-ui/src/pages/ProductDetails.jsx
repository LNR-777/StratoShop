import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, Box, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleQuantity = (val) => {
        if (val < 1) return;
        if (product?.stockQuantity && val > product.stockQuantity) return;
        setQuantity(val);
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    const fetchProduct = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data.data || res.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Product not found or backend is unavailable.');
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="loading-state full-height">
            <div className="loader"></div>
            <p>Loading product details...</p>
        </div>
    );

    if (error || !product) return (
        <div className="loading-state full-height">
            <p>{error || 'Product not found.'}</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">Back to Shop</button>
        </div>
    );

    const inStock = product.stockQuantity > 0;
    const priceValue = Number(product.price);
    const [whole, decimal = '00'] = priceValue.toFixed(2).split('.');

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
                                src={product.imageUrl}
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
                                <span className="val">{whole}</span>
                                <span className="dec">.{decimal}</span>
                            </div>
                        </div>

                        <p className="details-desc">{product.description}</p>

                        <div className="spec-grid">
                            <div className="spec-item glass">
                                <Box size={20} />
                                <div className="spec-label">Category</div>
                                <div className="spec-val">{product.category}</div>
                            </div>
                            <div className="spec-item glass">
                                <ShieldCheck size={20} />
                                <div className="spec-label">Availability</div>
                                <div className="spec-val">{inStock ? 'In Stock' : 'Out of Stock'}</div>
                            </div>
                        </div>

                        <div className="stock-banner">
                            <ShieldCheck size={18} />
                            <span>{inStock ? `${product.stockQuantity} units available.` : 'Currently out of stock.'}</span>
                        </div>

                        <div className="action-row">
                            <div className="quantity-selector-large glass">
                                <button onClick={() => handleQuantity(quantity - 1)} disabled={!inStock}><Minus size={18} /></button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantity(quantity + 1)} disabled={!inStock}><Plus size={18} /></button>
                            </div>
                            <button
                                className="btn btn-primary buy-btn-large glow"
                                onClick={handleAddToCart}
                                disabled={!inStock}
                            >
                                <ShoppingCart size={22} /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
