import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Zap, Cloud, FolderOpen } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-layout">
      <Navbar />
      
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge">v2.0 is Live 🚀</div>
            <h1 className="hero-title">
              The Next Evolution of <br/>
              <span className="text-gradient">File Management</span>
            </h1>
            <p className="hero-subtitle">
              Securely store, organize, and share your files with industry-leading speed and a beautifully crafted UI. Designed for the professionals of tomorrow.
            </p>
            <div className="hero-actions">
              <Link to="/app" className="btn btn-primary btn-large">
                Open Dashboard
              </Link>
              <a href="#features" className="btn btn-secondary btn-large">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-visual animate-slide-in">
            <div className="glass-mockup">
               <div className="mockup-header">
                 <div className="mockup-dots"><span></span><span></span><span></span></div>
               </div>
               <div className="mockup-body">
                 <FolderOpen size={64} className="mockup-icon" />
                 <h3>Your Workspace</h3>
                 <p>Drag & drop files here</p>
               </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <h2 className="section-title">Industry-Standard Features</h2>
          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon"><Zap size={28} /></div>
              <h3>Lightning Fast</h3>
              <p>Optimized with React and Vite for immediate response times and seamless navigation.</p>
            </div>
            <div className="feature-card glass-panel">
              <div className="feature-icon"><Cloud size={28} /></div>
              <h3>Auto-Sync Storage</h3>
              <p>Your data stays with you. Changes persist locally via high-performance IndexedDB / LocalStorage.</p>
            </div>
            <div className="feature-card glass-panel">
              <div className="feature-icon"><Shield size={28} /></div>
              <h3>Secure By Design</h3>
              <p>Robust client-side architecture keeps your sensitive documents private and secure.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
