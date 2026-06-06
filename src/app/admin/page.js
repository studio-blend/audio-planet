'use client';
import { useState, useEffect } from 'react';
import { 
  Database, 
  Tag, 
  BookOpen, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  RefreshCw,
  FileText,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form states for adding/editing items
  const [editingItem, setEditingItem] = useState(null); // { type: 'product'|'blog'|'geo', data: ... }
  const [isAdding, setIsAdding] = useState(false);

  // Initial Form Templates
  const initialProductForm = {
    id: '',
    name: '',
    category: 'Speakers',
    brand: '',
    specs: '',
    description: '',
    image: '/images/amplifier.jpg',
    featured: false
  };

  const initialBlogForm = {
    slug: '',
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: 'Acoustic Board',
    category: 'Acoustics',
    summary: '',
    content: '',
    readTime: '5 min read',
    image: '/images/hero_listening_room.jpg'
  };

  const initialGeoForm = {
    location: '',
    title: '',
    headline: '',
    intro: '',
    paragraph: '',
    keywords: ''
  };

  const [productForm, setProductForm] = useState(initialProductForm);
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [geoForm, setGeoForm] = useState(initialGeoForm);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('ap_admin_session');
    if (token === 'audioplanet1999_session_token') {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  // Fetch database only after authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDb();
    }
  }, [isAuthenticated]);

  const fetchDb = () => {
    setLoading(true);
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        setDbData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching DB:', err);
        setLoading(false);
      });
  };

  const saveDb = (updatedDb) => {
    setSaving(true);
    setMessage('');
    fetch('/api/cms', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer audioplanet1999_session_token'
      },
      body: JSON.stringify(updatedDb)
    })
      .then((res) => res.json())
      .then((resData) => {
        setSaving(false);
        if (resData.success) {
          setDbData(updatedDb);
          setMessage('Database updated successfully!');
          setTimeout(() => setMessage(''), 3000);
          resetForms();
        } else {
          setMessage('Failed to save: ' + resData.error);
        }
      })
      .catch((err) => {
        console.error('Error saving DB:', err);
        setSaving(false);
        setMessage('Network error while saving');
      });
  };

  const resetForms = () => {
    setEditingItem(null);
    setIsAdding(false);
    setProductForm(initialProductForm);
    setBlogForm(initialBlogForm);
    setGeoForm(initialGeoForm);
  };

  // Product Operations
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const specsArray = typeof productForm.specs === 'string' 
      ? productForm.specs.split(',').map(s => s.trim()) 
      : productForm.specs;

    const newProduct = {
      ...productForm,
      id: productForm.id || `prod-${Date.now()}`,
      specs: specsArray
    };

    let updatedProducts = [...dbData.products];
    if (editingItem) {
      updatedProducts = updatedProducts.map(p => p.id === newProduct.id ? newProduct : p);
    } else {
      updatedProducts.push(newProduct);
    }

    saveDb({ ...dbData, products: updatedProducts });
  };

  const deleteProduct = (id) => {
    if (confirm('Delete this product?')) {
      const updatedProducts = dbData.products.filter(p => p.id !== id);
      saveDb({ ...dbData, products: updatedProducts });
    }
  };

  const startEditProduct = (prod) => {
    setEditingItem({ type: 'product', id: prod.id });
    setIsAdding(false);
    setProductForm({
      ...prod,
      specs: prod.specs.join(', ')
    });
  };

  // Blog Operations
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = { ...blogForm };
    
    let updatedBlogs = [...dbData.blogs];
    if (editingItem) {
      updatedBlogs = updatedBlogs.map(b => b.slug === newBlog.slug ? newBlog : b);
    } else {
      updatedBlogs.push(newBlog);
    }

    saveDb({ ...dbData, blogs: updatedBlogs });
  };

  const deleteBlog = (slug) => {
    if (confirm('Delete this blog post?')) {
      const updatedBlogs = dbData.blogs.filter(b => b.slug !== slug);
      saveDb({ ...dbData, blogs: updatedBlogs });
    }
  };

  const startEditBlog = (post) => {
    setEditingItem({ type: 'blog', id: post.slug });
    setIsAdding(false);
    setBlogForm(post);
  };

  // Geo Operations
  const handleGeoSubmit = (e) => {
    e.preventDefault();
    const keywordsArray = typeof geoForm.keywords === 'string'
      ? geoForm.keywords.split(',').map(k => k.trim())
      : geoForm.keywords;

    const newGeo = {
      ...geoForm,
      keywords: keywordsArray
    };

    let updatedGeo = [...dbData.geoPages];
    if (editingItem) {
      updatedGeo = updatedGeo.map(g => g.location === newGeo.location ? newGeo : g);
    } else {
      updatedGeo.push(newGeo);
    }

    saveDb({ ...dbData, geoPages: updatedGeo });
  };

  const deleteGeo = (location) => {
    if (confirm('Delete this geo-targeted landing page?')) {
      const updatedGeo = dbData.geoPages.filter(g => g.location !== location);
      saveDb({ ...dbData, geoPages: updatedGeo });
    }
  };

  const startEditGeo = (page) => {
    setEditingItem({ type: 'geo', id: page.location });
    setIsAdding(false);
    setGeoForm({
      ...page,
      keywords: page.keywords.join(', ')
    });
  };

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

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('ap_admin_session');
    setIsAuthenticated(false);
    resetForms();
  };

  // Render loading state while validating session
  if (checkingAuth) {
    return (
      <div className="admin-loading-screen">
        <div className="loading-spinner"></div>
        <style jsx>{`
          .admin-loading-screen {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #060606;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-top-color: var(--accent-gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Render Premium Lock Screen if not authenticated
  if (!isAuthenticated) {
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      if (passcode === 'audioplanet1999') {
        localStorage.setItem('ap_admin_session', 'audioplanet1999_session_token');
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Access Denied: Invalid Security Key');
      }
    };

    return (
      <div className="lock-screen-container anim-fade-in">
        <div className="lock-card exhibition-frame">
          <div className="lock-header">
            <span className="logo-wordmark">AUDIO PLANET</span>
            <div className="security-badge">
              <span className="font-mono-tag">SECURE CONSOLE GATEWAY</span>
            </div>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="lock-form">
            <p className="lock-instruction font-headline-serif">Enter Console Passcode</p>
            <div className="form-group">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (authError) setAuthError('');
                }}
                required
                className={`form-input passcode-input ${authError ? 'input-error' : ''}`}
                placeholder="••••••••••••"
                autoFocus
              />
            </div>
            {authError && <div className="error-message font-mono-tag">{authError}</div>}
            
            <button
              type="submit"
              className="btn-primary submit-btn"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              Authenticate System
            </button>
          </form>
          
          <div className="lock-footer font-mono-tag">
            Authorized Personnel Only • Est. 1999
          </div>
        </div>

        <style jsx>{`
          .lock-screen-container {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #060606;
            background-image: radial-gradient(circle at center, #111 0%, #060606 100%);
            padding: 2rem;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
          }
          .lock-card {
            width: 100%;
            max-width: 420px;
            padding: 3.5rem 2.5rem;
            background-color: #0c0c0c;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
            border: 1px solid var(--border-color);
          }
          .lock-header {
            margin-bottom: 2.5rem;
          }
          .logo-wordmark {
            font-family: var(--font-display);
            font-size: 1.8rem;
            letter-spacing: 0.25em;
            color: var(--text-primary);
            display: block;
            margin-bottom: 0.75rem;
          }
          .security-badge {
            display: inline-block;
            border: 1px solid var(--border-color);
            padding: 0.25rem 0.75rem;
            background-color: rgba(255, 255, 255, 0.02);
          }
          .lock-form {
            margin-bottom: 2rem;
          }
          .lock-instruction {
            font-size: 1.25rem;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
          }
          .passcode-input {
            text-align: center;
            font-size: 1.25rem;
            letter-spacing: 0.2em;
            border-color: var(--border-color);
            background-color: transparent;
            color: var(--text-primary);
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            outline: none;
            transition: var(--transition-fast);
          }
          .passcode-input:focus {
            border-color: var(--accent-gold);
            box-shadow: 0 0 10px rgba(201, 168, 76, 0.15);
          }
          .input-error {
            border-color: #f44336 !important;
            animation: shake 0.3s ease-in-out;
          }
          .error-message {
            color: #f44336;
            font-size: 0.75rem;
            margin-top: 0.75rem;
            letter-spacing: 0.05em;
          }
          .submit-btn {
            width: 100%;
            margin-top: 1.5rem;
            height: 48px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .lock-footer {
            font-size: 0.6rem;
            color: #444;
            letter-spacing: 0.1em;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-page container anim-fade-in">
      <section className="admin-header">
        <div className="header-info">
          <span className="font-mono-tag"><Database size={12} style={{ marginRight: '4px' }} /> Persistent File Database CMS</span>
          <h1 className="admin-title font-display-italic">CMS Console</h1>
        </div>
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={fetchDb} 
            className="btn-secondary sync-btn"
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            <RefreshCw size={14} className={loading ? 'loading' : ''} /> Sync Database
          </button>
          <button 
            onClick={handleLogout} 
            className="btn-secondary logout-btn"
            style={{ marginLeft: '1rem', color: '#ff4d4d', borderColor: 'rgba(255, 77, 77, 0.2)' }}
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            <LogOut size={14} style={{ marginRight: '6px' }} /> Log Out
          </button>
        </div>
      </section>

      {message && (
        <div className="cms-alert font-mono-tag">
          {message}
        </div>
      )}

      <div className="admin-layout">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar exhibition-frame">
          <button
            onClick={() => { setActiveTab('products'); resetForms(); }}
            className={`tab-btn font-mono-tag ${activeTab === 'products' ? 'active' : ''}`}
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            <Tag size={16} /> Products
          </button>
          <button
            onClick={() => { setActiveTab('blogs'); resetForms(); }}
            className={`tab-btn font-mono-tag ${activeTab === 'blogs' ? 'active' : ''}`}
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            <BookOpen size={16} /> Blog Posts
          </button>
          <button
            onClick={() => { setActiveTab('geo'); resetForms(); }}
            className={`tab-btn font-mono-tag ${activeTab === 'geo' ? 'active' : ''}`}
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            <MapPin size={16} /> Geo Landing Pages
          </button>
        </aside>

        {/* Dashboard Workspace */}
        <main className="admin-workspace exhibition-frame">
          {loading ? (
            <div className="workspace-loading font-mono-tag">Resolving system files...</div>
          ) : (
            <>
              {/* --- PRODUCTS TAB --- */}
              {activeTab === 'products' && (
                <div className="tab-workspace">
                  <div className="workspace-header">
                    <h2 className="font-headline-serif">Manage Audio Curations</h2>
                    {!isAdding && !editingItem && (
                      <button 
                        onClick={() => setIsAdding(true)} 
                        className="btn-primary add-btn"
                        onMouseEnter={addHover}
                        onMouseLeave={removeHover}
                      >
                        <Plus size={14} /> Add Product
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAdding || editingItem?.type === 'product') && (
                    <form onSubmit={handleProductSubmit} className="cms-form anim-fade-in">
                      <div className="form-double">
                        <div className="form-group">
                          <label className="form-label">Product Name</label>
                          <input
                            type="text"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            required
                            className="form-input"
                            placeholder="e.g. Sonus Faber Lumina II"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Brand</label>
                          <input
                            type="text"
                            value={productForm.brand}
                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                            required
                            className="form-input"
                            placeholder="e.g. Sonus Faber"
                          />
                        </div>
                      </div>

                      <div className="form-double">
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                            className="form-select"
                          >
                            <option value="Speakers">Speakers</option>
                            <option value="Amplifiers">Amplifiers</option>
                            <option value="Turntables">Turntables</option>
                            <option value="Source Equipment">Source Equipment</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Image Path</label>
                          <input
                            type="text"
                            value={productForm.image}
                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Specifications (comma separated)</label>
                        <input
                          type="text"
                          value={productForm.specs}
                          onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
                          className="form-input"
                          placeholder="e.g. 2-way bookshelf speaker, 150mm cone, 55Hz - 24kHz"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          required
                          rows={4}
                          className="form-textarea"
                          placeholder="A brief paragraphs about the component..."
                        />
                      </div>

                      <div className="form-group checkbox-group">
                        <input
                          type="checkbox"
                          id="prod-featured"
                          checked={productForm.featured}
                          onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                        />
                        <label htmlFor="prod-featured" className="form-label check-label">Feature this product on Homepage</label>
                      </div>

                      <div className="form-actions">
                        <button 
                          type="submit" 
                          disabled={saving} 
                          className="btn-primary"
                          onMouseEnter={addHover}
                          onMouseLeave={removeHover}
                        >
                          <Save size={14} style={{ marginRight: '6px' }} /> {saving ? 'Writing...' : 'Save Product'}
                        </button>
                        <button 
                          type="button" 
                          onClick={resetForms} 
                          className="btn-secondary"
                          onMouseEnter={addHover}
                          onMouseLeave={removeHover}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List View */}
                  {!isAdding && !editingItem && (
                    <div className="cms-list">
                      {dbData?.products.map((prod) => (
                        <div key={prod.id} className="cms-list-item">
                          <div className="item-info">
                            <span className="item-meta font-mono-tag">{prod.brand} • {prod.category}</span>
                            <h4 className="item-title font-headline-serif">{prod.name}</h4>
                          </div>
                          <div className="item-actions">
                            <button 
                              onClick={() => startEditProduct(prod)} 
                              className="action-btn edit"
                              onMouseEnter={addHover}
                              onMouseLeave={removeHover}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(prod.id)} 
                              className="action-btn delete"
                              onMouseEnter={addHover}
                              onMouseLeave={removeHover}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- BLOGS TAB --- */}
              {activeTab === 'blogs' && (
                <div className="tab-workspace">
                  <div className="workspace-header">
                    <h2 className="font-headline-serif">Manage Editorials (Expert Speaks)</h2>
                    {!isAdding && !editingItem && (
                      <button 
                        onClick={() => setIsAdding(true)} 
                        className="btn-primary add-btn"
                        onMouseEnter={addHover}
                        onMouseLeave={removeHover}
                      >
                        <Plus size={14} /> Add Article
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAdding || editingItem?.type === 'blog') && (
                    <form onSubmit={handleBlogSubmit} className="cms-form anim-fade-in">
                      <div className="form-double">
                        <div className="form-group">
                          <label className="form-label">Article Title</label>
                          <input
                            type="text"
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            required
                            className="form-input"
                            placeholder="e.g. The Art of Room Tuning"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">URL Slug</label>
                          <input
                            type="text"
                            value={blogForm.slug}
                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                            required
                            disabled={!!editingItem} // prevent slug change on edits to keep routes stable
                            className="form-input"
                            placeholder="e.g. art-of-room-tuning"
                          />
                        </div>
                      </div>

                      <div className="form-double">
                        <div className="form-group">
                          <label className="form-label">Author</label>
                          <input
                            type="text"
                            value={blogForm.author}
                            onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                            required
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <input
                            type="text"
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Summary / Teaser Text</label>
                        <input
                          type="text"
                          value={blogForm.summary}
                          onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                          required
                          className="form-input"
                          placeholder="A single line summary to display on the blog listing grid..."
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Content Paragraphs (use double newlines to separate paragraphs)</label>
                        <textarea
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          required
                          rows={8}
                          className="form-textarea"
                          placeholder="Write the full article body..."
                        />
                      </div>

                      <div className="form-actions">
                        <button 
                          type="submit" 
                          disabled={saving} 
                          className="btn-primary"
                          onMouseEnter={addHover}
                          onMouseLeave={removeHover}
                        >
                          <Save size={14} style={{ marginRight: '6px' }} /> {saving ? 'Writing...' : 'Save Article'}
                        </button>
                        <button 
                          type="button" 
                          onClick={resetForms} 
                          className="btn-secondary"
                          onMouseEnter={addHover}
                          onMouseLeave={removeHover}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List View */}
                  {!isAdding && !editingItem && (
                    <div className="cms-list">
                      {dbData?.blogs.map((post) => (
                        <div key={post.slug} className="cms-list-item">
                          <div className="item-info">
                            <span className="item-meta font-mono-tag">{post.date} • BY {post.author.toUpperCase()}</span>
                            <h4 className="item-title font-headline-serif">{post.title}</h4>
                          </div>
                          <div className="item-actions">
                            <button 
                              onClick={() => startEditBlog(post)} 
                              className="action-btn edit"
                              onMouseEnter={addHover}
                              onMouseLeave={removeHover}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => deleteBlog(post.slug)} 
                              className="action-btn delete"
                              onMouseEnter={addHover}
                              onMouseLeave={removeHover}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- GEO PAGES TAB --- */}
              {activeTab === 'geo' && (
                <div className="tab-workspace">
                  <div className="workspace-header">
                    <h2 className="font-headline-serif">Manage Geo-Targeted Landing Pages</h2>
                    {!isAdding && !editingItem && (
                      <button 
                        onClick={() => setIsAdding(true)} 
                        className="btn-primary add-btn"
                        onMouseEnter={addHover}
                        onMouseLeave={removeHover}
                      >
                        <Plus size={14} /> Generate Landing Page
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(isAdding || editingItem?.type === 'geo') && (
                    <form onSubmit={handleGeoSubmit} className="cms-form anim-fade-in">
                      <div className="form-double">
                        <div className="form-group">
                          <label className="form-label">SEO Page Title</label>
                          <input
                            type="text"
                            value={geoForm.title}
                            onChange={(e) => setGeoForm({ ...geoForm, title: e.target.value })}
                            required
                            className="form-input"
                            placeholder="e.g. Home Theater Consultants in Indiranagar, Bangalore"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Location URL Slug</label>
                          <input
                            type="text"
                            value={geoForm.location}
                            onChange={(e) => setGeoForm({ ...geoForm, location: e.target.value })}
                            required
                            disabled={!!editingItem}
                            className="form-input"
                            placeholder="e.g. bangalore-indiranagar"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Heading (Hero Section)</label>
                        <input
                          type="text"
                          value={geoForm.headline}
                          onChange={(e) => setGeoForm({ ...geoForm, headline: e.target.value })}
                          required
                          className="form-input"
                          placeholder="e.g. Sound Engineering for Indiranagar's Finest Residences"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Intro Paragraph (Hero Section)</label>
                        <input
                          type="text"
                          value={geoForm.intro}
                          onChange={(e) => setGeoForm({ ...geoForm, intro: e.target.value })}
                          required
                          className="form-input"
                          placeholder="A 2-line intro explaining the service scope..."
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Custom Local Paragraph (Body Section)</label>
                        <textarea
                          value={geoForm.paragraph}
                          onChange={(e) => setGeoForm({ ...geoForm, paragraph: e.target.value })}
                          required
                          rows={5}
                          className="form-textarea"
                          placeholder="Describe specific regional services or local architectural alignments..."
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">SEO Crawler Keywords (comma separated)</label>
                        <input
                          type="text"
                          value={geoForm.keywords}
                          onChange={(e) => setGeoForm({ ...geoForm, keywords: e.target.value })}
                          className="form-input"
                          placeholder="e.g. Home Theater Indiranagar, Acoustic Treatment Bangalore"
                        />
                      </div>

                      <div className="form-actions">
                        <button 
                          type="submit" 
                          disabled={saving} 
                          className="btn-primary"
                          onMouseEnter={addHover}
                          onMouseLeave={removeHover}
                        >
                          <Save size={14} style={{ marginRight: '6px' }} /> {saving ? 'Writing...' : 'Save Landing Page'}
                        </button>
                        <button 
                          type="button" 
                          onClick={resetForms} 
                          className="btn-secondary"
                          onMouseEnter={addHover}
                          onMouseLeave={removeHover}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List View */}
                  {!isAdding && !editingItem && (
                    <div className="cms-list">
                      {dbData?.geoPages.map((page) => (
                        <div key={page.location} className="cms-list-item">
                          <div className="item-info">
                            <span className="item-meta font-mono-tag">ROUTE: /geo/{page.location}</span>
                            <h4 className="item-title font-headline-serif">{page.title}</h4>
                          </div>
                          <div className="item-actions">
                            <button 
                              onClick={() => startEditGeo(page)} 
                              className="action-btn edit"
                              onMouseEnter={addHover}
                              onMouseLeave={removeHover}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => deleteGeo(page.location)} 
                              className="action-btn delete"
                              onMouseEnter={addHover}
                              onMouseLeave={removeHover}
                            >
                              <Trash2 size={14} />
                            </button>
                            <a 
                              href={`/geo/${page.location}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="action-btn preview font-mono-tag"
                              style={{ display: 'inline-flex', padding: '0 8px', fontSize: '0.6rem', border: '1px solid var(--border-color)', height: '28px', alignItems: 'center' }}
                            >
                              VIEW Route
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style jsx>{`
        .admin-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }

        .admin-title {
          font-size: 3rem;
          margin-top: 0.5rem;
        }

        .sync-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sync-btn :global(.loading) {
          animation: spin 1s linear infinite;
        }

        .cms-alert {
          background-color: var(--accent-gold);
          color: #000;
          padding: 1rem;
          margin-bottom: 2rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        /* Layout */
        .admin-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .admin-sidebar {
          padding: 1.5rem;
          background-color: var(--bg-surface);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tab-btn {
          width: 100%;
          text-align: left;
          padding: 1rem 1.25rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid transparent;
          transition: var(--transition-fast);
        }

        .tab-btn:hover {
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .tab-btn.active {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
          background-color: rgba(201, 168, 76, 0.05);
        }

        .admin-workspace {
          padding: 3rem;
          background-color: var(--bg-surface);
          min-height: 500px;
        }

        .workspace-loading {
          text-align: center;
          padding: 5rem 0;
          color: var(--text-secondary);
        }

        .workspace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .workspace-header h2 {
          font-size: 2rem;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Forms */
        .cms-form {
          margin-bottom: 2rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .checkbox-group input {
          width: 18px;
          height: 18px;
          accent-color: var(--accent-gold);
        }

        .check-label {
          margin-bottom: 0;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        /* CMS Lists */
        .cms-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cms-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          background-color: #0b0b0b;
        }

        .item-meta {
          font-size: 0.6rem;
          color: var(--accent-gold);
          margin-bottom: 0.25rem;
          display: block;
        }

        .item-title {
          font-size: 1.25rem;
        }

        .item-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .action-btn:hover {
          color: var(--text-primary);
        }

        .action-btn.edit:hover {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }

        .action-btn.delete:hover {
          border-color: #f44336;
          color: #f44336;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .admin-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .admin-workspace {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
