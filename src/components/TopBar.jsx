import React from 'react';
import { Search, Grid, List, Plus, Upload, ChevronRight } from 'lucide-react';
import './TopBar.css';

export default function TopBar({ 
  currentPath, 
  onNavigateUp, 
  onNavigateTo,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onNewFolder,
  onUpload
}) {
  return (
    <div className="topbar glass-panel animate-fade-in">
      <div className="topbar-top">
        <div className="breadcrumb">
          {currentPath.map((folder, index) => {
            const isLast = index === currentPath.length - 1;
            return (
              <React.Fragment key={folder.id || folder}>
                <span 
                  className={`crumb ${isLast ? 'active' : ''}`}
                  onClick={() => !isLast && onNavigateTo(index)}
                >
                  {folder.name || folder}
                </span>
                {!isLast && <ChevronRight size={16} className="crumb-separator" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="topbar-actions">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-toggles">
            <button 
              className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={20} />
            </button>
            <button 
              className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>

          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={onNewFolder}>
              <Plus size={18} /> New Folder
            </button>
            <button className="btn btn-primary" onClick={onUpload}>
              <Upload size={18} /> Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
