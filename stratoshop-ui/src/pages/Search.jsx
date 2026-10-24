import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!query.trim()) return;
        const fetchResults = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await api.get('/products', { params: { search: query } });
                setProducts(response.data.data || response.data);
            } catch (err) {
                console.error('Search error:', err);
                setError('Unable to fetch results. Make sure the backend is running.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <section className="catalog-section container section-padding">
            <div className="section-header">
                <div className="header-info">
                    <Link to="/" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', opacity: 0.7 }}>
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <h2 className="section-title">
                        <SearchIcon size={28} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                        Results for &ldquo;{query}&rdquo;
                    </h2>
                    {!loading && !error && (
                        <p className="section-subtitle">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
                    )}
                </div>
            </div>

            {!query.trim() ? (
                <div className="loading-state">
                    <p>Enter a search term in the header to find products.</p>
                </div>
            ) : loading ? (
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Searching...</p>
                </div>
            ) : error ? (
                <div className="loading-state">
                    <p>{error}</p>
                </div>
            ) : products.length === 0 ? (
                <div className="loading-state">
                    <p>No products matched &ldquo;{query}&rdquo;. Try a different keyword.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div key={product.id} className="animate-up" style={{ animationDelay: `${index * 0.08}s` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Search;
