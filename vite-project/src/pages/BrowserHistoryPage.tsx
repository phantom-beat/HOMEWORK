import { useState } from 'react';
import { DoublyLinkedList } from '../structures/DoublyLinkedList';
import type { Page } from '../structures/DoublyLinkedList';
import './BrowserHistoryPage.css';

const mockPages: Page[] = [
  { id: 1, title: 'Google', url: 'https://google.com', timestamp: '10:15 AM' },
  { id: 2, title: 'React Documentation', url: 'https://react.dev', timestamp: '10:30 AM' },
  { id: 3, title: 'MDN Web Docs', url: 'https://mdn.mozilla.org', timestamp: '10:45 AM' },
  { id: 4, title: 'Stack Overflow', url: 'https://stackoverflow.com', timestamp: '11:00 AM' },
  { id: 5, title: 'GitHub', url: 'https://github.com', timestamp: '11:30 AM' },
  { id: 6, title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org', timestamp: '12:00 PM' },
];

export function BrowserHistoryPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [browserHistory] = useState<DoublyLinkedList<Page>>(() => {
    const list = new DoublyLinkedList<Page>();
    mockPages.forEach(page => list.append(page));
    return list;
  });

  const [allPages] = useState(browserHistory.getAll());
  const [currentPage, setCurrentPage] = useState<Page | null>(browserHistory.getCurrentPage());
  const [canGoBack, setCanGoBack] = useState(browserHistory.canGoBack());
  const [canGoForward, setCanGoForward] = useState(browserHistory.canGoForward());

  const updatePageState = (list: DoublyLinkedList<Page>) => {
    setCurrentPage(list.getCurrentPage());
    setCanGoBack(list.canGoBack());
    setCanGoForward(list.canGoForward());
  };

  const goBack = () => {
    const prevPage = browserHistory.getPrev();
    if (prevPage) {
      updatePageState(browserHistory);
    }
  };

  const goForward = () => {
    const nextPage = browserHistory.getNext();
    if (nextPage) {
      updatePageState(browserHistory);
    }
  };

  const visitPage = (pageIndex: number) => {
    // Reset the list and navigate to the selected page
    const newList = new DoublyLinkedList<Page>();
    allPages.slice(0, pageIndex + 1).forEach(page => newList.append(page));
    
    // Update the state through the original list reference
    let current = browserHistory.getCurrentPage();
    while (current && allPages.indexOf(current) < pageIndex) {
      browserHistory.getNext();
      current = browserHistory.getCurrentPage();
    }
    while (current && allPages.indexOf(current) > pageIndex) {
      browserHistory.getPrev();
      current = browserHistory.getCurrentPage();
    }
    
    updatePageState(browserHistory);
  };

  return (
    <div className="browser-page">
      <div className="header">
        <h1>🌐 Browser History Navigator</h1>
        <button className="nav-btn" onClick={() => onNavigate('songs')}>
          Go to Music Player
        </button>
      </div>

      <div className="browser-container">
        <div className="browser-controls">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className="browser-btn back-btn"
            title="Go to previous page"
          >
            ← Back
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className="browser-btn forward-btn"
            title="Go to next page"
          >
            Forward →
          </button>
        </div>

        {currentPage ? (
          <div className="page-info">
            <div className="url-bar">
              <span className="url-icon">🔗</span>
              <input type="text" value={currentPage.url} readOnly className="url-input" />
            </div>
            <div className="page-content">
              <h2>{currentPage.title}</h2>
              <p className="page-details">
                <span className="detail-item">📍 URL: {currentPage.url}</span>
                <span className="detail-item">⏰ Visited: {currentPage.timestamp}</span>
                <span className="detail-item">📊 Page ID: {currentPage.id}</span>
              </p>
            </div>
          </div>
        ) : (
          <p>No page loaded</p>
        )}
      </div>

      <div className="history-list">
        <h3>📜 Browsing History</h3>
        <ul className="pages-list">
          {allPages.map((page, index) => {
            const isCurrentPage = currentPage?.id === page.id;
            const isVisited = index <= allPages.indexOf(currentPage!);
            return (
              <li
                key={page.id}
                onClick={() => visitPage(index)}
                className={`${isCurrentPage ? 'active' : ''} ${isVisited ? 'visited' : 'not-visited'}`}
              >
                <span className="page-icon">
                  {isCurrentPage ? '📄' : '📋'}
                </span>
                <div className="page-item-info">
                  <span className="page-title">{page.title}</span>
                  <span className="page-url">{page.url}</span>
                </div>
                <span className="page-time">{page.timestamp}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="history-stats">
        <p>Pages visited: {allPages.indexOf(currentPage!) + 1} / {allPages.length}</p>
        <p>Navigation available: {'Back' in (canGoBack ? { Back: true } : {})}
          {canGoBack && canGoForward ? ', Forward' : canGoForward ? 'Forward' : ''}
        </p>
      </div>
    </div>
  );
}
