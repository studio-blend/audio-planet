'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.blogs) {
          setPosts(data.blogs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load blog posts:', err);
        setLoading(false);
      });
  }, []);

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

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="blog-page container anim-fade-in">
      <section className="blog-hero">
        <span className="font-mono-tag">Acoustic Editorial</span>
        <h1 className="blog-title font-display-italic">Expert Speaks</h1>
        <p className="blog-lead">
          Insights on the physics of sound propagation, high-fidelity design standards, and room calibration guidelines.
        </p>
      </section>

      {loading ? (
        <div className="loading-state font-mono-tag">Loading editorials...</div>
      ) : posts.length === 0 ? (
        <div className="empty-state font-headline-serif">
          No articles currently published. Add posts in the CMS.
        </div>
      ) : (
        <>
          {/* Featured Post (Full Width) */}
          {featuredPost && (
            <div className="featured-card exhibition-frame">
              <div 
                className="featured-image"
                style={{ backgroundImage: `url('${featuredPost.image || "/images/hero_listening_room.jpg"}')` }}
              />
              <div className="featured-content">
                <div className="card-meta font-mono-tag">
                  <span>{featuredPost.date}</span>
                  <span className="bullet-split">•</span>
                  <span>{featuredPost.category}</span>
                  <span className="bullet-split">•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                
                <h2 className="featured-title font-headline-serif">
                  <Link href={`/blog/${featuredPost.slug}`} onMouseEnter={addHover} onMouseLeave={removeHover}>
                    {featuredPost.title}
                  </Link>
                </h2>
                
                <p className="featured-summary">{featuredPost.summary}</p>
                
                <div className="featured-author font-mono-tag">
                  <span>BY {featuredPost.author.toUpperCase()}</span>
                </div>
                
                <Link 
                  href={`/blog/${featuredPost.slug}`} 
                  className="read-more-link"
                  onMouseEnter={addHover}
                  onMouseLeave={removeHover}
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Grid of Other Posts */}
          {gridPosts.length > 0 && (
            <div className="blog-grid">
              {gridPosts.map((post) => (
                <div key={post.slug} className="post-card exhibition-frame">
                  <div 
                    className="post-image"
                    style={{ backgroundImage: `url('${post.image || "/images/amplifier.jpg"}')` }}
                  />
                  <div className="post-info">
                    <div className="card-meta font-mono-tag">
                      <span>{post.date}</span>
                      <span className="bullet-split">•</span>
                      <span>{post.category}</span>
                    </div>
                    
                    <h3 className="post-title font-headline-serif">
                      <Link href={`/blog/${post.slug}`} onMouseEnter={addHover} onMouseLeave={removeHover}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="post-summary">{post.summary}</p>
                    
                    <div className="post-footer">
                      <span className="post-author font-mono-tag">BY {post.author}</span>
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="post-link font-mono-tag"
                        onMouseEnter={addHover}
                        onMouseLeave={removeHover}
                      >
                        READ <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .blog-page {
          padding-top: 140px;
          padding-bottom: 6rem;
        }

        .blog-hero {
          max-width: 800px;
          margin-bottom: 4rem;
        }

        .blog-title {
          font-size: 4rem;
          margin: 1rem 0;
          line-height: 1.1;
        }

        .blog-lead {
          font-size: 1.3rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Featured Card */
        .featured-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          padding: 2.5rem;
          margin-bottom: 4rem;
          align-items: center;
        }

        .featured-image {
          height: 380px;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%) contrast(105%);
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .featured-card:hover .featured-image {
          filter: grayscale(0%) contrast(100%);
        }

        .card-meta {
          font-size: 0.65rem;
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .bullet-split {
          color: #555;
        }

        .featured-title {
          font-size: 2.4rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .featured-title :global(a):hover {
          color: var(--accent-gold);
        }

        .featured-summary {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .featured-author {
          font-size: 0.6rem;
          color: #555;
          margin-bottom: 2rem;
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
        }

        .read-more-link:hover {
          color: var(--accent-glow);
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
        }

        .post-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .post-image {
          height: 240px;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%) contrast(105%);
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: var(--transition-smooth);
        }

        .post-card:hover .post-image {
          filter: grayscale(0%) contrast(100%);
        }

        .post-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .post-title {
          font-size: 1.6rem;
          margin: 0.5rem 0 1rem 0;
          line-height: 1.3;
        }

        .post-title :global(a):hover {
          color: var(--accent-gold);
        }

        .post-summary {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .post-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .post-author {
          font-size: 0.6rem;
          color: #555;
        }

        .post-link {
          font-size: 0.7rem;
          color: var(--accent-gold);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .post-link:hover {
          color: var(--accent-glow);
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 5rem 0;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .featured-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
          }
          .featured-image {
            height: 250px;
          }
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .featured-title {
            font-size: 1.8rem;
          }
          .featured-summary {
            font-size: 0.95rem;
          }
          .post-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}
