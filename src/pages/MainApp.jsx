import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import FileGrid from '../components/FileGrid';
import ContextMenu from '../components/ContextMenu';
import { UploadModal, NewFolderModal } from '../components/Modals';
import useFileManager from '../hooks/useFileManager';

export default function MainApp() {
  const { files, addFolder, addFile, deleteItem, renameItem, getFilesByParent } = useFileManager();
  
  const [activeCategory, setActiveCategory] = useState('Home');
  const [currentPath, setCurrentPath] = useState([{ id: 'root', name: 'Home' }]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  
  // Context Menu state
  const [contextMenu, setContextMenu] = useState(null);

  // Sync Sidebar category to Path navigation
  useEffect(() => {
    if (activeCategory === 'Home') {
      setCurrentPath([{ id: 'root', name: 'Home' }]);
    } else {
      const folder = files.find(f => f.name === activeCategory && f.type === 'folder' && f.parentId === 'root');
      if (folder) {
        setCurrentPath([{ id: 'root', name: 'Home' }, { id: folder.id, name: folder.name }]);
      } else {
        setCurrentPath([{ id: 'root', name: 'Home' }, { id: `folder-${activeCategory.toLowerCase()}`, name: activeCategory }]);
      }
    }
  }, [activeCategory, files]);

  // Sync Path to Sidebar category
  useEffect(() => {
    if (currentPath.length === 1 && currentPath[0].id === 'root') {
      if (activeCategory !== 'Home') setActiveCategory('Home');
    } else if (currentPath.length === 2 && currentPath[0].id === 'root') {
      if (activeCategory !== currentPath[1].name) setActiveCategory(currentPath[1].name);
    } else {
      setActiveCategory(''); // Custom deep path
    }
  }, [currentPath]);

  const handleNavigateTo = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const handleNavigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };
  
  const handleFolderClick = (folder) => {
    setCurrentPath([...currentPath, { id: folder.id, name: folder.name }]);
  };

  const handleContextMenu = (e, file) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const currentFolderId = currentPath[currentPath.length - 1].id;
  
  const displayedFiles = useMemo(() => {
    let result = getFilesByParent(currentFolderId);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = files.filter(f => f.name.toLowerCase().includes(query));
    }
    return result.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [currentFolderId, files, searchQuery, getFilesByParent]);

  const handleRename = (file) => {
    const newName = prompt(`Enter new name for ${file.name}:`, file.name);
    if (newName && newName.trim() && newName !== file.name) {
      renameItem(file.id, newName.trim());
    }
  };

  return (
    <div className="app-container" onClick={() => setContextMenu(null)}>
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      <main className="main-content" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar 
          currentPath={currentPath}
          onNavigateUp={handleNavigateUp}
          onNavigateTo={handleNavigateTo}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNewFolder={() => setIsNewFolderOpen(true)}
          onUpload={() => setIsUploadOpen(true)}
        />
        
        <div className="file-area glass-panel" style={{ flex: 1, borderRadius: '1rem', padding: '1.5rem', overflowY: 'auto' }}>
          <FileGrid 
            files={displayedFiles}
            viewMode={viewMode}
            onFolderClick={handleFolderClick}
            onContextMenu={handleContextMenu}
          />
        </div>
      </main>

      <ContextMenu 
        position={contextMenu} 
        file={contextMenu?.file}
        onClose={() => setContextMenu(null)}
        onDelete={(f) => deleteItem(f.id)}
        onRename={handleRename}
      />

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUpload={(file) => addFile(file, currentFolderId)}
      />

      <NewFolderModal 
        isOpen={isNewFolderOpen} 
        onClose={() => setIsNewFolderOpen(false)} 
        onCreate={(name) => addFolder(name, currentFolderId)}
      />
    </div>
  );
}
