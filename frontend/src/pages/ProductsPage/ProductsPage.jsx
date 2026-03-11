import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown } from 'react-icons/fa';
import { productsAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductsPage.css';

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [mobileFilter, setMobileFilter] = useState(false);

    const currentPage = parseInt(searchParams.get('page') || '1');
    const currentCategory = searchParams.get('category') || '';
    const currentBrand = searchParams.get('brand') || '';
    const currentSearch = searchParams.get('search') || '';
    const currentSort = searchParams.get('ordering') || '-created_at';

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    productsAPI.getCategories(),
                    productsAPI.getBrands()
                ]);
                setCategories(catRes.data);
                setBrands(brandRes.data);
            } catch (err) { console.error(err); }
        };
        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {
                    page: currentPage,
                    page_size: 12,
                    ordering: currentSort
                };
                if (currentCategory) params.category = currentCategory;
                if (currentBrand) params.brand = currentBrand;
                if (currentSearch) params.search = currentSearch;
                const res = await productsAPI.getProducts(params);
                setProducts(res.data.results || res.data);
                setTotalPages(Math.ceil((res.data.count || 0) / 12));
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        fetchProducts();
    }, [currentPage, currentCategory, currentBrand, currentSearch, currentSort]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) { params.set(key, value); } else { params.delete(key); }
        params.delete('page');
        setSearchParams(params);
    };

    const setPage = (page) => {
        const params = new URLSearchParams(searchParams);
        if (page > 1) { params.set('page', page); } else { params.delete('page'); }
        setSearchParams(params);
    };

    return (
        <div className="products-page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        {currentCategory
                            ? categories.find(c => c.slug === currentCategory)?.name || 'Products'
                            : currentSearch ? `Search: "${currentSearch}"` : 'All Products'}
                    </h1>
                    <div className="header-controls">
                        <div className="sort-wrapper">
                            <FaSortAmountDown className="sort-icon" />
                            <select
                                className="form-select sort-select"
                                value={currentSort}
                                onChange={(e) => updateFilter('ordering', e.target.value)}
                            >
                                <option value="-created_at">Newest First</option>
                                <option value="price">Price: Low to High</option>
                                <option value="-price">Price: High to Low</option>
                                <option value="-avg_rating">Top Rated</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>
                        <button className="filter-toggle" onClick={() => setMobileFilter(!mobileFilter)}>
                            <FaFilter /> Filters
                        </button>
                    </div>
                </div>

                <div className="products-layout">
                    <aside className={`filter-sidebar ${mobileFilter ? 'open' : ''}`}>
                        <div className="filter-header-mobile">
                            <h3>Filters</h3>
                            <button onClick={() => setMobileFilter(false)}><FaTimes /></button>
                        </div>

                        {/* Search */}
                        <div className="filter-card card-base">
                            <h4>Search</h4>
                            <div className="search-input-wrap">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={currentSearch}
                                    onChange={(e) => updateFilter('search', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="filter-card card-base">
                            <h4>Categories</h4>
                            <ul className="filter-list">
                                <li
                                    className={!currentCategory ? 'active' : ''}
                                    onClick={() => updateFilter('category', '')}
                                >
                                    <span>All Categories</span>
                                </li>
                                {categories.map(cat => (
                                    <li
                                        key={cat.id}
                                        className={currentCategory === cat.slug ? 'active' : ''}
                                        onClick={() => updateFilter('category', cat.slug)}
                                    >
                                        <span>{cat.name}</span>
                                        <span className="count">{cat.product_count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brands */}
                        <div className="filter-card card-base">
                            <h4>Brands</h4>
                            <ul className="filter-list">
                                <li
                                    className={!currentBrand ? 'active' : ''}
                                    onClick={() => updateFilter('brand', '')}
                                >
                                    <span>All Brands</span>
                                </li>
                                {brands.map(brand => (
                                    <li
                                        key={brand}
                                        className={currentBrand === brand ? 'active' : ''}
                                        onClick={() => updateFilter('brand', brand)}
                                    >
                                        <span>{brand}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="products-main">
                        {loading ? (
                            <div className="products-grid">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="skeleton" style={{ height: '360px' }} />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="no-results">
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination-wrap">
                                <nav>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setPage(currentPage - 1)}>Prev</button>
                                        </li>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setPage(currentPage + 1)}>Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
