import { FaMinus, FaPlus, FaTimes, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
    const { cart, cartOpen, toggleCart, updateQuantity, removeFromCart } = useCart();

    return (
        <>
            <div className={`cart-overlay ${cartOpen ? 'active' : ''}`} onClick={toggleCart} />
            <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3><FaShoppingBag /> Your Cart</h3>
                    <button className="drawer-close" onClick={toggleCart}><FaTimes /></button>
                </div>

                <div className="drawer-body">
                    {cart.items?.length === 0 ? (
                        <div className="empty-cart">
                            <FaShoppingBag className="empty-icon" />
                            <p>Your cart is empty</p>
                            <Link to="/products" className="btn-primary-custom" onClick={toggleCart}>
                                Start Shopping <FaArrowRight />
                            </Link>
                        </div>
                    ) : (
                        cart.items?.map((item) => {
                            const imageUrl = item.product_detail?.image?.startsWith('http')
                                ? item.product_detail.image
                                : `http://localhost:8000${item.product_detail?.image || ''}`;
                            return (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img
                                            src={imageUrl || `https://placehold.co/80x80/f4f6fa/3BB77E?text=Item`}
                                            alt={item.product_detail?.name || 'Product'}
                                            onError={(e) => {
                                                e.target.src = `https://placehold.co/80x80/f4f6fa/3BB77E?text=Item`;
                                            }}
                                        />
                                    </div>
                                    <div className="cart-item-info">
                                        <h4>{item.product_detail?.name}</h4>
                                        <span className="cart-item-price">₹{parseFloat(item.subtotal || 0).toFixed(2)}</span>
                                        <div className="qty-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <FaMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                                        <FaTimes />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {cart.items?.length > 0 && (
                    <div className="drawer-footer">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <strong>₹{parseFloat(cart.total_price || 0).toFixed(2)}</strong>
                        </div>
                        <Link to="/cart" className="btn-primary-custom view-cart-btn" onClick={toggleCart}>
                            View Cart <FaArrowRight />
                        </Link>
                        <Link to="/checkout" className="btn-outline-custom checkout-btn" onClick={toggleCart}>
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
