import { Link } from 'react-router-dom';
import { FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            {/* Newsletter */}
            <div className="footer-newsletter">
                <div className="container">
                    <div className="newsletter-inner">
                        <div className="newsletter-content">
                            <h3>Stay home & get your daily needs from our shop</h3>
                            <p>Start Your Daily Shopping with NexGenGear</p>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); toast.success('Thanks for subscribing!'); e.target.reset(); }}>
                            <FaEnvelope className="newsletter-icon" />
                            <input type="email" placeholder="Your email address" required />
                            <button type="submit" className="btn-primary-custom">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col footer-brand">
                            <Link to="/" className="footer-logo">
                                <FaLeaf className="logo-icon" />
                                <span className="logo-text"><span className="logo-primary">NexGen</span>Gear</span>
                            </Link>
                            <p>Premium gaming hardware store with the best prices and fastest delivery.</p>
                            <ul className="footer-contact">
                                <li><FaMapMarkerAlt /> <span>123 Anna Salai, Chennai, Tamil Nadu 600002</span></li>
                                <li><FaPhoneAlt /> <span>+91 1800-123-4567</span></li>
                                <li><FaEnvelope /> <span>support@nexgengear.com</span></li>
                                <li><FaClock /> <span>Hours: 10:00 - 18:00, Mon - Sat</span></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/">About Us</Link></li>
                                <li><Link to="/">Delivery Information</Link></li>
                                <li><Link to="/">Privacy Policy</Link></li>
                                <li><Link to="/">Terms & Conditions</Link></li>
                                <li><Link to="/">Support Center</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Account</h4>
                            <ul>
                                <li><Link to="/login">Sign In</Link></li>
                                <li><Link to="/cart">View Cart</Link></li>
                                <li><Link to="/dashboard">My Account</Link></li>
                                <li><Link to="/dashboard">Track My Order</Link></li>
                                <li><Link to="/compare">Compare Products</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Categories</h4>
                            <ul>
                                <li><Link to="/products?category=gpu">Graphics Cards</Link></li>
                                <li><Link to="/products?category=cpu">Processors</Link></li>
                                <li><Link to="/products?category=ram">RAM</Link></li>
                                <li><Link to="/products?category=monitors">Monitors</Link></li>
                                <li><Link to="/products?category=keyboards">Keyboards</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Popular</h4>
                            <ul>
                                <li><Link to="/products?category=mice">Gaming Mice</Link></li>
                                <li><Link to="/products?category=ssd">Storage</Link></li>
                                <li><Link to="/products?category=chairs">Gaming Chairs</Link></li>
                                <li><Link to="/products?category=accessories">Accessories</Link></li>
                                <li><Link to="/products">All Products</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="bottom-inner">
                        <p>&copy; {new Date().getFullYear()} NexGenGear. All rights reserved.</p>
                        <div className="footer-socials">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
                        </div>
                        <p className="footer-right-text">
                            Up to 15% discount on your first order <Link to="/register">Subscribe</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
