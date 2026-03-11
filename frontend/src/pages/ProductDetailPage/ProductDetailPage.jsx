import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft, FaHeart, FaExchangeAlt } from 'react-icons/fa';
import { productsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { getProductImage } from '../../utils/productImages';
import { toast } from 'react-toastify';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await productsAPI.getProduct(slug);
                setProduct(res.data);
            } catch { toast.error('Product not found'); }
            setLoading(false);
        };
        fetch();
    }, [slug]);

    const handleAddToCart = async () => {
        if (!user) return toast.info('Please login first');
        try {
            await addToCart(product.id, quantity);
            toast.success(`Added ${quantity} × ${product.name} to cart!`);
        } catch { toast.error('Failed to add to cart'); }
    };

    const handleWishlist = () => {
        if (isInWishlist(product.id)) removeFromWishlist(product.id);
        else addToWishlist(product);
    };

    const handleCompare = () => {
        if (isInCompare(product.id)) removeFromCompare(product.id);
        else addToCompare(product);
    };

    const renderStars = (r) => {
        const s = []; const f = Math.floor(r); const h = r % 1 >= 0.5;
        for (let i = 0; i < f; i++) s.push(<FaStar key={`f${i}`} />);
        if (h) s.push(<FaStarHalfAlt key="h" />);
        while (s.length < 5) s.push(<FaRegStar key={`e${s.length}`} className="star-empty" />);
        return s;
    };

    if (loading) return <div className="container py-5"><div className="skeleton" style={{ height: '400px' }} /></div>;
    if (!product) return <div className="container py-5"><h2>Product not found</h2></div>;



    return (
        <div className="detail-page">
            <div className="container">
                <Link to="/products" className="back-link"><FaArrowLeft /> Back to Products</Link>

                <div className="detail-grid">
                    <div className="detail-image card-base">
                        {product.discount_percent > 0 && (
                            <span className="badge-discount">{product.discount_percent}%</span>
                        )}
                        <img
                            src={getProductImage(product)} alt={product.name}
                            onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80`; }}
                        />
                    </div>
                    <div className="detail-info">
                        <span className="detail-category">{product.category_name}</span>
                        <h1>{product.name}</h1>
                        <p className="detail-brand">by <strong>{product.brand}</strong></p>
                        <div className="detail-rating">
                            <div className="star-rating">{renderStars(product.avg_rating)}</div>
                            <span>{product.avg_rating} ({product.review_count} reviews)</span>
                        </div>
                        <div className="detail-price card-base">
                            <span className="price-current">₹{parseFloat(product.final_price).toFixed(2)}</span>
                            {product.discount_price && <span className="price-original">₹{parseFloat(product.price).toFixed(2)}</span>}
                        </div>
                        <p className="detail-desc">{product.description}</p>

                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="spec-table">
                                <h4>Specifications</h4>
                                <table>
                                    <tbody>
                                        {Object.entries(product.specifications).map(([k, v]) => (
                                            <tr key={k}><td className="spec-key">{k}</td><td>{v}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="stock-info">
                            {product.stock > 0
                                ? <span className="in-stock">In Stock ({product.stock} available)</span>
                                : <span className="out-stock">Out of Stock</span>}
                        </div>

                        <div className="add-to-cart-row">
                            <div className="qty-controls">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FaMinus /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><FaPlus /></button>
                            </div>
                            <button className="btn-primary-custom btn-large" onClick={handleAddToCart} disabled={product.stock === 0}>
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                        <div className="action-buttons-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                className={`btn-outline-custom ${isInWishlist(product.id) ? 'active' : ''}`}
                                onClick={handleWishlist}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <FaHeart style={{ marginRight: '8px', color: isInWishlist(product.id) ? 'var(--danger)' : 'inherit' }} />
                                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                            <button
                                className={`btn-outline-custom ${isInCompare(product.id) ? 'active' : ''}`}
                                onClick={handleCompare}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <FaExchangeAlt style={{ marginRight: '8px', color: isInCompare(product.id) ? 'var(--primary)' : 'inherit' }} />
                                {isInCompare(product.id) ? 'Remove from Compare' : 'Compare'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="reviews-section card-base">
                    <h3>Customer Reviews</h3>
                    {product.reviews?.length === 0
                        ? <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
                        : product.reviews?.map(r => (
                            <div key={r.id} className="review-item">
                                <div className="review-header">
                                    <strong>{r.user_name}</strong>
                                    <div className="star-rating">{renderStars(r.rating)}</div>
                                    <small>{new Date(r.created_at).toLocaleDateString()}</small>
                                </div>
                                <p>{r.comment}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
