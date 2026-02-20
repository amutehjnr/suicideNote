import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ReaderPage.css';

// Book content data
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
    chapter: "Chapter 1: The Note Begins (Continued)",
    content: `The other workers call me "Miss University" because of my degree. They mean it kindly, I think. Like I'm too educated to be here. Like this is temporary for me. But it's not temporary. It's been two and a half years. And when I go home at night, I sit in my room and stare at the wall until it's time to sleep and do it all over again.

On Sundays, I go to church. Not because I believe—I stopped believing sometime in my third year of university—but because my mother calls every Sunday afternoon to ask if I went, and it's easier to say yes than to explain.

I have friends. Sort of. There's Chioma from work, who invites me to her birthday parties and wedding engagements. There's Emeka, who I dated briefly in 2022 until he said I was "too heavy" and stopped calling. There's the girl who sells puff-puff at the bus stop, who knows I like mine with extra sugar and always saves me the freshest ones when she sees me coming.

But none of them know me. None of them see me. And I've stopped trying to make them.`,
    wordCount: 180
  },
  {
    page: 8,
    chapter: "Chapter 2: The Silence",
    content: `The first time I thought about dying, I was sixteen years old.

It was during my SS2 holiday. My parents had just told me I'd be repeating the class because my results weren't good enough. Not failing, just not good enough. My father didn't shout—he never shouts. He just looked at me with that disappointment that's worse than anger, and said, "We expected more from you, Eliora."

I went to my room and lay on my bed and thought about what it would feel like to just stop existing. Not to die, exactly, but to disappear. To become nothing. To not have to feel the weight of everyone's expectations crushing my chest.

I didn't tell anyone. You don't tell anyone things like that. You swallow them and keep moving, because that's what we do.`,
    wordCount: 140
  },
  {
    page: 9,
    chapter: "Chapter 2: The Silence (Continued)",
    content: `Ten years later, and I still haven't told anyone.

The thoughts come and go like Lagos traffic. Sometimes they're just there, background noise, the danfos and okadas of my mind. Other times they're gridlock, overwhelming, immobilizing.

I've learned to function with them. To wake up and go to work and smile when I'm supposed to and laugh when I'm supposed to and say all the right things. I've learned to be a person while slowly disappearing inside.

My mother calls it "carrying my cross." The pastor calls it "spiritual warfare." My friends would call it "overthinking" if they knew. But they don't know. I make sure they don't know.`,
    wordCount: 120
  },
  {
    page: 10,
    chapter: "Chapter 3: The Weight",
    content: `The weight is physical now.

I feel it in my chest when I wake up, like someone's sitting on me. I feel it in my shoulders when I walk to the bus stop. I feel it in my throat when I try to speak.

Some days, getting out of bed takes everything I have. Some days, I don't get out of bed until I absolutely have to. Some days, I lie there and count the cracks in the ceiling and wonder if anyone would notice if I just stayed there forever.

They would notice, eventually. My boss would call. My mother would call. Someone would come. And then what? What would they find? A girl who couldn't carry her cross anymore. A woman who couldn't fight the war.`,
    wordCount: 130
  },
  {
    page: 11,
    chapter: "Chapter 3: The Weight (Continued)",
    content: `I went to a general hospital once, in 2023. Sat in the queue for three hours, waited to see a doctor, tried to explain that I couldn't breathe, that my chest hurt, that I hadn't slept properly in months.

The doctor prescribed painkillers. Said it was probably stress, maybe malaria. Told me to rest and drink more water.

I paid for the consultation, bought the painkillers, went home, and never went back.

This is what help looks like in Nigeria. This is what it means to be broken in a country that doesn't have the resources to fix you. I'm not angry about it—I understand. There are people with malaria, with typhoid, with actual physical illnesses waiting in those queues. Who am I to take their place because my brain is sick?`,
    wordCount: 150
  },
  {
    page: 12,
    chapter: "Chapter 4: The Note Takes Shape",
    content: `So I'm writing this instead.

I'm writing because I need someone to know that I tried. That I really, really tried.

I tried to be happy. I tried to be grateful. I tried to count my blessings and focus on the positive and look on the bright side. I tried therapy apps and meditation videos and self-help books. I tried praying harder, fasting longer, believing stronger.

I tried to be enough. For my parents, for my friends, for myself.

And I'm tired. I'm so tired.`,
    wordCount: 100
  },
  {
    page: 13,
    chapter: "Chapter 4: The Note Takes Shape (Continued)",
    content: `My phone is at 17% now. I need to hurry.

If you're reading this—if anyone is reading this—I want you to know that it's not your fault. It's not anyone's fault. Sometimes people break and there's no one to blame. Sometimes things just end.

Tell my mother I loved her. Tell her I'm sorry I wasn't the daughter she deserved. Tell her I tried, I really tried.

Tell my father I forgive him for all the silences. Tell him I understand now that silence was his way of loving, even if I couldn't feel it.

Tell Tola to be happy. Tell her to hold her children tight and never let them forget they're loved.

Tell Deji to study hard, to become the doctor he's always wanted to be. Tell him his big sister believed in him, even when she couldn't believe in herself.`,
    wordCount: 150
  },
  {
    page: 14,
    chapter: "Chapter 4: The Note Takes Shape (Continued)",
    content: `And tell Chioma, Emeka, the puff-puff girl—tell them I appreciated them. Tell them their small kindnesses meant something. Tell them they kept me alive longer than they'll ever know.

I don't know who will find this. Maybe my landlord, when they come to clear out my room. Maybe my mother, if she comes to check on me. Maybe no one. Maybe it will sit in this wardrobe for years, like the exercise books did, until someone finally throws it away.

That's okay. I don't need to be found. I just need to be honest. For once in my life, I need to be honest.`,
    wordCount: 120
  },
  {
    page: 15,
    chapter: "Chapter 5: Lagos",
    content: `Lagos is a character in this story, I suppose. It deserves its own chapter.

Lagos is the city that raised me, destroyed me, and never noticed either. Lagos is noise and chaos and beauty and brutality all at once. Lagos is twenty million people living on top of each other, touching but never connecting.

I hate Lagos. I love Lagos. I don't know how to separate myself from it anymore.

The okada riders who weave through traffic like they're invincible. The market women who shout their prices with lungs of iron. The street children who tap on car windows with hands too small to be working. The partygoers who fill clubs every weekend, dancing like there's no tomorrow.

There's always tomorrow, though. That's the problem.`,
    wordCount: 130
  },
  {
    page: 16,
    chapter: "Chapter 5: Lagos (Continued)",
    content: `I remember the first time I saw the lagoon. I was twelve, visiting a cousin on the island. We stood on the Third Mainland Bridge, and she pointed at the water and said, "People jump, you know. When they can't take it anymore."

I didn't understand then. I looked at the water and thought about how dirty it was, how you'd have to be really desperate to jump into that.

Now I understand.

Now I look at the lagoon and think about how easy it would be. How quick. How final.

But I won't jump. I'm not that kind of desperate. I'm the kind that just stops. That lies down and doesn't get up. That writes a note and waits.`,
    wordCount: 130
  },
  {
    page: 17,
    chapter: "Chapter 6: The Morning After",
    content: `It's Saturday morning now. November 16. 6:32 AM.

I fell asleep writing. Woke up to my phone dead, the room dark, the note still on the table. I found my charger, plugged it in, waited for enough battery to continue.

The sun is coming up. I can hear Lagos waking outside my window. The danfos starting their routes. The traders opening their shops. The world continuing, indifferent to whatever I decide.

I made tea. Sat here drinking it, watching the light change, wondering if today is the day.

Is there ever a right day for this? Is there ever a wrong one?`,
    wordCount: 110
  },
  {
    page: 18,
    chapter: "Chapter 6: The Morning After (Continued)",
    content: `I thought about calling someone. Anyone. Just to hear a voice that isn't mine.

But who do you call at 6 AM on a Saturday? Who do you call to say, "I'm thinking about dying" without ruining their entire day?

So I didn't call. I made tea and wrote and waited for the feeling to pass. It didn't pass. It's still here, sitting with me, drinking its own tea.

We're having breakfast together, me and my death wish. We're old friends now. We've known each other for ten years. I don't know how to be without it anymore.`,
    wordCount: 120
  },
  {
    page: 19,
    chapter: "Chapter 7: Reasons",
    content: `My mother always said, "When you feel like giving up, count your blessings."

So I'm counting.

I have a roof over my head. I have food to eat. I have a job, even if it doesn't pay much. I have family who loves me, even if they don't understand. I have friends, even if they're distant. I have my health, mostly.

I have reasons to live. I know I have reasons to live.

But knowing and feeling are different things. I know I should want to stay. I know there are people who would miss me. I know tomorrow might be better. I know all of this, rationally, logically, in my mind.

But in my chest, in my bones, in the place where feeling lives—I'm empty. I've been empty for so long I don't remember what full feels like.`,
    wordCount: 140
  },
  {
    page: 20,
    chapter: "Chapter 7: Reasons (Continued)",
    content: `They say suicide is permanent solution to a temporary problem. They say it gets better. They say you have so much to live for.

They don't understand that when you've been fighting for ten years, "temporary" loses its meaning. When every day is a battle, when every morning is a choice, when every night is a question—temporary becomes permanent. This is my normal. This has always been my normal.

I don't want to die. I just want the pain to stop. I want the weight to lift. I want to breathe without feeling like someone's sitting on my chest.

And I can't find a way to make that happen while I'm alive.`,
    wordCount: 120
  },
  {
    page: 21,
    chapter: "Chapter 8: The Almost Ending",
    content: `My phone is charged now. 100%. Ready for whatever comes next.

I've been writing for hours. The pages are covered, front and back. I have maybe one page left in the exercise book, and then it's done.

I don't know what I'll do when I finish. Maybe I'll go out. Maybe I'll take a walk, see the city one last time. Maybe I'll buy puff-puff from the girl at the bus stop, eat it slowly, remember what it feels like to enjoy something.

Maybe I'll come back here and lie down and not get up. Maybe I'll call someone. Maybe I'll do nothing at all.

The thing about being this tired is that even decisions feel impossible. Even choosing to live or die feels like too much.`,
    wordCount: 140
  },
  {
    page: 22,
    chapter: "Chapter 8: The Almost Ending (Continued)",
    content: `If this is the end—if this is where my story stops—I want you to know that I'm not angry. I'm not sad. I'm just tired. Deeply, completely, eternally tired.

I want you to know that I loved. In my own way, in my small way, I loved. My family, my friends, this chaotic city, this broken country. I loved it all, even when it hurt.

And I want you to know that if you're reading this and you feel like I feel—if you're carrying this same weight—I'm sorry. I'm so sorry. I wish I could tell you it gets better. I wish I could promise you tomorrow will be different.

But I can't promise that. All I can say is: I understand. I understand completely. And whatever you decide, whatever happens, I hope you find peace. I hope we both find peace.`,
    wordCount: 150
  },
  {
    page: 23,
    chapter: "Afterword",
    content: `This book is not a suicide note. It is a novel.

But the feelings in it are real. The pain, the loneliness, the exhaustion—these are real for millions of people every day. If you are one of them, please reach out. Please talk to someone. Please keep fighting, even when it feels impossible.

Nigeria Emergency: 112
Lagos Emergency: 767 or 112
Mentally Aware Nigeria Initiative (MANI): 0809 111 0555

You are not alone. You are not broken. You are not too much.

You are enough.

— Loba Yusuf, 2026`,
    wordCount: 110
  }
];

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
  const TOTAL_PAGES = BOOK_CONTENT.length;
  
  // State
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('rdr_fontSize');
    return saved ? parseInt(saved) : 16;
  });
  
  const [currentPage, setCurrentPage] = useState(4);
  const [chapOpen, setChapOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('Chapter 1: The Note Begins');
  const [accessCode, setAccessCode] = useState('');
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(null);

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
      
      if (index === 0 && para.includes('Someone. Anyone.')) {
        return <p key={index}><span className="opener">{trimmed}</span></p>;
      }
      
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

  // Get unique chapters
  const getUniqueChapters = () => {
    const seen = new Set();
    return BOOK_CONTENT.filter(page => {
      if (seen.has(page.chapter)) return false;
      seen.add(page.chapter);
      return true;
    }).map(page => ({
      chapter: page.chapter,
      page: page.page
    }));
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
    if (currentPage < TOTAL_PAGES) {
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
  const progressPercentage = (currentPage / TOTAL_PAGES) * 100;

  // Current page content
  const currentContent = BOOK_CONTENT.find(page => page.page === currentPage) || BOOK_CONTENT[3];
  
  // Calculate total reading time
  const totalWords = BOOK_CONTENT.reduce((sum, page) => sum + page.wordCount, 0);
  const readingTimeMinutes = Math.ceil(totalWords / 200);

  // Unique chapters for navigation
  const uniqueChapters = getUniqueChapters();

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
        aria-valuemax={TOTAL_PAGES} 
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
          Page {currentPage} of {TOTAL_PAGES}
        </div>
        <button 
          className="nav-btn" 
          onClick={handleNextPage}
          disabled={currentPage >= TOTAL_PAGES}
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
          Reading time: ~{readingTimeMinutes} min &nbsp;·&nbsp; {TOTAL_PAGES} pages total
        </div>
      </footer>
    </div>
  );
};

export default ReaderPage;