import { useState, useEffect } from 'react';
import { FaBox, FaUsers, FaShoppingBag, FaRupeeSign, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { productsAPI, ordersAPI, authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', slug: '', price: '', stock: '', category: '', brand: '', description: '' });

    useEffect(() => {
        productsAPI.getProducts({ page_size: 100 }).then(r => setProducts(r.data.results || r.data)).catch(() => { });
        productsAPI.getCategories().then(r => setCategories(r.data)).catch(() => { });
        ordersAPI.getAllOrders().then(r => setOrders(r.data.results || r.data)).catch(() => { });
        authAPI.getUsers?.().then(r => setUsers(r.data.results || r.data)).catch(() => { });
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try { await productsAPI.deleteProduct(id); setProducts(p => p.filter(x => x.id !== id)); toast.success('Deleted!'); }
        catch { toast.error('Delete failed'); }
    };

    const handleEdit = (prod) => {
        setEditId(prod.id);
        setForm({ name: prod.name, slug: prod.slug, price: prod.price, stock: prod.stock, category: prod.category, brand: prod.brand, description: prod.description });
        setShowForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editId) { await productsAPI.updateProduct(editId, form); toast.success('Updated!'); }
            else { await productsAPI.createProduct(form); toast.success('Created!'); }
            productsAPI.getProducts({ page_size: 100 }).then(r => setProducts(r.data.results || r.data));
            setShowForm(false); setEditId(null);
        } catch { toast.error('Save failed'); }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            await ordersAPI.updateOrderStatus(orderId, status); toast.success('Status updated!');
            ordersAPI.getAllOrders().then(r => setOrders(r.data.results || r.data));
        } catch { toast.error('Update failed'); }
    };

    const stats = [
        { icon: FaBox, label: 'Products', value: products.length, color: '#3BB77E' },
        { icon: FaShoppingBag, label: 'Orders', value: orders.length, color: '#F59758' },
        { icon: FaUsers, label: 'Users', value: users.length, color: '#67BCEE' },
        { icon: FaRupeeSign, label: 'Revenue', value: `₹${orders.reduce((s, o) => s + parseFloat(o.total || 0), 0).toFixed(0)}`, color: '#7E57C2' },
    ];

    return (
        <div className="admin-page">
            <div className="container">
                <h1>Admin Dashboard</h1>
                <div className="stats-grid">
                    {stats.map((s, i) => (
                        <div key={i} className="stat-card card-base" style={{ borderTop: `3px solid ${s.color}` }}>
                            <s.icon className="stat-icon" style={{ color: s.color }} />
                            <div><span className="stat-value">{s.value}</span><span className="stat-label">{s.label}</span></div>
                        </div>
                    ))}
                </div>

                <div className="dash-tabs">
                    {['products', 'orders', 'users'].map(t => (
                        <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                {activeTab === 'products' && (
                    <div className="card-base admin-section">
                        <div className="section-header">
                            <h3>Products</h3>
                            <button className="btn-primary-custom btn-sm" onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: '', slug: '', price: '', stock: '', category: '', brand: '', description: '' }); }}>
                                <FaPlus /> Add Product
                            </button>
                        </div>
                        {showForm && (
                            <form className="admin-form" onSubmit={handleSave}>
                                <div className="form-grid">
                                    <div className="form-group"><label className="form-label">Name</label><input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
                                    <div className="form-group"><label className="form-label">Slug</label><input className="form-control" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required /></div>
                                    <div className="form-group"><label className="form-label">Price</label><input className="form-control" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required /></div>
                                    <div className="form-group"><label className="form-label">Stock</label><input className="form-control" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required /></div>
                                    <div className="form-group"><label className="form-label">Brand</label><input className="form-control" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} /></div>
                                    <div className="form-group"><label className="form-label">Category</label>
                                        <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                            <option value="">Select</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group full-width"><label className="form-label">Description</label><textarea className="form-control" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="btn-primary-custom">{editId ? 'Update' : 'Create'}</button>
                                    <button type="button" className="btn-outline-custom" onClick={() => setShowForm(false)}>Cancel</button>
                                </div>
                            </form>
                        )}
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead><tr><th>Name</th><th>Brand</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td><strong>{p.name}</strong></td>
                                            <td>{p.brand}</td>
                                            <td className="text-brand">₹{parseFloat(p.price).toFixed(2)}</td>
                                            <td>{p.stock}</td>
                                            <td>
                                                <button className="action-btn edit" onClick={() => handleEdit(p)}><FaEdit /></button>
                                                <button className="action-btn delete" onClick={() => handleDelete(p.id)}><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="card-base admin-section">
                        <h3>Orders</h3>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead><tr><th>#</th><th>Customer</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id}>
                                            <td>#{o.id}</td>
                                            <td>{o.full_name || o.user_email || 'Customer'}</td>
                                            <td className="text-brand"><strong>₹{parseFloat(o.total).toFixed(2)}</strong></td>
                                            <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                                            <td>
                                                <select className="form-select form-select-sm" value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}>
                                                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="card-base admin-section">
                        <h3>Users</h3>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead><tr><th>Username</th><th>Email</th><th>Name</th><th>Role</th></tr></thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td><strong>{u.username}</strong></td>
                                            <td>{u.email}</td>
                                            <td>{u.first_name} {u.last_name}</td>
                                            <td><span className={`status-badge ${u.is_staff ? 'status-delivered' : 'status-processing'}`}>{u.is_staff ? 'Admin' : 'User'}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
