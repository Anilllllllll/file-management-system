import React, { useEffect } from 'react';
import { Download, Edit2, Trash2, ExternalLink } from 'lucide-react';
import './ContextMenu.css';

export default function ContextMenu({ position, file, onClose, onDelete, onRename }) {
  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  if (!position || !file) return null;

  return (
    <div 
      className="context-menu animate-fade-in"
      style={{ left: position.x, top: position.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="menu-header">
        <span className="menu-title">{file.name}</span>
      </div>
      <ul className="menu-list">
        <li className="menu-item" onClick={() => { alert(`Opening ${file.name}`); onClose(); }}>
          <ExternalLink size={16} /> Open
        </li>
        {file.type !== 'folder' && (
          <li className="menu-item" onClick={() => { alert(`Downloading ${file.name}`); onClose(); }}>
            <Download size={16} /> Download
          </li>
        )}
        <li className="menu-item" onClick={() => { onRename(file); onClose(); }}>
          <Edit2 size={16} /> Rename
        </li>
        <li className="menu-item delete" onClick={() => { onDelete(file); onClose(); }}>
          <Trash2 size={16} /> Delete
        </li>
      </ul>
    </div>
  );
}
