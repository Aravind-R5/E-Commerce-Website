import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthPages.css';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', email: '', first_name: '', last_name: '', password: '', password2: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) return toast.error('Passwords do not match');
        setLoading(true);
        try {
            await register(formData);
            toast.success('Account created!');
            navigate('/');
        } catch (err) { toast.error(err.response?.data?.email?.[0] || 'Registration failed'); }
        setLoading(false);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-card card-base">
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Join us for the best gaming deals!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label"><FaUser /> First Name</label>
                                <input className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First name" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last name" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FaUser /> Username</label>
                            <input className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FaEnvelope /> Email</label>
                            <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label"><FaLock /> Password</label>
                                <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input className="form-control" type="password" name="password2" value={formData.password2} onChange={handleChange} placeholder="Confirm" required />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary-custom auth-btn" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Account'} <FaUserPlus />
                        </button>
                    </form>
                    <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}
