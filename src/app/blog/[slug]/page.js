import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

// Generates dynamic routes at build time for speed/SEO
export async function generateStaticParams() {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.blogs.map((post) => ({
      slug: post.slug,
    }));
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const post = data.blogs.find((b) => b.slug === slug);
    if (post) {
      return {
        title: `${post.title} | Audio Planet Blog`,
        description: post.summary,
      };
    }
  } catch (e) {}
  return { title: 'Editorial | Audio Planet' };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  let post = null;
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    post = data.blogs.find((b) => b.slug === slug);
  } catch (e) {
    console.error('Error loading blog post:', e);
  }

  if (!post) {
    return (
      <div className="container error-page" style={{ padding: '180px 2rem 6rem 2rem', textAlign: 'center' }}>
        <h1 className="font-headline-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Article Not Found</h1>
        <p style={{ color: 'var(--text-secondary)' }}>The requested editorial article does not exist or has been removed.</p>
        <Link href="/blog" className="btn-secondary" style={{ marginTop: '2rem' }}>
          Back to Editorials
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page container anim-fade-in">
      <div className="back-nav font-mono-tag">
        <Link href="/blog">
          <ArrowLeft size={12} style={{ marginRight: '6px' }} /> Back to Editorials
        </Link>
      </div>

      <article className="post-article">
        <header className="article-header">
          <div className="card-meta font-mono-tag">
            <span>{post.date}</span>
            <span className="bullet-split">•</span>
            <span>{post.category}</span>
            <span className="bullet-split">•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="font-headline-serif article-title">{post.title}</h1>
          <div className="article-author font-mono-tag">
            <span>BY {post.author.toUpperCase()}</span>
          </div>
        </header>

        <div 
          className="article-banner exhibition-frame"
          style={{ marginBottom: '4rem' }}
        >
          <div 
            className="inner-banner"
            style={{ backgroundImage: `url('${post.image || "/images/hero_listening_room.jpg"}')`, height: '450px', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(30%) contrast(100%)' }}
          />
        </div>

        <div className="article-body font-body-text">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="article-p">{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="article-footer-cta exhibition-frame">
        <BookOpen className="cta-icon" size={32} />
        <h3 className="font-headline-serif">Interested in Acoustic Planning?</h3>
        <p>Our consultants help you engineer rooms that isolate noise and optimize frequency responses.</p>
        <Link href="/contact" className="btn-primary">
          Connect with Consultant
        </Link>
      </section>
    </div>
  );
}
