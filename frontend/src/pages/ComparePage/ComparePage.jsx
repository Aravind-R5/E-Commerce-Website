import { Link } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { getProductImage } from '../../utils/productImages';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ComparePage.css';

export default function ComparePage() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const { addToCart } = useCart();

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product.id);
            toast.success(`${product.name} added to cart!`);
        } catch {
            toast.error('Failed to add to cart');
        }
    };

    return (
        <div className="compare-page">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>Compare Products ({compareList.length}/4)</h2>
                    {compareList.length > 0 && (
                        <button className="btn-outline-custom" onClick={clearCompare}>
                            <FaTrash style={{ marginRight: '8px' }} /> Clear All
                        </button>
                    )}
                </div>

                {compareList.length === 0 ? (
                    <div className="compare-empty">
                        <h2>No products to compare</h2>
                        <p>Add up to 4 products to compare their features side-by-side.</p>
                        <Link to="/products" className="btn-primary-custom" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="compare-table-container">
                        <table className="compare-table">
                            <tbody>
                                {/* Header Row */}
                                <tr>
                                    <td className="feature-label">Product</td>
                                    {compareList.map(product => (
                                        <td key={`header-${product.id}`}>
                                            <div className="compare-product-header">
                                                <img
                                                    src={getProductImage(product)}
                                                    alt={product.name}
                                                    onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80`; }}
                                                />
                                                <h4>
                                                    <Link to={`/products/${product.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {product.name}
                                                    </Link>
                                                </h4>
                                                <button className="compare-remove-btn" onClick={() => removeFromCompare(product.id)}>
                                                    <FaTrash /> Remove
                                                </button>
                                            </div>
                                        </td>
                                    ))}
                                    {/* Fill empty spots to keep columns consistent */}
                                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                                        <td key={`empty-header-${i}`}>
                                            <div className="compare-product-header" style={{ opacity: 0.5 }}>
                                                <div style={{ width: '100%', height: '150px', background: '#f5f5f5', borderRadius: '8px' }}></div>
                                                <h4>Empty slot</h4>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Price Row */}
                                <tr>
                                    <td className="feature-label">Price</td>
                                    {compareList.map(product => (
                                        <td key={`price-${product.id}`}>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                                ₹{parseFloat(product.final_price).toFixed(2)}
                                            </div>
                                            {product.discount_price && (
                                                <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                                                    ₹{parseFloat(product.price).toFixed(2)}
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                    {Array.from({ length: 4 - compareList.length }).map((_, i) => <td key={`empty-price-${i}`}>-</td>)}
                                </tr>

                                {/* Brand Row */}
                                <tr>
                                    <td className="feature-label">Brand</td>
                                    {compareList.map(product => (
                                        <td key={`brand-${product.id}`}>{product.brand}</td>
                                    ))}
                                    {Array.from({ length: 4 - compareList.length }).map((_, i) => <td key={`empty-brand-${i}`}>-</td>)}
                                </tr>

                                {/* Category Row */}
                                <tr>
                                    <td className="feature-label">Category</td>
                                    {compareList.map(product => (
                                        <td key={`cat-${product.id}`}>{product.category_name}</td>
                                    ))}
                                    {Array.from({ length: 4 - compareList.length }).map((_, i) => <td key={`empty-cat-${i}`}>-</td>)}
                                </tr>

                                {/* Rating Row */}
                                <tr>
                                    <td className="feature-label">Rating</td>
                                    {compareList.map(product => (
                                        <td key={`rating-${product.id}`}>
                                            ⭐ {product.avg_rating} ({product.review_count} reviews)
                                        </td>
                                    ))}
                                    {Array.from({ length: 4 - compareList.length }).map((_, i) => <td key={`empty-rating-${i}`}>-</td>)}
                                </tr>

                                {/* Action Row */}
                                <tr>
                                    <td className="feature-label">Action</td>
                                    {compareList.map(product => (
                                        <td key={`action-${product.id}`}>
                                            <button
                                                className="btn-primary-custom"
                                                onClick={() => handleAddToCart(product)}
                                                disabled={product.stock === 0}
                                                style={{ width: '100%' }}
                                            >
                                                <FaShoppingCart /> Add
                                            </button>
                                        </td>
                                    ))}
                                    {Array.from({ length: 4 - compareList.length }).map((_, i) => <td key={`empty-action-${i}`}></td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
