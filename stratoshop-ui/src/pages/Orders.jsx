import React, { useState, useEffect } from 'react';
import { Package, Calendar, Tag, ChevronRight, ShoppingBag } from 'lucide-react';
import api from '../services/api';
import './Orders.css';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="orders-loading container section-padding">
                <div className="loader"></div>
                <p>Retrieving order history from clusters...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-empty container section-padding animate-up">
                <div className="empty-state-card glass-card">
                    <ShoppingBag size={64} className="text-muted" />
                    <h2>No orders yet</h2>
                    <p>Your transaction history is clear. Ready to start shopping?</p>
                    <a href="/" className="btn btn-primary glow">Explore Catalog</a>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page container section-padding animate-up">
            <h1 className="page-title">Order <span className="text-gradient">History</span></h1>

            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.orderId} className="order-card glass-card">
                        <div className="order-header">
                            <div className="order-info-group">
                                <span className="label">Order ID</span>
                                <span className="value">#{order.orderId}</span>
                            </div>
                            <div className="order-info-group">
                                <span className="label">Date</span>
                                <span className="value">{new Date(order.orderDate).toLocaleDateString()}</span>
                            </div>
                            <div className="order-info-group">
                                <span className="label">Total</span>
                                <span className="value">${order.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className={`order-status badge ${order.status?.toLowerCase() || 'pending'}`}>
                                {order.status || 'Processed'}
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

                        <div className="order-footer">
                            <button className="btn-details">
                                View Details <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
