import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  BOOK_CONTENT, 
  totalPages, 
  readingTimeMinutes,
  getUniqueChapters 
} from './bookContent';
import './ReaderPage.css';

// Mock Payment Service
const PaymentService = {
  validateAccessCode: async (code, ebookId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (code && code.startsWith('SN-')) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }, 500);
    });
  },
  
  verifyPayment: async (reference) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          data: { 
            accessCode: `SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
          } 
        });
      }, 500);
    });
  }
};

const ReaderPage = () => {
  const { ebookId = 'suicide-note-2026' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Constants
  const MIN_FONT = 14;
  const MAX_FONT = 24;
  
  // State
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('rdr_fontSize');
    return saved ? parseInt(saved) : 16;
  });
  
  const [currentPage, setCurrentPage] = useState(4); // Start from Chapter 1
  const [chapOpen, setChapOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('Chapter One: The Note Begins');
  const [accessCode, setAccessCode] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(null);

  // Unique chapters for navigation
  const uniqueChapters = getUniqueChapters();

  // Initialize access
  useEffect(() => {
    const initialize = async () => {
      const urlParams = new URLSearchParams(location.search);
      const codeFromUrl = urlParams.get('accessCode');
      const purchaseRef = urlParams.get('reference');
      
      try {
        setIsLoading(true);
        
        const savedCode = localStorage.getItem(`ebook_access_${ebookId}`);
        if (savedCode) {
          const validationResult = await PaymentService.validateAccessCode(savedCode, ebookId);
          
          if (validationResult.success) {
            setAccessCode(savedCode);
            setIsValidAccess(true);
            
            const savedBookmark = localStorage.getItem(`bookmark_${ebookId}`);
            if (savedBookmark) {
              const page = parseInt(savedBookmark);
              if (page > 0 && page <= BOOK_CONTENT.length) {
                setCurrentPage(page);
                setCurrentChapter(BOOK_CONTENT[page - 1].chapter);
              }
            }
            
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem(`ebook_access_${ebookId}`);
            setIsLoading(false);
            return;
          }
        }
        
        if (codeFromUrl) {
          const result = await PaymentService.validateAccessCode(codeFromUrl, ebookId);
          if (result.success) {
            setAccessCode(codeFromUrl);
            setIsValidAccess(true);
            localStorage.setItem(`ebook_access_${ebookId}`, codeFromUrl);
          }
        } else if (purchaseRef) {
          const result = await PaymentService.verifyPayment(purchaseRef);
          if (result.success) {
            const generatedCode = result.data?.accessCode || 
              `SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
            setAccessCode(generatedCode);
            setIsValidAccess(true);
            localStorage.setItem(`ebook_access_${ebookId}`, generatedCode);
          }
        }
      } catch (error) {
        console.error('Reader initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initialize();
  }, [ebookId, location.search]);

  // Save bookmark when page changes
  useEffect(() => {
    if (isValidAccess && currentPage) {
      localStorage.setItem(`bookmark_${ebookId}`, currentPage.toString());
      setBookmark(currentPage);
    }
  }, [currentPage, ebookId, isValidAccess]);

  // Save font size
  useEffect(() => {
    localStorage.setItem('rdr_fontSize', fontSize);
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
  }, [fontSize]);

  // Update chapter when page changes
  useEffect(() => {
    const content = BOOK_CONTENT.find(page => page.page === currentPage);
    if (content) {
      setCurrentChapter(content.chapter);
    }
  }, [currentPage]);

  // Format page content for display
  const formatPageContent = (content) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;
      
      const lines = trimmed.split('\n');
      if (lines.length > 1) {
        return lines.map((line, lineIndex) => {
          if (!line.trim()) return null;
          return <p key={`${index}-${lineIndex}`}>{line.trim()}</p>;
        });
      }
      
      return <p key={index}>{trimmed}</p>;
    });
  };

  // Handlers
  const handleFontDecrease = () => {
    if (fontSize > MIN_FONT) setFontSize(prev => prev - 1);
  };

  const handleFontIncrease = () => {
    if (fontSize < MAX_FONT) setFontSize(prev => prev + 1);
  };

  const handleChapterToggle = () => {
    setChapOpen(!chapOpen);
  };

  const handleChapterSelect = (chapter, pageNum) => {
    setCurrentPage(pageNum);
    setChapOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isValidAccess) return;
      
      if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey) {
        handlePrevPage();
      } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey) {
        handleNextPage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isValidAccess, currentPage]);

  // Progress percentage
  const progressPercentage = (currentPage / totalPages) * 100;

  // Current page content
  const currentContent = BOOK_CONTENT.find(page => page.page === currentPage) || BOOK_CONTENT[3];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your book...</p>
      </div>
    );
  }

  if (!isValidAccess) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>Please purchase the book to read the full content.</p>
        <button onClick={() => navigate('/')} className="home-btn">
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="reader-page">
      {/* Header */}
      <header className="header">
        <button className="header-back" onClick={() => navigate('/')}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
            <path d="M8 1L1 7.5L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="header-center">
          <div className="header-title">Suicide Note</div>
          <div className="header-author">by Loba Yusuf</div>
        </div>

        <div className="font-controls" role="group" aria-label="Font size controls">
          <button 
            className="font-btn" 
            onClick={handleFontDecrease}
            disabled={fontSize <= MIN_FONT}
            aria-label="Decrease font size"
          >
            −
          </button>
          <span className="font-size-label">{fontSize}px</span>
          <button 
            className="font-btn" 
            onClick={handleFontIncrease}
            disabled={fontSize >= MAX_FONT}
            aria-label="Increase font size"
          >
            +
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div 
        className="progress-bar-wrap" 
        role="progressbar" 
        aria-valuenow={currentPage} 
        aria-valuemin="1" 
        aria-valuemax={totalPages} 
        aria-label="Reading progress"
      >
        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* Chapter Toggle */}
      <div className="chapter-toggle-wrap">
        <button 
          className="chapter-toggle-btn" 
          onClick={handleChapterToggle}
          aria-expanded={chapOpen}
          aria-controls="chapterList"
        >
          <span className="chapter-toggle-icon">📖</span>
          <span className="chapter-toggle-label">{currentChapter}</span>
          <span className={`chapter-chevron ${chapOpen ? 'open' : ''}`} aria-hidden="true">⌄</span>
        </button>

        <div className={`chapter-list ${chapOpen ? 'open' : ''}`} id="chapterList" role="list">
          {uniqueChapters.map((item, index) => (
            <button
              key={index}
              className={`chapter-item ${item.chapter === currentChapter ? 'current' : ''}`}
              role="listitem"
              onClick={() => handleChapterSelect(item.chapter, item.page)}
            >
              {item.chapter}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Content */}
      <main className="reading-area">
        <article className="reading-text">
          {formatPageContent(currentContent.content)}
        </article>
      </main>

      {/* Page Navigation */}
      <nav className="page-nav" aria-label="Page navigation">
        <button 
          className="nav-btn" 
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <div className="page-indicator" aria-live="polite">
          Page {currentPage} of {totalPages}
        </div>
        <button 
          className="nav-btn" 
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          Next →
        </button>
      </nav>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-section">
          <div className="footer-label">Your Access Code</div>
          <div className="footer-code">{accessCode}</div>
        </div>

        <div className="footer-section">
          <div className="footer-distress">If you're experiencing emotional distress:</div>
          <div className="footer-emergency">🇳🇬 Nigeria Emergency: <strong>112</strong></div>
          <div className="footer-emergency">🏙️ Lagos Emergency: <strong>767</strong></div>
        </div>

        <div className="footer-section">
          <div className="footer-label">Follow the Author</div>
          <div className="footer-social-row">
            <span className="social-icon fb" aria-hidden="true">f</span>
            <a href="https://facebook.com/olorunloba.yusuf" className="footer-link" target="_blank" rel="noopener">olorunloba.yusuf</a>
          </div>
          <div className="footer-social-row">
            <span className="social-icon ig" aria-hidden="true">ig</span>
            <a href="https://instagram.com/loba_yusuf" className="footer-link" target="_blank" rel="noopener">@loba_yusuf</a>
          </div>
          <div className="footer-social-row">
            <span className="social-icon tw" aria-hidden="true">𝕏</span>
            <a href="https://twitter.com/loba_yusuf" className="footer-link" target="_blank" rel="noopener">@loba_yusuf</a>
          </div>
        </div>

        <div className="footer-meta">
          Reading time: ~{readingTimeMinutes} min &nbsp;·&nbsp; {totalPages} pages total
        </div>
      </footer>
    </div>
  );
};

export default ReaderPage;