'use client';
import { useState, useEffect } from 'react';
import { Layers, Info } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products from CMS:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Speakers', 'Amplifiers', 'Turntables', 'Source Equipment'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  const addHover = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.custom-cursor')?.classList.add('hovered');
    }
  };
  const removeHover = () => {
    if (typeof document !== 'undefined') {
      document.querySelector('.custom-cursor')?.classList.remove('hovered');
    }
  };

  const triggerEnquiry = (product) => {
    if (typeof window !== 'undefined' && window.openEnquiryModal) {
      window.openEnquiryModal(product);
    }
  };

  return (
    <div className="products-page container anim-fade-in">
      <section className="products-hero">
        <span className="font-mono-tag">Authorized Curation</span>
        <h1 className="products-title font-display-italic">Audio Systems</h1>
        <p className="products-lead">
          We curate components from the world's finest audio houses. Filter by category, explore specifications, and request an audition.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="filter-tabs font-mono-tag">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state font-mono-tag">Reading Audiophile database...</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="product-card exhibition-frame">
              <div 
                className="product-image" 
                style={{ backgroundImage: `url('${prod.image || "/images/amplifier.jpg"}')` }}
              />
              <div className="product-info">
                <span className="product-brand font-mono-tag">{prod.brand}</span>
                <h3 className="product-name font-headline-serif">{prod.name}</h3>
                <span className="product-cat font-mono-tag">{prod.category}</span>
                
                <p className="product-desc">{prod.description}</p>
                
                <div className="product-specs">
                  <span className="specs-title font-mono-tag"><Info size={10} style={{ marginRight: '4px' }} /> Tech Specs</span>
                  <ul>
                    {prod.specs.slice(0, 3).map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => triggerEnquiry(prod)}
                  className="btn-primary enquire-btn"
                  onMouseEnter={addHover}
                  onMouseLeave={removeHover}
                >
                  Request Audition
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="empty-state font-headline-serif">
          No matching components currently configured. Add entries via the CMS.
        </div>
      )}

      <style jsx>{`
        .products-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .products-hero {
          max-width: 800px;
          margin-bottom: 4rem;
        }

        .products-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .products-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          padding: 0.5rem 0;
          position: relative;
        }

        .filter-btn:hover, .filter-btn.active {
          color: var(--accent-gold);
        }

        .filter-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--accent-gold);
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          height: 100%;
        }

        .product-image {
          height: 220px;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%) contrast(105%);
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: var(--transition-smooth);
        }

        .product-card:hover .product-image {
          filter: grayscale(0%) contrast(100%);
        }

        .product-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-brand {
          font-size: 0.65rem;
          color: var(--accent-gold);
          letter-spacing: 0.1em;
        }

        .product-name {
          font-size: 1.5rem;
          margin: 0.25rem 0 0.5rem 0;
          color: var(--text-primary);
        }

        .product-cat {
          font-size: 0.6rem;
          color: #555;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 1rem;
        }

        .product-desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .product-specs {
          background-color: #070707;
          border: 1px solid var(--border-color);
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .specs-title {
          font-size: 0.6rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .product-specs ul {
          list-style: none;
          padding-left: 0;
        }

        .product-specs li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
          position: relative;
          padding-left: 10px;
        }

        .product-specs li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-gold);
        }

        .enquire-btn {
          width: 100%;
        }

        /* Loading / Empty States */
        .loading-state, .empty-state {
          text-align: center;
          padding: 5rem 0;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .products-title {
            font-size: 3rem;
          }
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
