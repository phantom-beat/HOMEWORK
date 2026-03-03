import { useState } from 'react';
import { SongsPage } from './pages/SongsPage';
import { BrowserHistoryPage } from './pages/BrowserHistoryPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'songs' | 'browser'>('songs');

  const handleNavigate = (page: 'songs' | 'browser') => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      {currentPage === 'songs' && <SongsPage onNavigate={handleNavigate} />}
      {currentPage === 'browser' && <BrowserHistoryPage onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
