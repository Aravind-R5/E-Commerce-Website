import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaPhoneAlt, FaHeart, FaExchangeAlt, FaLeaf, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';

import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cart, toggleCart } = useCart();
    const { wishlist } = useWishlist();
    const { compareList } = useCompare();

    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setMobileOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="site-header">
            {/* Main Header */}
            <div className="main-header">
                <div className="container">
                    <div className="header-inner">
                        <Link to="/" className="logo">
                            <FaLeaf className="logo-icon" />
                            <span className="logo-text">
                                <span className="logo-primary">NexGen</span>Gear
                            </span>
                        </Link>

                        <form className="header-search" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                <FaSearch />
                            </button>
                        </form>


                        <div className="header-actions">
                            <Link to="/compare" className="action-item">
                                <FaExchangeAlt />
                                <span>Compare</span>
                                {compareList.length > 0 && (
                                    <span className="cart-count">{compareList.length}</span>
                                )}
                            </Link>
                            <Link to="/wishlist" className="action-item">
                                <FaHeart />
                                <span>Wishlist</span>
                                {wishlist.length > 0 && (
                                    <span className="cart-count">{wishlist.length}</span>
                                )}
                            </Link>
                            {user && (
                                <button className="action-item cart-action" onClick={toggleCart}>
                                    <FaShoppingCart />
                                    <span>Cart</span>
                                    {cart.total_items > 0 && (
                                        <span className="cart-count">{cart.total_items}</span>
                                    )}
                                </button>
                            )}
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="action-item">
                                        <FaUser />
                                        <span style={{ textTransform: 'capitalize' }}>{user.username}</span>
                                    </Link>
                                    <button className="action-item" onClick={handleLogout} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="action-item">
                                    <FaUser />
                                    <span>Account</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Nav */}
            <nav className="category-nav">
                <div className="container">
                    <div className="cat-nav-inner">
                        <Link to="/products" className="browse-btn">
                            <FaBars /> Browse All Categories
                        </Link>
                        <div className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                            <Link to="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
                            <Link to="/products?category=gpu" onClick={() => setMobileOpen(false)}>Graphics Cards</Link>
                            <Link to="/products?category=cpu" onClick={() => setMobileOpen(false)}>Processors</Link>
                            <Link to="/products?category=keyboards" onClick={() => setMobileOpen(false)}>Keyboards</Link>
                            <Link to="/products?category=monitors" onClick={() => setMobileOpen(false)}>Monitors</Link>
                            <Link to="/products?category=ram" onClick={() => setMobileOpen(false)}>RAM</Link>
                            <Link to="/products?category=ssd" onClick={() => setMobileOpen(false)}>Storage</Link>
                            {user?.is_staff && (
                                <Link to="/admin" className="nav-admin-btn" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
                            )}
                        </div>
                        <div className="nav-phone">
                            <FaPhoneAlt />
                            <div>
                                <strong>1800 - 123 - 4567</strong>
                                <small>24/7 Support Center</small>
                            </div>
                        </div>
                        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
