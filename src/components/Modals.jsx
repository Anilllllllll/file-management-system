import React, { useRef, useState } from 'react';
import { X, UploadCloud, FolderPlus } from 'lucide-react';
import './Modals.css';

export function UploadModal({ isOpen, onClose, onUpload }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => onUpload(file));
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content glass-panel animate-slide-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload Files</h3>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div 
            className={`upload-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud size={48} className="upload-icon" />
            <p>Drag and drop files here, or click to browse</p>
            <input 
              ref={fileInputRef} type="file" multiple 
              style={{ display: 'none' }} onChange={handleChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewFolderModal({ isOpen, onClose, onCreate }) {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreate(folderName.trim());
      setFolderName('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content glass-panel animate-slide-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Folder</h3>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="input-group">
            <label>Folder Name</label>
            <input 
              autoFocus
              type="text" 
              value={folderName} 
              onChange={e => setFolderName(e.target.value)} 
              placeholder="e.g., Project Assets" 
              className="text-input"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={!folderName.trim()}>
              <FolderPlus size={18} /> Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
