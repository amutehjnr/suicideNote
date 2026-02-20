// src/pages/ReaderPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PaymentService from '../../services/PaymentService';
import toast from 'react-hot-toast';
import './ReaderPage.css';

// Book content (same as your ReaderPage)
const BOOK_CONTENT = [
  {
    page: 1,
    chapter: "Cover",
    content: `SUICIDE NOTE
by Loba Yusuf

Copyright © 2026 Loba Yusuf
All rights reserved.`,
    wordCount: 25
  },
  {
    page: 2,
    chapter: "Disclaimer",
    content: `Important Mental Health Notice

This book contains themes of depression, suicidal thoughts, emotional distress, and mental health struggles. It may be emotionally difficult for some readers.

This work is not intended to encourage or promote suicide, self-harm, or hopelessness. Its purpose is to reflect lived emotional experiences and highlight the importance of connection, understanding, and support.

Fiction Disclaimer
Suicide Note is a work of fiction. All characters, events, and situations are fictional.

Crisis Support Resources (Nigeria)
Nigeria Emergency Number: 112
Lagos Emergency Lines: 767 or 112`,
    wordCount: 120
  },
  {
    page: 3,
    chapter: "Dedication",
    content: `For everyone who has ever felt alone in a crowd,
For every soul that has whispered, "I can't do this anymore,"
For the fighters who wake up each morning and try again,
And for those who couldn't—may your memory inspire us to be kinder.

This is for Lagos, with all its chaos and beauty.
This is for Nigeria, with all its contradictions.
This is for humanity, in all its broken, beautiful glory.`,
    wordCount: 85
  },
  {
    page: 4,
    chapter: "Chapter 1: The Note Begins",
    content: `I'm writing this because I need someone to understand.

Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man. Not Tola, too busy with her husband and children to notice I've been disappearing for years. Not Deji, who has exams next week and a future that shouldn't be shadowed by this.

Someone. Anyone. Maybe no one.

I'm using loose sheets torn from an old exercise book that I used in my final year at LASU, pages still blank after the semester ended. I told myself I'd use them for something eventually. Grocery lists, maybe. Or tracking my Clash of Clans progress. But they've sat in that wardrobe for two years, and tonight, I finally know what they're for.

It's Friday, November 15, 2024. 11:47 PM. NEPA took light around nine—unusual, because they normally let us have power until at least ten on weekends. I'm sitting at the small table in my self-contain, writing by the light of my phone's flashlight propped against the wall. The battery is at 23%. When it dies, I'll have to stop, but by then this should be finished.`,
    wordCount: 180
  },
  {
    page: 5,
    chapter: "Chapter 1: The Note Begins (Continued)",
    content: `My name is Eliora Oluwafemi Adetayo. Eliora means my God is light, Oluwafemi—God loves me, and Adetayo—the crown meets joy. My parents named me like I was supposed to be something. Like these names would protect me or guide me or make me into a relevant person.

I am twenty-six years old. I have a degree in Business Administration from Lagos State University, Second Class Lower. I work as a warehouse associate for a Chinese import company in Apapa, scanning inventory and recording stock numbers. I make ₦65,000 a month. After transport, food, and rent—which my parents helped pay this year because I couldn't manage it alone—I have maybe ₦8,000 left for everything else. I live in Ojuelegba in a room so small I can touch opposite walls if I spread my arms wide enough.

This is my life. This has been my life for two and a half years, and I can't see how it will ever be different.`,
    wordCount: 150
  },
  {
    page: 6,
    chapter: "Chapter 1: The Note Begins (Continued)",
    content: `The thing about Lagos is, you can be surrounded by twenty million people and still drown in loneliness. I learned that slowly, the way you learn anything that kills you—one day at a time, so gradually you don't notice until you're already gone.

I wake up at 5 AM every day because my commute takes two hours. Danfo from Ojuelegba to CMS, then another from CMS to Apapa. I stand for most of the journey because there are never enough seats. I smell like sweat and exhaust fumes before I even get to work.

At work, I scan boxes. Boxes from China, boxes from India, boxes from Turkey. Boxes of shoes, boxes of clothes, boxes of electronics. Beep. Next. Beep. Next. Beep. Next. Eight hours of beeping.`,
    wordCount: 130
  }
  // ... rest of your BOOK_CONTENT (pages 7-23)
];

