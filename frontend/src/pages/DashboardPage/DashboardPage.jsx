import { useState, useEffect } from 'react';
import { FaUser, FaBox, FaEdit, FaSave } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI } from '../../services/api';
import { toast } from 'react-toastify';
import './DashboardPage.css';

export default function DashboardPage() {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        first_name: user?.first_name || '', last_name: user?.last_name || '',
        phone: user?.phone || '', address: user?.address || '',
        city: user?.city || '', state: user?.state || '', zip_code: user?.zip_code || '',
    });

    useEffect(() => {
        if (activeTab === 'orders') {
            ordersAPI.getOrders().then(res => setOrders(res.data.results || res.data)).catch(() => { });
        }
    }, [activeTab]);

    const handleSave = async () => {
        try { await updateProfile(profile); setEditing(false); toast.success('Profile updated!'); }
        catch { toast.error('Update failed'); }
    };

    return (
        <div className="dashboard-page">
            <div className="container">
                <h1>My Account</h1>
                <div className="dash-tabs">
                    <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <FaUser /> Profile
                    </button>
                    <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        <FaBox /> Order History
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <div className="profile-section card-base">
                        <div className="profile-header">
                            <h3>Personal Information</h3>
                            <button className="btn-outline-custom btn-sm" onClick={() => editing ? handleSave() : setEditing(true)}>
                                {editing ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
                            </button>
                        </div>
                        <div className="profile-grid">
                            {['first_name', 'last_name', 'phone', 'address', 'city', 'state', 'zip_code'].map(field => (
                                <div key={field} className={`form-group ${field === 'address' ? 'full-width' : ''}`}>
                                    <label className="form-label">{field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</label>
                                    {editing ? (
                                        <input className="form-control" value={profile[field]}
                                            onChange={(e) => setProfile({ ...profile, [field]: e.target.value })} />
                                    ) : (
                                        <p className="profile-value">{profile[field] || '—'}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <p className="profile-value">{user?.email}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section card-base">
                        <h3>Order History</h3>
                        {orders.length === 0 ? (
                            <p className="no-data">No orders yet.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead><tr><th>Order #</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>
                                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td>{order.items?.length || 0} items</td>
                                                <td className="text-brand"><strong>₹{parseFloat(order.total).toFixed(2)}</strong></td>
                                                <td><span className={`status-badge status-${order.status}`}>{order.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
