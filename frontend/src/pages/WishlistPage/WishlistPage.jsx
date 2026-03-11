import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FaTrash } from 'react-icons/fa';
import './WishlistPage.css';

export default function WishlistPage() {
    const { wishlist, clearWishlist } = useWishlist();

    return (
        <div className="wishlist-page">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>My Wishlist ({wishlist.length})</h2>
                    {wishlist.length > 0 && (
                        <button className="btn-outline-custom" onClick={clearWishlist}>
                            <FaTrash style={{ marginRight: '8px' }} /> Clear Wishlist
                        </button>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div className="wishlist-empty">
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you like in your wishlist to review them later.</p>
                        <Link to="/products" className="btn-primary-custom" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
