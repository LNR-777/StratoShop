import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card group">
            <Link to={`/product/${product.id}`} className="card-image-wrapper">
                <div className="card-image-overlay"></div>
                <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    className="card-image"
                />
                <div className="card-quick-actions">
                    <div className="action-pill glass">
                        <Eye size={16} /> Quick View
                    </div>
                </div>
            </Link>

            <div className="card-body">
                <div className="card-meta">
                    <span className="card-category">{product.category}</span>
                    <div className="card-rating">
                        <span className="dot"></span> In Stock
                    </div>
                </div>

                <Link to={`/product/${product.id}`} className="card-title-link">
                    <h3 className="card-title">{product.name}</h3>
                </Link>

                <p className="card-excerpt">{product.description || 'Premium cloud-native hardware.'}</p>

                <div className="card-footer">
                    <div className="card-price-tag">
                        <span className="currency">$</span>
                        <span className="amount">{product.price.toString().split('.')[0]}</span>
                        <span className="decimal">.{product.price.toString().split('.')[1] || '00'}</span>
                    </div>
                    <button className="btn-add-cart glow-on-hover" title="Add to Cart">
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
