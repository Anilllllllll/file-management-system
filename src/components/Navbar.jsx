import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import './Navigation.css';

export default function Navbar() {
  return (
    <nav className="global-navbar glass-panel">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <FolderOpen size={28} className="logo-icon" />
          <span>Futura Files</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#features" className="nav-link">Features</a>
          <Link to="/app" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
            Open Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
