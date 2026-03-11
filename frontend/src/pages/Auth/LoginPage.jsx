import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthPages.css';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            toast.success('Welcome back!');
            navigate('/');
        } catch { toast.error('Invalid credentials'); }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-card card-base">
                    <h2>Login</h2>
                    <p className="auth-subtitle">Welcome back! Please enter your details.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label"><FaEnvelope /> Email</label>
                            <input className="form-control" type="email" value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Your email" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FaLock /> Password</label>
                            <input className="form-control" type="password" value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Your password" required />
                        </div>
                        <button type="submit" className="btn-primary-custom auth-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'} <FaSignInAlt />
                        </button>
                    </form>
                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    <div className="demo-box">
                        <h4>Demo Credentials</h4>
                        <div className="demo-accounts">
                            <button className="demo-fill" onClick={() => setFormData({ email: 'admin@nexgengear.com', password: 'admin123' })}>
                                Admin: admin@nexgengear.com
                            </button>
                            <button className="demo-fill" onClick={() => setFormData({ email: 'demo@nexgengear.com', password: 'demo1234' })}>
                                User: demo@nexgengear.com
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
