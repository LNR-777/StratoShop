import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-empty container section-padding animate-up">
                <div className="empty-state-card glass-card">
                    <ShoppingBag size={64} className="text-muted" />
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="btn btn-primary glow">Explore Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page container section-padding animate-up">
            <h1 className="page-title">Shopping <span className="text-gradient">Cart</span></h1>

            <div className="cart-grid">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item glass-card">
                            <img src={item.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-category text-muted">{item.category}</p>
                                <div className="item-controls">
                                    <div className="quantity-selector glass">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-btn text-muted">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    <button onClick={clearCart} className="btn-clear text-muted">Clear Shopping Cart</button>
                </div>

                <div className="cart-summary glass-card">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className="text-gradient">Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn btn-primary checkout-btn glow">
                        Proceed to Checkout <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
