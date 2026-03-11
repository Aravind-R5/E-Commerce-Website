import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaExchangeAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { getProductImage } from '../../utils/productImages';
import { toast } from 'react-toastify';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();

    const renderStars = (rating) => {
        const stars = [];
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        for (let i = 0; i < full; i++) stars.push(<FaStar key={`f${i}`} />);
        if (half) stars.push(<FaStarHalfAlt key="h" />);
        while (stars.length < 5) stars.push(<FaRegStar key={`e${stars.length}`} className="star-empty" />);
        return stars;
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            toast.info('Please login to add items to cart');
            return;
        }
        try {
            await addToCart(product.id);
            toast.success(`${product.name} added to cart!`);
        } catch {
            toast.error('Failed to add to cart');
        }
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleCompare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInCompare(product.id)) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product);
        }
    };

    return (
        <Link to={`/products/${product.slug}`} className="product-card-link">
            <div className="product-card card-base">
                {product.discount_percent > 0 && (
                    <span className="badge-discount">{product.discount_percent}%</span>
                )}
                <div className="product-image-wrapper">
                    <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                            e.target.src = `https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80`;
                        }}
                    />
                    <div className="product-actions-overlay">
                        <button
                            className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                            onClick={handleWishlist}
                            title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <FaHeart />
                        </button>
                        <button
                            className={`action-btn ${isInCompare(product.id) ? 'active' : ''}`}
                            onClick={handleCompare}
                            title={isInCompare(product.id) ? "Remove from Compare" : "Add to Compare"}
                        >
                            <FaExchangeAlt />
                        </button>
                    </div>
                </div>
                <div className="product-info">
                    <span className="product-category">{product.category_name}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                        <div className="star-rating">{renderStars(product.avg_rating)}</div>
                        <span className="review-count">({product.review_count})</span>
                    </div>
                    <div className="product-brand">By <span className="brand-name">{product.brand}</span></div>
                    <div className="product-bottom">
                        <div className="product-pricing">
                            <span className="current-price">
                                ₹{parseFloat(product.final_price).toFixed(2)}
                            </span>
                            {product.discount_price && (
                                <span className="original-price">
                                    ₹{parseFloat(product.price).toFixed(2)}
                                </span>
                            )}
                        </div>
                        <button className="btn-add-cart" onClick={handleAddToCart}>
                            <FaShoppingCart /> Add
                        </button>
                    </div>
                    {product.stock <= 5 && product.stock > 0 && (
                        <span className="low-stock">Only {product.stock} left!</span>
                    )}
                    {product.stock === 0 && (
                        <span className="out-of-stock">Out of Stock</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
