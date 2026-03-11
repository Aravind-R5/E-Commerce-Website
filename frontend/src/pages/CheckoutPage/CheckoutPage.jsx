import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ordersAPI } from '../../services/api';
import { toast } from 'react-toastify';
import './CheckoutPage.css';

export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart, fetchCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username : '',
        email: user?.email || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        zip_code: user?.zip_code || '',
        phone: user?.phone || '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.full_name || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zip_code) {
            return toast.error('Please fill all required fields');
        }
        setLoading(true);
        try {
            const res = await ordersAPI.checkout(formData);
            await fetchCart();
            toast.success('Order placed successfully!');
            navigate(`/order-confirmation/${res.data.id}`);
        } catch { toast.error('Checkout failed'); }
        setLoading(false);
    };

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>
                <div className="checkout-layout">
                    <form className="checkout-form card-base" onSubmit={handleSubmit}>
                        <h3><FaLock /> Shipping Information</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">Full Name *</label>
                                <input className="form-control" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="First and Last Name" required />
                            </div>
                            <div className="form-group full-width">
                                <label className="form-label">Email Address *</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                            </div>
                            <div className="form-group full-width">
                                <label className="form-label">Address *</label>
                                <input className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">City *</label>
                                <input className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">State *</label>
                                <input className="form-control" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">PIN Code *</label>
                                <input className="form-control" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="PIN Code" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
                            </div>
                        </div>
                    </form>

                    <div className="order-summary card-base">
                        <h3>Order Summary</h3>
                        {cart.items?.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.product_detail?.name} × {item.quantity}</span>
                                <span>₹{item.subtotal ? parseFloat(item.subtotal).toFixed(2) : '0.00'}</span>
                            </div>
                        ))}
                        <div className="summary-row"><span>Shipping</span><span className="free-ship">Free</span></div>
                        <div className="summary-total">
                            <strong>Total</strong>
                            <strong>₹{cart.total_price ? parseFloat(cart.total_price).toFixed(2) : '0.00'}</strong>
                        </div>
                        <button className="btn-primary-custom checkout-btn" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Placing Order...' : 'Place Order'} <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
