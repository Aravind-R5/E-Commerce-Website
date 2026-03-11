import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTimes, FaShoppingBag, FaArrowRight, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart } = useCart();

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-state card-base">
                        <FaShoppingBag className="empty-icon" />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything yet.</p>
                        <Link to="/products" className="btn-primary-custom">
                            Continue Shopping <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1>Your Cart</h1>
                <div className="cart-layout">
                    <div className="cart-items">
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map(item => {
                                    const img = item.product_detail?.image?.startsWith('http')
                                        ? item.product_detail.image
                                        : `http://localhost:8000${item.product_detail?.image || ''}`;
                                    return (
                                        <tr key={item.id}>
                                            <td className="product-cell">
                                                <div className="cart-product">
                                                    <img src={img || 'https://placehold.co/80x80/f4f6fa/3BB77E?text=Item'} alt={item.product_detail?.name || 'Product'}
                                                        onError={(e) => { e.target.src = 'https://placehold.co/80x80/f4f6fa/3BB77E?text=Item'; }} />
                                                    <span>{item.product_detail?.name}</span>
                                                </div>
                                            </td>
                                            <td>₹{parseFloat(item.product_detail?.final_price || 0).toFixed(2)}</td>
                                            <td>
                                                <div className="qty-controls">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FaMinus /></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FaPlus /></button>
                                                </div>
                                            </td>
                                            <td className="subtotal-cell">₹{parseFloat(item.subtotal || 0).toFixed(2)}</td>
                                            <td>
                                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="order-summary card-base">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Items ({cart.total_items})</span>
                            <span>₹{parseFloat(cart.total_price || 0).toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free-ship">Free</span>
                        </div>
                        <div className="summary-total">
                            <strong>Total</strong>
                            <strong>₹{parseFloat(cart.total_price || 0).toFixed(2)}</strong>
                        </div>
                        <Link to="/checkout" className="btn-primary-custom checkout-btn">
                            Proceed to Checkout <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
