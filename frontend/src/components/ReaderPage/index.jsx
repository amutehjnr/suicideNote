import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import './ReaderPage.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Mock Payment Service
const PaymentService = {
  validateAccessCode: async (code, ebookId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (code && (code.startsWith('SN-') || code.startsWith('FREE-'))) {
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

// PDF metadata (chapters with their starting pages)
const PDF_CHAPTERS = [
  { chapter: "Cover", page: 1 },
  { chapter: "Important Mental Health Notice", page: 4 },
  { chapter: "Fiction Disclaimer", page: 5 },
  { chapter: "Crisis Support Resources", page: 6 },
  { chapter: "CONTENTS", page: 7 },
  { chapter: "Chapter One: The Note Begins", page: 8 },
  { chapter: "Chapter Two: The Days After", page: 21 },
  { chapter: "Chapter Three: One More Chance", page: 31 },
  { chapter: "Chapter Four: Strangers Who Understand", page: 42 },
  { chapter: "Chapter Five: The Facebook Confession", page: 54 },
  { chapter: "Chapter Six: Learning to Reach", page: 65 },
  { chapter: "Chapter Seven: The First Meeting", page: 79 },
  { chapter: "Chapter Eight: Something Worth Fighting For", page: 90 },
  { chapter: "Chapter Nine: Years Later", page: 105 },
  { chapter: "Chapter Ten: What Was Always There", page: 116 },
  { chapter: "Crisis Support Resources", page: 123 },
  { chapter: "A Note From the Author", page: 124 }
];

const PDF_TOTAL_PAGES = 124;

const ReaderPage = () => {
  const { ebookId = 'suicide-note-2026' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Constants
  const MIN_SCALE = 0.6;
  const MAX_SCALE = 2.0;
  
  // State
  const [scale, setScale] = useState(() => {
    const saved = localStorage.getItem('rdr_scale');
    return saved ? parseFloat(saved) : 1.0;
  });
  
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(`bookmark_${ebookId}`);
    return saved ? parseInt(saved) : 1;
  });
  
  const [chapOpen, setChapOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('Cover');
  const [accessCode, setAccessCode] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pdfError, setPdfError] = useState(false);

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
              if (page > 0 && page <= PDF_TOTAL_PAGES) {
                setCurrentPage(page);
                updateChapterFromPage(page);
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

  // Update chapter based on current page
  const updateChapterFromPage = (page) => {
    let chapter = "Cover";
    for (let i = PDF_CHAPTERS.length - 1; i >= 0; i--) {
      if (page >= PDF_CHAPTERS[i].page) {
        chapter = PDF_CHAPTERS[i].chapter;
        break;
      }
    }
    setCurrentChapter(chapter);
  };

  // Save bookmark when page changes
  useEffect(() => {
    if (isValidAccess && currentPage) {
      localStorage.setItem(`bookmark_${ebookId}`, currentPage.toString());
      updateChapterFromPage(currentPage);
    }
  }, [currentPage, ebookId, isValidAccess]);

  // Save scale
  useEffect(() => {
    localStorage.setItem('rdr_scale', scale.toString());
  }, [scale]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setPdfError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    setPdfError(true);
    setIsLoading(false);
  };

  // Handlers
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, MAX_SCALE));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, MIN_SCALE));
  };

  const handleChapterToggle = () => {
    setChapOpen(!chapOpen);
  };

  const handleChapterSelect = (chapter, pageNum) => {
    setCurrentPage(pageNum);
    setChapOpen(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < PDF_TOTAL_PAGES) {
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
  const progressPercentage = (currentPage / PDF_TOTAL_PAGES) * 100;

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

  if (pdfError) {
    return (
      <div className="access-denied">
        <h2>PDF Error</h2>
        <p>Could not load the PDF file. Please contact support.</p>
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

        <div className="font-controls" role="group" aria-label="Zoom controls">
          <button 
            className="font-btn" 
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="font-size-label">{Math.round(scale * 100)}%</span>
          <button 
            className="font-btn" 
            onClick={handleZoomIn}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
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
        aria-valuemax={PDF_TOTAL_PAGES} 
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
          {PDF_CHAPTERS.map((item, index) => (
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

      {/* PDF Viewer */}
      <main className="reading-area">
        <div className="pdf-container">
          <Document
            file={`${import.meta.env.BASE_URL}books/${ebookId}.pdf`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="pdf-loading">
                <div className="spinner"></div>
                <p>Loading PDF...</p>
              </div>
            }
          >
            <Page 
              pageNumber={currentPage} 
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
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
          Page {currentPage} of {PDF_TOTAL_PAGES}
        </div>
        <button 
          className="nav-btn" 
          onClick={handleNextPage}
          disabled={currentPage >= PDF_TOTAL_PAGES}
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
          Reading time: ~{Math.ceil(PDF_TOTAL_PAGES / 2)} min &nbsp;·&nbsp; {PDF_TOTAL_PAGES} pages total
        </div>
      </footer>
    </div>
  );
};

export default ReaderPage;