import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShippingFast, FaShieldAlt, FaHeadset, FaPercent, FaGamepad, FaMicrochip, FaMemory, FaDesktop, FaKeyboard, FaMouse, FaChair, FaHdd, FaWrench } from 'react-icons/fa';
import { productsAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import { toast } from 'react-toastify';
import './HomePage.css';

const CATEGORY_ICONS = {
    'gpu': FaGamepad,
    'cpu': FaMicrochip,
    'ram': FaMemory,
    'monitors': FaDesktop,
    'keyboards': FaKeyboard,
    'mice': FaMouse,
    'chairs': FaChair,
    'ssd': FaHdd,
    'accessories': FaWrench,
};

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    productsAPI.getCategories(),
                    productsAPI.getProducts({ page_size: 10, ordering: '-created_at' })
                ]);
                setCategories(catRes.data);
                setFeaturedProducts(prodRes.data.results || prodRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <p className="hero-badge">Gaming Gear Sale</p>
                            <h1>Premium Gaming<br /><span className="text-brand">Hardware Store</span></h1>
                            <p className="hero-desc">
                                Sign up for the daily newsletter and get the best deals on gaming components.
                            </p>
                            <form className="hero-subscribe" onSubmit={(e) => { e.preventDefault(); toast.success('Thanks for subscribing!'); e.target.reset(); }}>
                                <input type="email" placeholder="Your email address" required />
                                <button type="submit" className="btn-primary-custom">Subscribe</button>
                            </form>
                        </div>
                        <div className="hero-image">
                            <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80" alt="Gaming Setup" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="features-bar">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <FaPercent className="feature-icon" />
                            <div>
                                <h4>Best Prices & Offers</h4>
                                <p>Orders ₹500 or more</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <FaShippingFast className="feature-icon" />
                            <div>
                                <h4>Free Delivery</h4>
                                <p>On orders over ₹1,000</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <FaShieldAlt className="feature-icon" />
                            <div>
                                <h4>Great Daily Deal</h4>
                                <p>Save up to 25% off</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <FaHeadset className="feature-icon" />
                            <div>
                                <h4>24/7 Support</h4>
                                <p>Expert gaming assistance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Products */}
            <section className="popular-products">
                <div className="container">
                    <div className="section-head">
                        <h2 className="section-title">Popular Products</h2>
                        <div className="category-tabs">
                            <Link to="/products" className="tab active">All</Link>
                            {categories.slice(0, 6).map(cat => (
                                <Link key={cat.id} to={`/products?category=${cat.slug}`} className="tab">
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="products-grid">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '360px' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.slice(0, 10).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Category Grid */}
            <section className="category-section">
                <div className="container">
                    <h2 className="section-title">Shop by Category</h2>
                    <div className="category-grid">
                        {categories.map(cat => {
                            const Icon = CATEGORY_ICONS[cat.slug] || FaWrench;
                            return (
                                <Link key={cat.id} to={`/products?category=${cat.slug}`} className="category-card card-base">
                                    <Icon className="cat-icon" />
                                    <h4>{cat.name}</h4>
                                    <span>{cat.product_count} Products</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Promo Banners */}
            <section className="promo-section">
                <div className="container">
                    <div className="promo-grid">
                        <div className="promo-card promo-green">
                            <div className="promo-text">
                                <h3>Everyday Fresh & Clean with Our Products</h3>
                                <Link to="/products" className="btn-primary-custom btn-sm">Shop Now <FaArrowRight /></Link>
                            </div>
                            <div className="promo-image">
                                <img src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80" alt="Gaming Keyboard" />
                            </div>
                        </div>
                        <div className="promo-card promo-orange">
                            <div className="promo-text">
                                <h3>Level Up Your Gaming Setup Today</h3>
                                <Link to="/products" className="btn-primary-custom btn-sm">Shop Now <FaArrowRight /></Link>
                            </div>
                            <div className="promo-image">
                                <img src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&q=80" alt="Gaming PC" />
                            </div>
                        </div>
                        <div className="promo-card promo-blue">
                            <div className="promo-text">
                                <h3>The Best Gaming Hardware Online</h3>
                                <Link to="/products" className="btn-primary-custom btn-sm">Shop Now <FaArrowRight /></Link>
                            </div>
                            <div className="promo-image">
                                <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80" alt="Gaming Monitor" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
