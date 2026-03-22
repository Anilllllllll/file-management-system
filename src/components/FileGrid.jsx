import React from 'react';
import { Folder, FileText, Image as ImageIcon, Table, Presentation, File, MoreVertical } from 'lucide-react';
import './FileGrid.css';

export default function FileGrid({ files, viewMode, onFolderClick, onContextMenu }) {
  const getIcon = (type) => {
    switch(type) {
      case 'folder': return <Folder size={viewMode === 'list' ? 24 : 48} className="icon-folder" />;
      case 'image': return <ImageIcon size={viewMode === 'list' ? 24 : 48} className="icon-image" />;
      case 'spreadsheet': return <Table size={viewMode === 'list' ? 24 : 48} className="icon-spreadsheet" />;
      case 'presentation': return <Presentation size={viewMode === 'list' ? 24 : 48} className="icon-presentation" />;
      case 'document': return <FileText size={viewMode === 'list' ? 24 : 48} className="icon-document" />;
      default: return <File size={viewMode === 'list' ? 24 : 48} className="icon-file" />;
    }
  };

  if (files.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <Folder size={64} className="empty-icon" />
        <h3>Empty Space Detected</h3>
        <p>Drag and drop files here, or create a new folder.</p>
      </div>
    );
  }

  return (
    <div className={`file-container ${viewMode}`}>
      {files.map((file, index) => (
        <div 
          key={file.id} 
          className="file-item animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
          onDoubleClick={() => file.type === 'folder' ? onFolderClick(file) : alert(`Opening ${file.name}`)}
          onContextMenu={(e) => onContextMenu(e, file)}
        >
          <div className="file-icon-wrapper">
            {getIcon(file.type)}
          </div>
          <div className="file-details">
            <h4 className="file-name" title={file.name}>{file.name}</h4>
            <p className="file-meta">{file.size} • {file.modified}</p>
          </div>
          <button 
            className="btn-action-menu"
            onClick={(e) => {
              e.stopPropagation();
              onContextMenu(e, file);
            }}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
