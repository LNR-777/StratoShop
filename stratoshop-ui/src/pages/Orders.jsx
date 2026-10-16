import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Orders.css';

const Orders = () => {
    const { user, isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.userId) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const response = await api.get(`/orders/user/${user.userId}`);
            setOrders(response.data.data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Unable to load orders. Please sign in and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="orders-empty container section-padding animate-up">
                <div className="empty-state-card glass-card">
                    <ShoppingBag size={64} className="text-muted" />
                    <h2>Sign in to view orders</h2>
                    <p>Your order history is available after you log in.</p>
                    <Link to="/login" className="btn btn-primary glow">Sign in</Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="orders-loading container section-padding">
                <div className="loader"></div>
                <p>Loading your orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-empty container section-padding animate-up">
                <div className="empty-state-card glass-card">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-empty container section-padding animate-up">
                <div className="empty-state-card glass-card">
                    <ShoppingBag size={64} className="text-muted" />
                    <h2>No orders yet</h2>
                    <p>Your order history is empty. Browse the catalog to get started.</p>
                    <Link to="/" className="btn btn-primary glow">Explore Catalog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page container section-padding animate-up">
            <h1 className="page-title">Order <span className="text-gradient">History</span></h1>

            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card glass-card">
                        <div className="order-header">
                            <div className="order-info-group">
                                <span className="label">Order ID</span>
                                <span className="value">#{order.id}</span>
                            </div>
                            <div className="order-info-group">
                                <span className="label">Date</span>
                                <span className="value">{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}</span>
                            </div>
                            <div className="order-info-group">
                                <span className="label">Total</span>
                                <span className="value">${Number(order.totalAmount || 0).toFixed(2)}</span>
                            </div>
                            <div className={`order-status badge ${(order.status || 'confirmed').toLowerCase()}`}>
                                {order.status || 'CONFIRMED'}
                            </div>
                        </div>

                        <div className="order-items-preview">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="preview-item">
                                    <span className="item-name">{item.productName || `Product #${item.productId}`}</span>
                                    <span className="item-qty">x{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
