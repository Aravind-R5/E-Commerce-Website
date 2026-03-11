import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('access_token', res.data.access);
                    if (res.data.refresh) {
                        localStorage.setItem('refresh_token', res.data.refresh);
                    }
                    originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register/', data),
    login: (data) => api.post('/auth/login/', data),
    getProfile: () => api.get('/auth/profile/'),
    updateProfile: (data) => api.put('/auth/profile/', data),
    getUsers: () => api.get('/auth/users/'),
};

// Products API
export const productsAPI = {
    getProducts: (params) => api.get('/products/', { params }),
    getProduct: (slug) => api.get(`/products/${slug}/`),
    getFeatured: () => api.get('/products/featured/'),
    getCategories: () => api.get('/categories/'),
    getBrands: () => api.get('/products/brands/'),
    addReview: (productId, data) => api.post(`/products/${productId}/reviews/`, data),
    // Admin
    createProduct: (data) => api.post('/admin/products/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    updateProduct: (id, data) => api.put(`/admin/products/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    deleteProduct: (id) => api.delete(`/admin/products/${id}/`),
};

// Cart API
export const cartAPI = {
    getCart: () => api.get('/cart/'),
    addToCart: (productId, quantity = 1) => api.post('/cart/add/', { product_id: productId, quantity }),
    updateItem: (itemId, quantity) => api.put(`/cart/update/${itemId}/`, { quantity }),
    removeItem: (itemId) => api.delete(`/cart/remove/${itemId}/`),
    clearCart: () => api.delete('/cart/clear/'),
};

// Orders API
export const ordersAPI = {
    checkout: (data) => api.post('/checkout/', data),
    getOrders: () => api.get('/orders/'),
    getOrder: (id) => api.get(`/orders/${id}/`),
    // Admin
    getAllOrders: () => api.get('/admin/orders/'),
    updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/`, { status }),
};

export default api;
