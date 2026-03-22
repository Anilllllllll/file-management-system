import React from 'react';
import './Navigation.css';

export default function Footer() {
  return (
    <footer className="global-footer glass-panel">
      <div className="footer-content">
        <div className="footer-brand">
          <h3 style={{ color: 'var(--primary)', fontFamily: 'Orbitron' }}>Futura Files</h3>
          <p>100% Free & Open Source file management experience for modern teams and individuals.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="https://github.com/Anilllllllll/file-management-system">GitHub Repo</a>
            <a href="#">Security</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="link-group">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Futura Files. All rights reserved.</p>
      </div>
    </footer>
  );
}
