import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaArrowRight } from 'react-icons/fa';
import { ordersAPI } from '../../services/api';
import './OrderConfirmation.css';

export default function OrderConfirmationPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ordersAPI.getOrder(id).then(res => setOrder(res.data)).catch(() => { }).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="container py-5"><div className="skeleton" style={{ height: '300px' }} /></div>;

    return (
        <div className="confirmation-page">
            <div className="container">
                <div className="confirm-card card-base">
                    <FaCheckCircle className="confirm-icon" />
                    <h1>Order Confirmed!</h1>
                    <p className="confirm-msg">Thank you for your purchase. Your order has been placed successfully.</p>

                    {order && (
                        <div className="order-details">
                            <div className="detail-row"><span>Order Number</span><strong>#{order.id}</strong></div>
                            <div className="detail-row"><span>Date</span><strong>{new Date(order.created_at).toLocaleDateString()}</strong></div>
                            <div className="detail-row"><span>Status</span><span className="status-badge status-pending">{order.status}</span></div>
                            <div className="detail-row total"><span>Total</span><strong>₹{parseFloat(order.total).toFixed(2)}</strong></div>

                            {order.items && (
                                <div className="items-list">
                                    <h4><FaBox /> Items Ordered</h4>
                                    {order.items.map((item, i) => (
                                        <div key={i} className="order-item">
                                            <span>{item.product_name} × {item.quantity}</span>
                                            <span>₹{parseFloat(item.subtotal).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="confirm-actions">
                        <Link to="/products" className="btn-primary-custom">Continue Shopping <FaArrowRight /></Link>
                        <Link to="/dashboard" className="btn-outline-custom">View Orders</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
