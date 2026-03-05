import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Checkout.css';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        zip: '',
        cardNum: '',
        expiry: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            // Mapping frontend cart to backend OrderRequest
            const orderRequest = {
                userId: user?.userId || 1, // Use state-managed userId
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            await api.post('/orders', orderRequest);
            setOrderSuccess(true);
            clearCart();
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please check backend services.');
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="checkout-success container section-padding animate-up">
                <div className="success-card glass-card">
                    <CheckCircle2 size={80} className="text-gradient" />
                    <h1>Order Placed!</h1>
                    <p>Thank you for shopping with StratoShop. Your order is being processed across our cloud clusters.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary glow">Return Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page container section-padding animate-up">
            <h1 className="page-title">Secure <span className="text-gradient">Checkout</span></h1>

            <div className="checkout-grid">
                <div className="checkout-steps">
                    <div className={`checkout-step glass-card ${step === 1 ? 'active' : ''}`}>
                        <div className="step-header">
                            <Truck size={24} />
                            <h2>1. Shipping Information</h2>
                        </div>
                        {step === 1 && (
                            <div className="step-body animate-up">
                                <input type="text" name="address" placeholder="Shipping Address" onChange={handleInputChange} className="glass-input" />
                                <div className="input-row">
                                    <input type="text" name="city" placeholder="City" onChange={handleInputChange} className="glass-input" />
                                    <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} className="glass-input" />
                                </div>
                                <button className="btn btn-primary" onClick={() => setStep(2)}>Continue to Payment</button>
                            </div>
                        )}
                    </div>

                    <div className={`checkout-step glass-card ${step === 2 ? 'active' : ''}`}>
                        <div className="step-header">
                            <CreditCard size={24} />
                            <h2>2. Payment Method</h2>
                        </div>
                        {step === 2 && (
                            <div className="step-body animate-up">
                                <input type="text" name="cardNum" placeholder="Card Number" onChange={handleInputChange} className="glass-input" />
                                <div className="input-row">
                                    <input type="text" name="expiry" placeholder="MM/YY" onChange={handleInputChange} className="glass-input" />
                                    <input type="text" name="cvv" placeholder="CVV" onChange={handleInputChange} className="glass-input" />
                                </div>
                                <div className="payment-security">
                                    <ShieldCheck size={16} />
                                    <span>Encrypted & Secured</span>
                                </div>
                                <button
                                    className="btn btn-primary glow"
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Place Secure Order'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="order-review glass-card">
                    <h3>Review Your Order</h3>
                    <div className="review-items">
                        {cart.map(item => (
                            <div key={item.id} className="review-item">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="review-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Order Total</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
