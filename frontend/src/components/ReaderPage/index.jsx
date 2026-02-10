// src/pages/ReaderPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../shared/Icons';
import styles from './ReaderPage.module.css';
import '../shared/styles.css';
import PaymentService from '../../services/PaymentService';
import toast from 'react-hot-toast';

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
  
  const [currentPage, setCurrentPage] = useState(1);
  const [accessCode, setAccessCode] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [progress, setProgress] = useState(0);
  const [bookmark, setBookmark] = useState(null);

  // Initialize
  useEffect(() => {
  const initialize = async () => {
    console.log('📖 ReaderPage initialized for ebook:', ebookId);
    
    // Check for access code in URL params
    const urlParams = new URLSearchParams(location.search);
    const codeFromUrl = urlParams.get('accessCode');
    const purchaseRef = urlParams.get('reference');
    
    // Try to validate access
    try {
      setIsLoading(true);
      
      // First, check localStorage for existing access
      const savedCode = localStorage.getItem(`ebook_access_${ebookId}`);
      if (savedCode) {
        console.log('✅ Found saved access code:', savedCode);
        
        // ⚠️ IMPORTANT: Re-validate with database
        console.log('🔒 Re-validating saved code with database...');
        const validationResult = await PaymentService.validateAccessCode(savedCode, ebookId);
        
        if (validationResult.success) {
          console.log('✅ Database re-validation successful');
          setAccessCode(savedCode);
          setIsValidAccess(true);
          
          // Restore bookmark if exists
          const savedBookmark = localStorage.getItem(`bookmark_${ebookId}`);
          if (savedBookmark) {
            const page = parseInt(savedBookmark);
            if (page > 0 && page <= BOOK_CONTENT.length) {
              setCurrentPage(page);
              setProgress(Math.round((page / BOOK_CONTENT.length) * 100));
            }
          }
          
          setIsLoading(false);
          return;
        } else {
          // Invalid saved code - clear it
          console.error('❌ Saved code invalid:', validationResult.error);
          localStorage.removeItem(`ebook_access_${ebookId}`);
          toast.error('Access expired. Please re-enter your access code.');
          navigate('/');
          return;
        }
      }
      
      // If code in URL, validate it
      if (codeFromUrl) {
        console.log('🔑 Validating access code from URL:', codeFromUrl);
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
      // If purchase reference in URL, verify payment
      else if (purchaseRef) {
        console.log('💰 Verifying purchase reference:', purchaseRef);
        const result = await PaymentService.verifyPayment(purchaseRef);
        
        if (result.success) {
          // Generate access code from purchase
          const generatedCode = result.data?.accessCode || 
            `SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
          
          setAccessCode(generatedCode);
          setIsValidAccess(true);
          localStorage.setItem(`ebook_access_${ebookId}`, generatedCode);
          
          // Save purchase info
          localStorage.setItem('recent_purchase', JSON.stringify({
            purchase: result.data,
            accessCode: generatedCode,
            timestamp: new Date().toISOString()
          }));
          
          toast.success('Payment verified! Enjoy reading.');
        } else {
          toast.error('Payment verification failed');
          navigate('/');
        }
      }
      // No access - redirect to home
      else {
        console.log('❌ No access found, redirecting...');
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
 

  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= BOOK_CONTENT.length) {
      setCurrentPage(pageNumber);
      const newProgress = Math.round((pageNumber / BOOK_CONTENT.length) * 100);
      setProgress(newProgress);
      
      // Save bookmark
      localStorage.setItem(`bookmark_${ebookId}`, pageNumber.toString());
      setBookmark(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < BOOK_CONTENT.length) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'Home') {
        goToPage(1);
      } else if (e.key === 'End') {
        goToPage(BOOK_CONTENT.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Current page content
  const currentContent = BOOK_CONTENT.find(page => page.page === currentPage) || BOOK_CONTENT[0];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading your book...</p>
      </div>
    );
  }

  if (!isValidAccess) {
    return (
      <div className={styles.accessDenied}>
        <h2>Access Denied</h2>
        <p>Please purchase the book to read the full content.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.readerContainer} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      {/* Header */}
      <header className={styles.readerHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.bookInfo}>
              <h1 className={styles.bookTitle}>Suicide Note</h1>
              <p className={styles.bookAuthor}>by Loba Yusuf</p>
            </div>
            
            <div className={styles.readerControls}>
              <div className={styles.controlsGroup}>
                <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className={styles.controlButton}
                  title="Toggle theme"
                >
                  <Icon name={theme === 'light' ? 'Moon' : 'Sun'} />
                </button>
                
                <button 
                  onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                  className={styles.controlButton}
                  title="Decrease font size"
                >
                  <Icon name="Minus" />
                </button>
                
                <span className={styles.fontSizeLabel}>{fontSize}px</span>
                
                <button 
                  onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                  className={styles.controlButton}
                  title="Increase font size"
                >
                  <Icon name="Plus" />
                </button>
                
                <button 
                  onClick={() => goToPage(bookmark || 1)}
                  className={styles.controlButton}
                  title="Go to bookmark"
                  disabled={!bookmark}
                >
                  <Icon name="Bookmark" />
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/')}
                className={styles.backButton}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        ></div>
        <div className={styles.progressText}>
          Page {currentPage} of {BOOK_CONTENT.length} • {progress}% complete
        </div>
      </div>

      {/* Reader Content */}
      <main className={styles.readerMain}>
        <div className="container">
          <div className={styles.readerContent}>
            {/* Chapter Header */}
            <div className={styles.chapterHeader}>
              <h2 className={styles.chapterTitle}>{currentContent.chapter}</h2>
              <div className={styles.pageInfo}>
                <span className={styles.pageNumber}>Page {currentPage}</span>
                <span className={styles.wordCount}>• {currentContent.wordCount} words</span>
              </div>
            </div>
            
            {/* Page Content */}
            <div 
              className={styles.pageContent}
              style={{ fontSize: `${fontSize}px` }}
            >
              {currentContent.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Navigation */}
            <div className={styles.pageNavigation}>
              <button 
                onClick={prevPage}
                className={styles.navButton}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" />
                <span>Previous Page</span>
              </button>
              
              <div className={styles.pageJump}>
                <input
                  type="number"
                  min="1"
                  max={BOOK_CONTENT.length}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                  className={styles.pageInput}
                />
                <span className={styles.pageTotal}>/ {BOOK_CONTENT.length}</span>
              </div>
              
              <button 
                onClick={nextPage}
                className={styles.navButton}
                disabled={currentPage === BOOK_CONTENT.length}
              >
                <span>Next Page</span>
                <Icon name="ChevronRight" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Navigation */}
      <div className={styles.quickNav}>
        <div className="container">
          <div className={styles.quickNavContent}>
            <button 
              onClick={() => goToPage(1)}
              className={styles.quickNavButton}
            >
              <Icon name="SkipBack" />
              <span>Start</span>
            </button>
            
            <button 
              onClick={() => goToPage(Math.max(1, currentPage - 5))}
              className={styles.quickNavButton}
              disabled={currentPage <= 5}
            >
              <Icon name="ChevronsLeft" />
              <span>-5 Pages</span>
            </button>
            
            <div className={styles.chapterSelect}>
              <select 
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className={styles.chapterDropdown}
              >
                {BOOK_CONTENT.map((page) => (
                  <option key={page.page} value={page.page}>
                    {page.chapter} (Page {page.page})
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => goToPage(Math.min(BOOK_CONTENT.length, currentPage + 5))}
              className={styles.quickNavButton}
              disabled={currentPage >= BOOK_CONTENT.length - 4}
            >
              <Icon name="ChevronsRight" />
              <span>+5 Pages</span>
            </button>
            
            <button 
              onClick={() => goToPage(BOOK_CONTENT.length)}
              className={styles.quickNavButton}
            >
              <Icon name="SkipForward" />
              <span>End</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.readerFooter}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <p>Your Access Code: <code className={styles.accessCodeDisplay}>{accessCode}</code></p>
              <p className={styles.crisisNote}>
                If you're experiencing emotional distress, call Nigeria Emergency: 112 or Lagos Emergency: 767
              </p>
            </div>
            
            <div className={styles.readingStats}>
              <div className={styles.statItem}>
                <Icon name="Clock" className={styles.statIcon} />
                <span>Reading time: ~{Math.round(currentContent.wordCount / 200)} min</span>
              </div>
              <div className={styles.statItem}>
                <Icon name="BookOpen" className={styles.statIcon} />
                <span>{BOOK_CONTENT.length} pages total</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReaderPage;