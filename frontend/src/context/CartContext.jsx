import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [], total_price: 0, total_items: 0 });
    const [cartOpen, setCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        if (!user) {
            setCart({ items: [], total_price: 0, total_items: 0 });
            return;
        }
        try {
            setLoading(true);
            const res = await cartAPI.getCart();
            setCart(res.data);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (productId, quantity = 1) => {
        const res = await cartAPI.addToCart(productId, quantity);
        setCart(res.data);
        setCartOpen(true);
        return res.data;
    };

    const updateQuantity = async (itemId, quantity) => {
        const res = await cartAPI.updateItem(itemId, quantity);
        setCart(res.data);
        return res.data;
    };

    const removeFromCart = async (itemId) => {
        const res = await cartAPI.removeItem(itemId);
        setCart(res.data);
        return res.data;
    };

    const clearCart = async () => {
        const res = await cartAPI.clearCart();
        setCart(res.data);
        return res.data;
    };

    const toggleCart = () => setCartOpen(prev => !prev);
    const closeCart = () => setCartOpen(false);

    return (
        <CartContext.Provider value={{
            cart, loading, cartOpen, addToCart, updateQuantity,
            removeFromCart, clearCart, toggleCart, closeCart, fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
