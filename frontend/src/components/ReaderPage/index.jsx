// src/pages/ReaderPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PaymentService from '../../services/PaymentService';
import toast from 'react-hot-toast';
import './ReaderPage.css';

// Book content divided into multiple pages/chapters
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

It's Friday, November 15, 2024. 11:47 PM. NEPA took light around nine—unusual, because they normally let us have power until at least ten on weekends. I'm sitting at the small table in my self-contain, writing by the light of my phone's flashlight propped against the wall. The battery is at 23%.`,
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
  },
  {
    page: 7,
    chapter: "Chapter 2: The Daily Grind",
    content: `My supervisor is Mr. Chen. He doesn't speak much English, just points and says "fast, fast" or "check, check." Sometimes he brings me a bottle of water. Sometimes he doesn't. I don't know if it's kindness or just making sure his scanner doesn't break down from dehydration.

I eat lunch at my station—bread and egg from Mama Chidi's stall outside. ₦300. Sometimes I skip and just drink water. The hunger reminds me I'm alive, at least. That's something.

At 5 PM, I reverse the journey. Two more hours standing. More sweat. More exhaust. More bodies pressed against mine. More pretending I don't exist.`,
    wordCount: 120
  },
  {
    page: 8,
    chapter: "Chapter 2: The Daily Grind (Continued)",
    content: `Home. The room is hot even though it's November. Harmattan is supposed to be coming, but Lagos doesn't always get the memo. I turn on the small standing fan my father bought me last Christmas. It moves the hot air around but doesn't cool anything.

I boil water for noodles. Indomie, chicken flavor. ₦200. While it cooks, I scroll through Instagram. Friends from university getting married. Having babies. Traveling to Dubai. Starting businesses. I watch their stories like I'm watching a movie about another universe.

I eat the noodles straight from the pot. No plate to wash. I drink the broth. It's salty and hot and for a moment, it fills the emptiness. Then it's gone, and the emptiness returns, bigger than before.`,
    wordCount: 140
  },
  {
    page: 9,
    chapter: "Chapter 3: The Nights",
    content: `Night is the hardest. During the day, there's noise. There's movement. There's pretending. But at night, in this room, there's just me and my thoughts. And my thoughts are not good company.

I masturbate. Not because I'm thinking about anyone or because I want to—but because when the urge comes, I don't have the energy to resist. It's a biological function, like blinking or breathing. A moment of feeling something, then shame, then nothing.

After, I lie in the dark and listen to the sounds of Ojuelegba. Motorcycles revving. People arguing. Music from a bar down the street. A baby crying. Life happening all around me, while I'm frozen in this room.`,
    wordCount: 130
  },
  {
    page: 10,
    chapter: "Chapter 3: The Nights (Continued)",
    content: `Sometimes I think about calling someone. My mother. She'd ask about work. About church. About when I'm getting married. I'd lie and say everything is fine. She'd believe me because she wants to believe me.

Tola, my older sister. She has three children and a husband who works in the UK. She sends me ₦10,000 every month "for transport." I take it even though it hurts. She thinks she's helping. She doesn't know she's reminding me how much I've failed.

Deji, my younger brother. He's in medical school. He'll be a doctor. He'll save lives. He already has a future. I don't want to taint it with my darkness.`,
    wordCount: 120
  },
  {
    page: 11,
    chapter: "Chapter 4: The Weekend",
    content: `Saturday. No work. This should be a good thing. Time to rest. Time to live. But without the structure of work, I don't know what to do with myself.

I sleep until noon. The room is hot when I wake up. Sweat sticks my body to the mattress. I get up, take a bucket bath. The water is cold and for a moment, I feel clean. Then I put on the same clothes I wore yesterday.

I should go out. To the mall. To a cafe. To church. But the thought of pretending to be normal for hours exhausts me. So I stay in. I scroll. I sleep some more. I wait for Monday.`,
    wordCount: 110
  },
  {
    page: 12,
    chapter: "Chapter 4: The Weekend (Continued)",
    content: `Sunday. My mother calls. "Eliora, how are you? Are you coming for service?"

"I have to work, Mummy." Lie.

"On Sunday? What kind of work is that?"

"It's Chinese company, Mummy. They don't know Sunday."

She sighs. "Okay o. But next week, you must come. Pastor is preaching about breakthrough."

"I will, Mummy."

I won't.

After the call, I feel worse. I've disappointed her again. I'm disappointing everyone. Myself most of all.`,
    wordCount: 100
  },
  {
    page: 13,
    chapter: "Chapter 5: The Breaking Point",
    content: `It's been building for months. Years, maybe. But today something broke.

At work, Mr. Chen yelled at me because I missed a box. "Stupid! Stupid girl!" he shouted. Everyone looked. Everyone saw. I didn't cry. I just kept scanning. Beep. Next. Beep. Next.

On the way home, a danfo conductor grabbed my arm too hard. "Enter now! We're going!" I pulled away. He called me a witch. People laughed.

In my room, I looked at myself in the small mirror. My eyes were empty. My face was pale. My hair was dry. I looked like a ghost of the girl I used to be.`,
    wordCount: 110
  },
  {
    page: 14,
    chapter: "Chapter 5: The Breaking Point (Continued)",
    content: `That's when I decided. Not in a dramatic way. Not with tears or anger. Just quietly. Like deciding what to eat for dinner.

I'll write this note. Then I'll take all the paracetamol in the cabinet. Then I'll go to sleep and not wake up.

It makes sense. Really, it does. I'm a burden. To my parents. To my siblings. To myself. I'm taking up space and air and food that someone better could use.

I'm writing this so maybe, someday, someone will understand why. Not forgive. Just understand.`,
    wordCount: 110
  },
  {
    page: 15,
    chapter: "Chapter 6: The Memory",
    content: `But as I write, I remember something.

University. Third year. I was happy then. Or at least, I thought I was.

I had friends. We'd sit under the trees at LASU and talk about our dreams. Mine was to start a business. A small cafe where people could come and feel at home. Where the coffee would be good and the wifi would be free and no one would be lonely.

We'd plan it in detail. The menu. The decor. The music. We even picked a name: "The Quiet Place."

What happened to that girl? Where did she go?`,
    wordCount: 110
  },
  {
    page: 16,
    chapter: "Chapter 6: The Memory (Continued)",
    content: `I remember graduation day. My parents were so proud. My mother wore her best aso-ebi. My father took photos with everyone. Tola came with her husband. Deji was there in his school uniform.

We went to Chicken Republic to celebrate. We ate and laughed. My father said, "Now the real life begins." I believed him. I thought it would be wonderful.

That was four years ago. Four years of scanning boxes. Four years of loneliness. Four years of becoming a ghost.`,
    wordCount: 100
  },
  {
    page: 17,
    chapter: "Chapter 7: The Interruption",
    content: `My phone buzzes. A WhatsApp message. It's from a number I don't recognize.

"Hello Eliora, this is Mrs. Okonkwo from church. Your mother gave me your number. We're having a youth program tomorrow. Can you come and help with decorations?"

I stare at the message. A stranger reaching out. A simple request. Help with decorations.

I should ignore it. Delete it. Block the number.

But something in me hesitates. Just for a second.`,
    wordCount: 90
  },
  {
    page: 18,
    chapter: "Chapter 7: The Interruption (Continued)",
    content: `I put down the pen. The note is unfinished. The pills are still in the cabinet.

I look at the message again. "Can you come and help with decorations?"

It's such a normal thing. Such a human thing. Not "Are you okay?" Not "Do you need help?" Just "Can you help?"

Maybe that's what I need. Not to be helped, but to help. To be useful. To matter to someone, even in a small way.

I pick up my phone. My fingers hover over the keyboard.

What do I say?`,
    wordCount: 100
  },
  {
    page: 19,
    chapter: "Chapter 8: The Decision",
    content: `I type: "Yes, I can help. What time?"

I send it before I can change my mind.

The reply comes immediately: "Thank you! 4 PM at the church hall. God bless you."

God bless you. Three words. Simple. Common. But they feel like a hand reaching into the darkness.

I look at the unfinished note. At the pen. At the pills.

Maybe not today. Maybe just for today, I'll choose to live.`,
    wordCount: 90
  },
  {
    page: 20,
    chapter: "Chapter 8: The Decision (Continued)",
    content: `I tear up the note. Not all of it—I keep the first page. As a reminder. Of how close I came. Of how thin the line is between staying and going.

I flush the pills down the toilet. They swirl and disappear. Gone.

I take a deep breath. The room is still hot. The fan is still just moving hot air. I'm still broke. I still hate my job.

But for today, I'm alive. And for today, that's enough.

Tomorrow, I'll help with decorations.`,
    wordCount: 100
  },
  {
    page: 21,
    chapter: "Epilogue: One Year Later",
    content: `I never finished that note. I'm glad.

The church program led to another. Then to volunteering at a youth center. Then to meeting people. Real people, not just Instagram profiles.

I still work at the warehouse. But now I'm saving for my cafe. ₦5,000 a month. It'll take years, but I have years now.

I go to therapy once a month. It's expensive, but it helps. Talking helps.`,
    wordCount: 80
  },
  {
    page: 22,
    chapter: "Epilogue: One Year Later (Continued)",
    content: `I'm writing this from The Quiet Place. Not my dream cafe—not yet. But a quiet corner in a public library where I come to read and write and remember.

Remember that I almost left. Remember that I stayed.

Remember that healing isn't a straight line. Some days are still hard. Some nights are still long. But there are more good days now. More reasons to stay.

This isn't a happy ending. It's a continuing story. My story.`,
    wordCount: 90
  },
  {
    page: 23,
    chapter: "Author's Note",
    content: `To the reader,

If you're reading this and you understand Eliora's pain, please know: You are not alone. Your pain is real. Your struggle is valid. And there is hope, even when you can't see it.

Reach out. To a friend. To a family member. To a helpline. To me, if you want (loba@suicidenote.com).

Keep fighting. One day at a time. One hour at a time. One breath at a time.

You matter. Your story matters. Keep writing it.

With hope,
Loba Yusuf`,
    wordCount: 100
  }
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
  
  // State from ReaderPage
  const [accessCode, setAccessCode] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(null);

  // Initialize access
  useEffect(() => {
    const initialize = async () => {
      console.log('📖 ReaderPage initialized for ebook:', ebookId);
      
      const urlParams = new URLSearchParams(location.search);
      const codeFromUrl = urlParams.get('accessCode');
      const purchaseRef = urlParams.get('reference');
      
      try {
        setIsLoading(true);
        
        // Check for saved access
        const savedCode = localStorage.getItem(`ebook_access_${ebookId}`);
        if (savedCode) {
          console.log('✅ Found saved access code:', savedCode);
          const validationResult = await PaymentService.validateAccessCode(savedCode, ebookId);
          
          if (validationResult.success) {
            setAccessCode(savedCode);
            setIsValidAccess(true);
            
            // Restore bookmark
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
        
        // Handle URL access code
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
        }
        // Handle payment reference
        else if (purchaseRef) {
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
        }
        // No access - redirect
        else {
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentPage(TOTAL_PAGES);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Progress percentage
  const progressPercentage = (currentPage / TOTAL_PAGES) * 100;

  // Current page content
  const currentContent = BOOK_CONTENT.find(page => page.page === currentPage) || BOOK_CONTENT[3];

  // Loading state
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

  // Access denied state
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
      {/* ══ HEADER ══════════════════════════════════════════ */}
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

      {/* ══ PROGRESS BAR ═════════════════════════════════════ */}
      <div 
        className="progress-bar-wrap" 
        role="progressbar" 
        aria-valuenow={currentPage} 
        aria-valuemin="1" 
        aria-valuemax={TOTAL_PAGES}
        aria-label="Reading progress"
      >
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* ══ CHAPTER TOGGLE ══════════════════════════════════ */}
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

      {/* ══ READING CONTENT ═════════════════════════════════ */}
      <main className="reading-area">
        <article 
          className="reading-text" 
          id="readingText"
          style={{ fontSize: `${fontSize}px` }}
        >
          {currentContent.content.split('\n').map((paragraph, idx) => {
            if (!paragraph.trim()) return null;
            
            // Check if this is the first paragraph of Chapter 1 to add opener class
            if (currentPage === 4 && idx === 0 && paragraph.includes('Someone.')) {
              return <p key={idx}><span className="opener">{paragraph}</span></p>;
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </article>
      </main>

      {/* ══ PAGE NAVIGATION ═════════════════════════════════ */}
      <nav className="page-nav" aria-label="Page navigation">
        <button 
          className="nav-btn" 
          id="prevBtn"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <div className="page-indicator" id="pageIndicator" aria-live="polite">
          Page {currentPage} of {TOTAL_PAGES}
        </div>
        <button 
          className="nav-btn" 
          id="nextBtn"
          onClick={handleNextPage}
          disabled={currentPage >= TOTAL_PAGES}
          aria-label="Next page"
        >
          Next →
        </button>
      </nav>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
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