import { useState, useEffect, useMemo } from 'react';

const INITIAL_DATA = [
  { id: 'folder-invoices', name: 'Invoices', type: 'folder', parentId: 'root', size: '-', modified: new Date().toLocaleDateString() },
  { id: 'folder-receipts', name: 'Receipts', type: 'folder', parentId: 'root', size: '-', modified: new Date().toLocaleDateString() },
  { id: 'folder-contracts', name: 'Contracts', type: 'folder', parentId: 'root', size: '-', modified: new Date().toLocaleDateString() },
  { id: 'folder-reports', name: 'Reports', type: 'folder', parentId: 'root', size: '-', modified: new Date().toLocaleDateString() },
  { id: 'file-1', name: 'Q1_Report.pdf', type: 'document', parentId: 'folder-reports', size: '2.4 MB', modified: new Date().toLocaleDateString() },
  { id: 'file-2', name: 'Invoice_001.pdf', type: 'document', parentId: 'folder-invoices', size: '1.2 MB', modified: new Date().toLocaleDateString() },
  { id: 'file-3', name: 'Company_Logo.png', type: 'image', parentId: 'root', size: '1.8 MB', modified: new Date().toLocaleDateString() },
  { id: 'file-4', name: 'Financial_Statement.xlsx', type: 'spreadsheet', parentId: 'root', size: '3.5 MB', modified: new Date().toLocaleDateString() },
];

export default function useFileManager() {
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('futura-files-v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  // Save to local storage whenever files change
  useEffect(() => {
    localStorage.setItem('futura-files-v1', JSON.stringify(files));
  }, [files]);

  const addFolder = (name, parentId = 'root') => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      parentId,
      size: '-',
      modified: new Date().toLocaleDateString()
    };
    setFiles(prev => [...prev, newFolder]);
  };

  const addFile = (fileObj, parentId = 'root') => {
    const newFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: fileObj.name,
      type: getFileType(fileObj),
      parentId,
      size: formatFileSize(fileObj.size),
      modified: new Date().toLocaleDateString()
    };
    setFiles(prev => [...prev, newFile]);
  };

  const deleteItem = (id) => {
    // Note: To truly delete a folder, we should also delete all children.
    // Simplifying here for now by just deleting the item by ID.
    setFiles(prev => prev.filter(f => f.id !== id && f.parentId !== id));
  };

  const renameItem = (id, newName) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, name: newName } : f));
  };

  const getFilesByParent = (parentId) => {
    return files.filter(f => f.parentId === parentId);
  };

  return {
    files,
    addFolder,
    addFile,
    deleteItem,
    renameItem,
    getFilesByParent
  };
}

// Helpers
function getFileType(file) {
  if (file.type.startsWith('image/')) return 'image';
  if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) return 'spreadsheet';
  if (file.name.endsWith('.pptx') || file.name.endsWith('.ppt')) return 'presentation';
  if (file.name.endsWith('.pdf')) return 'document';
  return 'document';
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
