import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.geoPages.map((page) => ({
      location: page.location,
    }));
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { location } = await params;
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const page = data.geoPages.find((gp) => gp.location === location);
    if (page) {
      return {
        title: page.title,
        description: page.intro,
      };
    }
  } catch (e) {}
  return { title: 'Bespoke Audio Consulting' };
}

export default async function GeoLocation({ params }) {
  const { location } = await params;

  let geoPage = null;
  let allLocations = [];
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    geoPage = data.geoPages.find((gp) => gp.location === location);
    allLocations = data.geoPages.map((gp) => ({
      location: gp.location,
      title: gp.title.split('|')[0].trim(),
    }));
  } catch (e) {
    console.error('Error loading geo page:', e);
  }

  if (!geoPage) {
    return (
      <div className="container error-page" style={{ padding: '180px 2rem 6rem 2rem', textAlign: 'center' }}>
        <h1 className="font-headline-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Regional Desk Not Configured</h1>
        <p style={{ color: 'var(--text-secondary)' }}>This localized acoustic planning zone is currently undergoing survey.</p>
        <Link href="/" className="btn-secondary" style={{ marginTop: '2rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  // Formatting nice location name tag
  const locationName = location
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="geo-page container anim-fade-in">
      <section className="geo-hero">
        <div className="geo-meta font-mono-tag">
          <MapPin size={14} className="pin-icon" />
          <span>LOCALIZED REGIONAL SERVICE AREA</span>
          <span className="bullet-split">•</span>
          <span>{locationName.toUpperCase()}</span>
        </div>
        <h1 className="geo-title font-display-italic">{geoPage.headline}</h1>
        <p className="geo-lead">{geoPage.intro}</p>
      </section>

      <div className="geo-body">
        {/* Left Editorial Column */}
        <div className="geo-main-content">
          <div className="exhibition-frame content-card">
            <h2 className="font-headline-serif content-heading">Bespoke Acoustics in {locationName}</h2>
            <p className="content-p">{geoPage.paragraph}</p>
            <p className="content-p">
              Whether you are developing an isolated residential audio studio or integrating high-fidelity speakers into a minimalist home architectural design, we align hardware variables with your blueprints. We coordinate directly with interior builders and contractors to deploy acoustic fabric panel treatments, structural decoupling barriers, and resonance absorption traps.
            </p>
            
            <div className="standards-box">
              <h3 className="font-mono-tag standards-title">Acoustic Curation Standards</h3>
              <ul className="standards-list">
                <li>
                  <ShieldCheck size={16} className="std-icon" />
                  <span>Decibel transmission analysis and wall decoupling specs.</span>
                </li>
                <li>
                  <ShieldCheck size={16} className="std-icon" />
                  <span>Speaker crossover timing correction and placement calibrations.</span>
                </li>
                <li>
                  <ShieldCheck size={16} className="std-icon" />
                  <span>Independent matching of elite global amplifiers and speakers.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="geo-sidebar">
          {/* Action Card */}
          <div className="sidebar-card exhibition-frame" style={{ marginBottom: '2rem' }}>
            <span className="font-mono-tag">Direct Scheduling</span>
            <h3 className="font-headline-serif sidebar-title">Arrange an In-Situ Room Audit</h3>
            <p className="sidebar-desc">
              Request our acoustic engineers to audit your room boundaries, calculate resonance nodes, and measure your background noise floor in {locationName}.
            </p>
            <Link href="/contact" className="btn-primary sidebar-btn">
              <Calendar size={14} style={{ marginRight: '8px' }} />
              Request Site Visit
            </Link>
          </div>

          {/* Regional index */}
          <div className="sidebar-locations-card exhibition-frame">
            <h4 className="font-mono-tag locations-title">Other Bangalore Service Zones</h4>
            <ul className="locations-list">
              {allLocations.map((loc) => (
                <li key={loc.location}>
                  <Link href={`/geo/${loc.location}`}>
                    {loc.title} <ArrowRight size={12} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Local keywords block for search crawlers */}
      <section className="seo-tags-block">
        <span className="font-mono-tag seo-tags-label">Crawler Index Keywords</span>
        <div className="tags-container">
          {geoPage.keywords.map((kw, i) => (
            <span key={i} className="seo-tag font-mono-tag">{kw}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
