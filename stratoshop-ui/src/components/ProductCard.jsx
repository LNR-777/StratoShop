import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const priceValue = Number(product.price);
    const [whole, decimal = '00'] = priceValue.toFixed(2).split('.');
    const stock = product.stockQuantity ?? 0;
    const stockLabel = stock === 0 ? 'Out of Stock' : stock <= 5 ? 'Low Stock' : 'In Stock';
    const stockClass = stock === 0 ? 'out-of-stock' : stock <= 5 ? 'low-stock' : 'in-stock';

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
                    <div className={`card-rating ${stockClass}`}>
                        <span className="dot"></span> {stockLabel}
                    </div>
                </div>

                <Link to={`/product/${product.id}`} className="card-title-link">
                    <h3 className="card-title">{product.name}</h3>
                </Link>

                <p className="card-excerpt">{product.description || 'Premium cloud-native hardware.'}</p>

                <div className="card-footer">
                    <div className="card-price-tag">
                        <span className="currency">$</span>
                        <span className="amount">{whole}</span>
                        <span className="decimal">.{decimal}</span>
                    </div>
                    <button
                        className="btn-add-cart glow-on-hover"
                        title={stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        onClick={() => addToCart(product)}
                        disabled={stock === 0}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
