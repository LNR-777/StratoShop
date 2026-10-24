import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Living'];

const SLUG_TO_CATEGORY = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Living',
};

const Catalog = () => {
    const { slug } = useParams();
    const initialCategory = slug ? SLUG_TO_CATEGORY[slug] || 'All' : 'All';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [error, setError] = useState('');

    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    useEffect(() => {
        fetchProducts(activeCategory);
    }, [activeCategory]);

    const fetchProducts = async (category) => {
        setLoading(true);
        setError('');
        try {
            const params = category !== 'All' ? { category } : {};
            const response = await api.get('/products', { params });
            setProducts(response.data.data || response.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Unable to load products. Make sure the backend services are running.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const title = activeCategory === 'All' ? 'Shop All Products' : activeCategory;

    return (
        <section className="catalog-section container section-padding">
            <div className="section-header">
                <div className="header-info">
                    <h2 className="section-title">{title}</h2>
                    <p className="section-subtitle">
                        Curated products with verified names, categories, and images.
                    </p>
                </div>
                <div className="filter-controls glass">
                    <Filter size={18} />
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            className={activeCategory === category ? 'active' : ''}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading products...</p>
                </div>
            ) : error ? (
                <div className="loading-state">
                    <p>{error}</p>
                </div>
            ) : products.length === 0 ? (
                <div className="loading-state">
                    <p>No products found in this category.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div key={product.id} className="animate-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Catalog;
