import React from 'react';
import { CATEGORIES } from '../utils/constants';
import { FolderOpen } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ activeCategory, setActiveCategory }) {
  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-logo">
        <FolderOpen size={28} className="logo-icon" />
        <span>Futura Files</span>
      </div>
      
      <ul className="nav-menu">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <li 
              key={cat.id} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-text">{cat.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