const ReaderPage = () => {
  const { ebookId = 'suicide-note-2026' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State from HTML version
  const MIN_FONT = 14;
  const MAX_FONT = 24;
  const TOTAL_PAGES = BOOK_CONTENT.length;
  
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('rdr_fontSize');
    return saved ? parseInt(saved) : 16;
  });
  
  const [currentPage, setCurrentPage] = useState(4);
  const [chapOpen, setChapOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('Chapter 1: The Note Begins');
  
  // Access control state
  const [accessCode, setAccessCode] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(null);

  // Initialize access (same as your ReaderPage)
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
            toast.error('Access expired. Please re-enter your access code.');
            navigate('/');
            return;
          }
        }
        
        if (codeFromUrl) {
          const result = await PaymentService.validateAccessCode(codeFromUrl, ebookId);
          if (result.success) {
            setAccessCode(codeFromUrl);
            setIsValidAccess(true);
            localStorage.setItem(`ebook_access_${ebookId}`, codeFromUrl);
            toast.success('Access granted! Enjoy reading.');
          } else {
            toast.error('Invalid access code');
            navigate('/');
          }
        } else if (purchaseRef) {
          const result = await PaymentService.verifyPayment(purchaseRef);
          if (result.success) {
            const generatedCode = result.data?.accessCode || 
              `SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
            setAccessCode(generatedCode);
            setIsValidAccess(true);
            localStorage.setItem(`ebook_access_${ebookId}`, generatedCode);
            toast.success('Payment verified! Enjoy reading.');
          } else {
            toast.error('Payment verification failed');
            navigate('/');
          }
        } else {
          toast.error('Please purchase the book to read');
          navigate('/');
        }
      } catch (error) {
        console.error('Reader initialization error:', error);
        toast.error('Error accessing book');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    initialize();
  }, [ebookId, navigate, location]);

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
  }, [fontSize]);

  // Update chapter when page changes
  useEffect(() => {
    const content = BOOK_CONTENT.find(page => page.page === currentPage);
    if (content) {
      setCurrentChapter(content.chapter);
    }
  }, [currentPage]);

  // Font controls
  const handleFontDecrease = () => {
    if (fontSize > MIN_FONT) {
      setFontSize(prev => prev - 1);
    }
  };

  const handleFontIncrease = () => {
    if (fontSize < MAX_FONT) {
      setFontSize(prev => prev + 1);
    }
  };

  // Chapter toggle
  const handleChapterToggle = () => {
    setChapOpen(!chapOpen);
  };

  const handleChapterSelect = (chapter, pageNum) => {
    setCurrentPage(pageNum);
    setChapOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Progress percentage
  const progressPercentage = (currentPage / TOTAL_PAGES) * 100;

  // Current page content
  const currentContent = BOOK_CONTENT.find(page => page.page === currentPage) || BOOK_CONTENT[3];

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#f5f0eb'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #ddd8d0',
          borderTopColor: '#8b1a1a',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{ color: '#1a1a1a', fontFamily: '-apple-system, Helvetica Neue, sans-serif' }}>Loading your book...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isValidAccess) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#f5f0eb',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#8b1a1a', marginBottom: '12px', fontFamily: '-apple-system, Helvetica Neue, sans-serif' }}>Access Denied</h2>
        <p style={{ color: '#1a1a1a', marginBottom: '24px', maxWidth: '400px', fontFamily: '-apple-system, Helvetica Neue, sans-serif' }}>
          Please purchase the book to read the full content.
        </p>
        <button 
          onClick={() => navigate('/')} 
          style={{
            background: '#fff',
            border: '1px solid #ddd8d0',
            borderRadius: '10px',
            padding: '12px 24px',
            fontFamily: '-apple-system, Helvetica Neue, sans-serif',
            fontSize: '15px',
            fontWeight: '500',
            color: '#1a1a1a',
            cursor: 'pointer'
          }}
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ══ HEADER - EXACT HTML ═══════════════════════════ */}
      <header className="header">
        <button onClick={() => navigate('/')} className="header-back">
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
          >
            −
          </button>
          <span className="font-size-label">{fontSize}px</span>
          <button 
            className="font-btn" 
            onClick={handleFontIncrease}
            disabled={fontSize >= MAX_FONT}
          >
            +
          </button>
        </div>
      </header>

      {/* ══ PROGRESS BAR - EXACT HTML ═══════════════════ */}
      <div 
        className="progress-bar-wrap" 
        role="progressbar" 
        aria-valuenow={currentPage} 
        aria-valuemin="1" 
        aria-valuemax={TOTAL_PAGES}
      >
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* ══ CHAPTER TOGGLE - EXACT HTML ═════════════════ */}
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
          {BOOK_CONTENT.map((page) => (
            <button
              key={page.page}
              className={`chapter-item ${currentPage === page.page ? 'current' : ''}`}
              role="listitem"
              onClick={() => handleChapterSelect(page.chapter, page.page)}
            >
              {page.chapter}
            </button>
          ))}
        </div>
      </div>

      {/* ══ READING CONTENT - EXACT HTML ════════════════ */}
      <main className="reading-area">
        <article className="reading-text" id="readingText" style={{ fontSize: `${fontSize}px` }}>
          {currentContent.content.split('\n').map((paragraph, idx) => {
            if (!paragraph.trim()) return null;
            if (currentPage === 4 && idx === 2) { // The "Someone. Anyone. Maybe no one." line
              return <p key={idx}><span className="opener">{paragraph}</span></p>;
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </article>
      </main>

      {/* ══ PAGE NAVIGATION - EXACT HTML ════════════════ */}
      <nav className="page-nav" aria-label="Page navigation">
        <button 
          className="nav-btn" 
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <div className="page-indicator" aria-live="polite">
          Page {currentPage} of {TOTAL_PAGES}
        </div>
        <button 
          className="nav-btn" 
          onClick={handleNextPage}
          disabled={currentPage >= TOTAL_PAGES}
        >
          Next →
        </button>
      </nav>

      {/* ══ FOOTER - EXACT HTML ═════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-section">
          <div className="footer-label">Your Access Code</div>
          <div className="footer-code">{accessCode || 'SN-MLQFLMOV-3B9CF9'}</div>
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

        <div className="footer-meta">Reading time: ~{Math.max(1, Math.round(currentContent.wordCount / 200))} min &nbsp;·&nbsp; {TOTAL_PAGES} pages total</div>
      </footer>
    </>
  );
};

export default ReaderPage;