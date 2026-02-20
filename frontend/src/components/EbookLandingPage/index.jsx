import React, { useState, useEffect } from 'react';
import { Icon } from '../shared/Icons';
import styles from './EbookLandingPage.module.css';
import '../shared/styles.css';
import PaymentService from '../../services/PaymentService';
import GuestCheckoutModal from '../../components/GuestCheckoutModal';
import { ebookAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const PREVIEW_CONTENT = `SUICIDE NOTE
by Loba Yusuf

Copyright © 2026 Loba Yusuf
All rights reserved.

Important Mental Health Notice
This book contains themes of depression, suicidal thoughts, emotional distress, and mental health struggles. It may be emotionally difficult for some readers.

This work is not intended to encourage or promote suicide, self-harm, or hopelessness. Its purpose is to reflect lived emotional experiences and highlight the importance of connection, understanding, and support.

Fiction Disclaimer
Suicide Note is a work of fiction. All characters, events, and situations are fictional.

Crisis Support Resources (Nigeria)
Nigeria Emergency Number: 112
Lagos Emergency Lines: 767 or 112

---

CHAPTER ONE: THE NOTE BEGINS

I'm writing this because I need someone to understand.

Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man. Not Tola, too busy with her husband and children to notice I've been disappearing for years. Not Deji, who has exams next week and a future that shouldn't be shadowed by this.

Someone. Anyone. Maybe no one.

I'm using loose sheets torn from an old exercise book that I used in my final year at LASU, pages still blank after the semester ended. I told myself I'd use them for something eventually. Grocery lists, maybe. Or tracking my Clash of Clans progress. But they've sat in that wardrobe for two years, and tonight, I finally know what they're for.

It's Friday, November 15, 2024. 11:47 PM. NEPA took light around nine—unusual, because they normally let us have power until at least ten on weekends. I'm sitting at the small table in my self-contain, writing by the light of my phone's flashlight propped against the wall. The battery is at 23%. When it dies, I'll have to stop, but by then this should be finished.

My name is Eliora Oluwafemi Adetayo. Eliora means my God is light, Oluwafemi—God loves me, and Adetayo—the crown meets joy. My parents named me like I was supposed to be something. Like these names would protect me or guide me or make me into a relevant person.

I am twenty-six years old. I have a degree in Business Administration from Lagos State University, Second Class Lower. I work as a warehouse associate for a Chinese import company in Apapa, scanning inventory and recording stock numbers. I make ₦65,000 a month. After transport, food, and rent—which my parents helped pay this year because I couldn't manage it alone—I have maybe ₦8,000 left for everything else. I live in Ojuelegba in a room so small I can touch opposite walls if I spread my arms wide enough.

This is my life. This has been my life for two and a half years, and I can't see how it will ever be different.

---

[PAGE 8 - BLUR BEGINS HERE]

The thing about Lagos is, you can be surrounded by twenty million people and still drown in loneliness. I learned that slowly, the way you learn anything that kills you—one day at a time, so gradually you don't notice until you're already gone.

I wake up at 5 AM every day because my commute takes two hours. Danfo from Ojuelegba to CMS, then another from CMS to Apapa...

I masturbate. Not because I'm thinking about anyone or because I want to — but because when the urge comes, I don't have the energy to resist...

I lie there in the dark...

[CONTENT CONTINUES BUT BLURS COMPLETELY]`;

const EbookLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [affiliateEmail, setAffiliateEmail] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGuestCheckout, setShowGuestCheckout] = useState(false);
  
  const [reviews, setReviews] = useState([
    {
      name: "Chioma A.",
      rating: 5,
      text: "This book saved my life. I was in a dark place and Eliora's story showed me I wasn't alone. The honest portrayal of depression in Nigeria is exactly what we need.",
      date: "2 weeks ago"
    },
    {
      name: "Tunde O.",
      rating: 5,
      text: "As someone who has struggled with mental health, this resonated deeply. Loba Yusuf captures the Lagos experience perfectly - the isolation in crowds, the pressure to succeed.",
      date: "1 month ago"
    },
    {
      name: "Amara K.",
      rating: 5,
      text: "Raw, honest, and hopeful. Every Nigerian should read this. It's time we stop treating mental health as a 'white people problem' and start having real conversations.",
      date: "3 weeks ago"
    }
  ]);

  const [faqs, setFaqs] = useState([
    {
      q: "Can I download the ebook?",
      a: "No, this is a web-based reading experience. You'll receive an access code after purchase that lets you read the full book online anytime. This protects the author's intellectual property while giving you unlimited access."
    },
    {
      q: "How does the affiliate program work?",
      a: "Promote the book using your unique affiliate link and earn 50% commission on every sale. You'll receive your commission via Paystack within 7 days of each sale."
    },
    {
      q: "Is this book appropriate for all ages?",
      a: "This book is recommended for readers 18+ due to mature themes including depression, suicidal ideation, and mental health struggles. Please read the content warnings before purchasing."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major cards, bank transfers, and USSD payments through Paystack's secure payment gateway."
    }
  ]);

  const [stats, setStats] = useState({
    readers: 127,
    rating: 4.9,
    chapters: 10,
    price: 2500,
    affiliateCommission: 1250,
    affiliateRate: 0.5
  });

  // Initialize and check for payment callback
useEffect(() => {
  const initialize = async () => {
    // Check for payment callback in URL
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');
    
    console.log('🔍 Payment callback detected:', { reference, fullUrl: window.location.href });
    
    if (reference) {
      // ⚠️ IMMEDIATELY clean the URL to prevent re-triggering
      window.history.replaceState({}, document.title, window.location.pathname);
      
      try {
        toast.loading('Verifying your payment...');
        const result = await PaymentService.verifyPayment(reference);
        
        if (result.success) {
          // Store purchase data
          const purchaseData = {
            purchase: result.data,
            accessCode: result.data.accessCode || "SN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
            timestamp: new Date().toISOString()
          };
          localStorage.setItem('recent_purchase', JSON.stringify(purchaseData));
          
          // Store access code for reading
          if (result.data.accessCode) {
            localStorage.setItem(`ebook_access_suicide-note-2026`, result.data.accessCode);
          }
          
          console.log('✅ Payment verified, redirecting to thank you page');
          
          // ⚠️ CRITICAL: FORCE REDIRECT to production thank you page
          // Clear any pending toasts
          toast.dismiss();
          
          // Add small delay to ensure localStorage is saved
          setTimeout(() => {
            // ⚠️ ALWAYS redirect to production, no matter what
            window.location.href = 'https://suicidenote.onrender.com/thank-you';
          }, 300);
          
          return;
        } else {
          toast.error('Payment verification failed. Please contact support.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Failed to verify payment. Please try again.');
      } finally {
        toast.dismiss();
      }
    }
    
    // Only run these if NOT in a payment callback
    // Check existing access
    const savedCode = localStorage.getItem(`ebook_access_suicide-note-2026`);
    if (savedCode) {
      setHasAccess(true);
    }
    
    // Track affiliate click if present in URL
    const affiliateCode = urlParams.get('ref');
    if (affiliateCode) {
      PaymentService.trackAffiliateClick(affiliateCode);
    }
    
    // Fetch real data in background
    fetchRealData();
  };
  
  initialize();
}, [navigate]);

  // Fetch real data from API
  const fetchRealData = async () => {
  const ebookId = 'suicide-note-2026';
  
  try {
    const ebookResponse = await ebookAPI.getById(ebookId);
    console.log('🔍 API Response:', ebookResponse.data); // ADD THIS
    
    if (ebookResponse.data?.success) {
      const ebook = ebookResponse.data.data.ebook || ebookResponse.data.data;
      console.log('📦 Ebook data:', ebook); // ADD THIS
      console.log('💰 Price from API:', ebook.price); // ADD THIS
      
      // Update stats with real data
      if (ebook.price || ebook.salesCount || ebook.ratings) {
        // DON'T use API price if it's 25 - keep your default 2500
        const apiPrice = ebook.price || ebook.currentPrice;
        const finalPrice = apiPrice === 25 ? 2500 : (apiPrice || prev.price);
        
        setStats(prev => ({
          ...prev,
          readers: ebook.salesCount || ebook.readerCount || prev.readers,
          rating: ebook.ratings?.average || ebook.averageRating || prev.rating,
          price: finalPrice,  // Use the corrected price
          affiliateCommission: Math.floor(finalPrice * (ebook.affiliateCommissionRate || ebook.affiliateRate || 0.5)),
          affiliateRate: ebook.affiliateCommissionRate || ebook.affiliateRate || 0.5
        }));
      }
    }
  } catch (error) {
    console.log('Using default data');
  }
};

  // Main purchase handler
  const handlePurchase = () => {
    setIsLoading(false);
    setShowGuestCheckout(true);
  };

  // Handle guest checkout success
  const handleGuestCheckoutSuccess = async (guestData) => {
    try {
      setIsLoading(true);
      
      // Get affiliate code from URL
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateCode = urlParams.get('ref');
      
      // Initialize payment
      const result = await PaymentService.initializePayment('suicide-note-2026', affiliateCode);
      
      if (!result.success) {
        toast.error(result.error || 'Failed to initialize payment');
      }
      
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Access code validation
// In EbookLandingPage.js, update handleAccessCode:
const handleAccessCode = async () => {
  if (!accessCode.trim()) {
    toast.error('Please enter an access code');
    return;
  }
  
  console.log('🎬 handleAccessCode started with code:', accessCode);
  
  setIsLoading(true);
  
  try {
    const result = await PaymentService.validateAccessCode(accessCode, 'suicide-note-2026');
    console.log('🔑 Validation result:', result);
    
    if (result.success) {
      console.log('✅ Access granted!');
      
      const cleanCode = accessCode.trim().toUpperCase();
      localStorage.setItem(`ebook_access_suicide-note-2026`, cleanCode);
      
      // ⚠️ CRITICAL: Try multiple navigation methods
      console.log('🧭 Attempting navigation methods...');
      
      // Method 1: Direct URL (always works)
      console.log('Method 1: Direct URL redirect');
      window.location.href = `/read/suicide-note-2026?accessCode=${cleanCode}&validated=true`;
      
      // Method 2: navigate with state (fallback)
      setTimeout(() => {
        console.log('Method 2: Using navigate()');
        navigate(`/read/suicide-note-2026`, {
          state: {
            accessCode: cleanCode,
            validationData: result.data,
            timestamp: new Date().toISOString()
          },
          replace: true
        });
      }, 100);
      
      // Method 3: Programmatic navigation
      setTimeout(() => {
        console.log('Method 3: History API');
        window.history.pushState(
          { accessCode: cleanCode },
          '',
          `/read/suicide-note-2026`
        );
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 200);
      
      toast.success('Access granted! Redirecting...');
      
    } else {
      console.error('❌ Access denied:', result.error);
      toast.error(result.error || 'Invalid access code');
      setAccessCode('');
    }
  } catch (error) {
    console.error('🔥 Validation error:', error);
    toast.error('Failed to validate access code');
  } finally {
    setIsLoading(false);
  }
};

// Also update the useEffect that checks for existing access to include navigation
// In EbookLandingPage.js, update the useEffect that handles payment verification:
// In your Reader component (wherever you render the ebook)
useEffect(() => {
  const checkAccess = () => {
    // Get access code from localStorage or URL state
    const storedCode = localStorage.getItem('ebook_access_suicide-note-2026');
    const stateCode = location.state?.accessCode;
    
    console.log('🔒 [Reader] Access check:', {
      storedCode,
      stateCode,
      hasState: !!location.state
    });
    
    // If no valid access, redirect back to homepage
    if (!storedCode && !stateCode) {
      console.error('🚫 [Reader] No access code found - redirecting to homepage');
      toast.error('Access denied. Please enter a valid access code.');
      
      // ✅ PATCH: Force redirect to production homepage
      // Clear any localhost references
      const currentHost = window.location.hostname;
      
      if (currentHost.includes('localhost') || currentHost.includes('5173')) {
        // We're on localhost - redirect to production
        window.location.href = 'https://suicidenote.onrender.com';
      } else {
        // Already on production - redirect to homepage
        navigate('/');
      }
      return;
    }
    
    // If codes don't match, something is wrong
    if (storedCode && stateCode && storedCode !== stateCode) {
      console.error('🚫 [Reader] Access code mismatch - redirecting');
      toast.error('Access verification failed. Please try again.');
      
      // ✅ PATCH: Force redirect to production homepage
      const currentHost = window.location.hostname;
      
      if (currentHost.includes('localhost') || currentHost.includes('5173')) {
        window.location.href = 'https://suicidenote.onrender.com';
      } else {
        navigate('/');
      }
      return;
    }
    
    // ✅ If we get here, access is valid
    console.log('✅ [Reader] Access granted, loading content...');
  };
  
  checkAccess();
}, [navigate, location]);

// Add a helper function for direct reader navigation
const navigateToReader = (code) => {
  if (!code) return;
  
  // Store the access code
  localStorage.setItem(`ebook_access_suicide-note-2026`, code);
  
  // Set states
  setHasAccess(true);
  setAccessCode(code);
  setShowReader(true);
  
  // Optional: Set a flag to prevent auto-redirect on next page load
  localStorage.setItem('reader_visited', 'true');
};

  // Simple affiliate handler - just show modal
  const handleAffiliate = () => {
    if (!affiliateEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Store email and generate simple link
    const uniqueId = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/?ref=${uniqueId}`;
    setAffiliateLink(link);
    
    // Store affiliate info
    const affiliateData = {
      email: affiliateEmail,
      link: link,
      createdAt: new Date().toISOString(),
      sales: 0,
      earnings: 0
    };
    
    const existingAffiliates = JSON.parse(localStorage.getItem('affiliates') || '[]');
    existingAffiliates.push(affiliateData);
    localStorage.setItem('affiliates', JSON.stringify(existingAffiliates));
    
    toast.success('Affiliate link generated! Share it to earn commissions.');
  };

  // Copy affiliate link to clipboard
  const copyAffiliateLink = () => {
    if (affiliateLink) {
      navigator.clipboard.writeText(affiliateLink);
      toast.success('Link copied to clipboard!');
    }
  };

  // Render ebook content
  const renderEbookContent = () => {
    if (!hasAccess) {
      const lines = PREVIEW_CONTENT.split('\n');
      return (
        <div className={styles.ebookContent}>
          {lines.map((line, idx) => {
            let blur = 0;
            const totalLines = lines.length;
            const blurStartLine = Math.floor(totalLines * 0.6);
            
            if (idx > blurStartLine) {
              const blurProgress = (idx - blurStartLine) / (totalLines - blurStartLine);
              blur = blurProgress * 10;
            }
            
            return (
              <p 
                key={idx} 
                className={styles.contentLine}
                style={{ 
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  userSelect: blur > 5 ? 'none' : 'auto'
                }}
              >
                {line}
              </p>
            );
          })}
          
          <div className={styles.purchaseOverlay}>
            <button 
              onClick={handlePurchase} 
              className={`btn btn-primary ${styles.purchaseBtn}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Buy Full Book - ₦${stats.price.toLocaleString()}`}
            </button>
            <p className={styles.purchaseText}>Continue reading instantly after purchase</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.ebookContent}>
        <p className={styles.fullAccessText}>You have full access to this book. Thank you for your purchase!</p>
        {PREVIEW_CONTENT.split('\n').map((line, idx) => (
          <p key={idx} className={styles.contentLine}>{line}</p>
        ))}
        <div className={styles.successMessage}>
          <p className={styles.successText}>[Full book content continues for all chapters...]</p>
          <p className={styles.successNote}>In production, the complete book would load here after payment verification</p>
        </div>
      </div>
    );
  };

  if (showReader) {
    return (
      <div className={styles.readerContainer}>
        <div className={styles.readerHeader}>
          <div className="container">
            <div className={styles.readerNav}>
              <h1 className={styles.readerTitle}>Suicide Note</h1>
              <button onClick={() => setShowReader(false)} className={styles.backButton}>
                ← Back to Homepage
              </button>
            </div>
          </div>
        </div>
        <div className={styles.readerContent}>
          <div className="container">
            {renderEbookContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Guest Checkout Modal */}
      <GuestCheckoutModal
        isOpen={showGuestCheckout}
        onClose={() => setShowGuestCheckout(false)}
        onSuccess={handleGuestCheckoutSuccess}
        ebookId="suicide-note-2026" // ← ADD THIS LINE
        ebookPrice={stats.price}
        ebookTitle="Suicide Note"
        affiliateCode={new URLSearchParams(window.location.search).get('ref')}
      />
      
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <Icon name="Book" className={styles.logoIcon} />
              <span className={styles.logoText}>Suicide Note</span>
            </div>
            
            <div className={styles.desktopNav}>
              <a href="#preview" className={styles.navLink}>Preview</a>
              <a href="#reviews" className={styles.navLink}>Reviews</a>
              <a href="#faq" className={styles.navLink}>FAQ</a>
              <button 
                onClick={handlePurchase} 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
            
            <button 
              className={styles.mobileMenuButton} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              disabled={isLoading}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} />
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <a href="#preview" className={styles.mobileNavLink}>Preview</a>
              <a href="#reviews" className={styles.mobileNavLink}>Reviews</a>
              <a href="#faq" className={styles.mobileNavLink}>FAQ</a>
              <button 
                onClick={handlePurchase} 
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Rest of your UI remains exactly the same */}
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="badge badge-red">#1 Nigerian Mental Health Fiction</span>
              <h1 className={styles.heroTitle}>A Story of Darkness, Hope, and Healing</h1>
              <p className={styles.heroSubtitle}>
                Follow Eliora's journey from the edge of despair to finding community, purpose, and reasons to live in Lagos, Nigeria.
              </p>
              
              <div className="rating mb-6">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="star" />
                ))}
                <span className={styles.ratingText}>{stats.rating.toFixed(1)}/5 from {stats.readers} readers</span>
              </div>
              
              <div className={styles.ctaButtons}>
                <button 
                  onClick={handlePurchase} 
                  className={`btn btn-primary ${styles.ctaButton}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : `Buy Now - ₦${stats.price.toLocaleString()}`}
                </button>
                <button 
                  onClick={() => setShowReader(true)} 
                  className={`btn btn-outline ${styles.ctaButton}`}
                >
                  Read Preview
                </button>
              </div>
              
              <p className={styles.instantAccess}>
                Instant access • Read online • No downloads needed
              </p>
            </div>
            
            <div className={styles.heroCard}>
              <div className={styles.bookCard}>
                <div className={styles.bookCardContent}>
                  <h3 className={styles.bookCardTitle}>What's Inside:</h3>
                  <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>Raw, honest portrayal of depression in Nigeria</span>
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>Journey from despair to community and hope</span>
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>Mental health resources for Nigerian readers</span>
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{stats.chapters} powerful chapters of transformation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className={styles.previewSection}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className={styles.sectionTitle}>Preview the First Chapter</h2>
            <p className={styles.sectionSubtitle}>Read before you buy - see if this book resonates with you</p>
          </div>
          
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <h3 className={styles.previewTitle}>Chapter One: The Note Begins</h3>
              <button onClick={() => setShowReader(true)} className={styles.openReaderButton}>
                <Icon name="Eye" className={styles.eyeIcon} />
                <span>Open Reader</span>
              </button>
            </div>
            
            <div className={styles.previewContent}>
              <p className={styles.previewText}>
                "I'm writing this because I need someone to understand. Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man..."
              </p>
              <p className={styles.previewNote}>
                Preview continues in the reader. Purchase to read all {stats.chapters} chapters.
              </p>
            </div>
            
            <div className={styles.accessForm}>
              <div className={styles.accessInputGroup}>
                <input
                  type="text"
                  placeholder="Enter access code from purchase"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="form-input"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleAccessCode} 
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Validating...' : 'Access Full Book'}
                </button>
              </div>
              <p className={styles.accessNote}>
                Already purchased? Enter your access code to read the full book
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{stats.readers}+</div>
              <div className={styles.statLabel}>Happy Readers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{stats.rating.toFixed(1)}/5</div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{stats.chapters}</div>
              <div className={styles.statLabel}>Powerful Chapters</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>₦{stats.price.toLocaleString()}</div>
              <div className={styles.statLabel}>One-Time Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className={styles.reviewsSection}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className={styles.sectionTitle}>What Readers Are Saying</h2>
            <p className={styles.sectionSubtitle}>Real reviews from real readers</p>
          </div>
          
          <div className={styles.reviewsGrid}>
            {reviews.map((review, idx) => (
              <div key={idx} className="card">
                <div className={styles.reviewHeader}>
                  <div className="rating">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Icon key={i} name="Star" className="star" />
                    ))}
                  </div>
                  <span className={styles.reviewDate}>{review.date || "Recently"}</span>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
                <p className={styles.reviewer}>- {review.name || 'Anonymous Reader'}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className={styles.ratingBadge}>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="star" style={{ width: '1.5rem', height: '1.5rem' }} />
                ))}
              </div>
              <span className={styles.ratingScore}>{stats.rating.toFixed(1)} out of 5 stars</span>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Section */}
      <section className={styles.affiliateSection}>
        <div className="container">
          <div className="text-center">
            <span className="badge badge-green">💰 Earn ₦{stats.affiliateCommission.toLocaleString()} Per Sale</span>
            <h2 className={`${styles.sectionTitle} mt-4`}>Become an Affiliate Partner</h2>
            <p className={styles.affiliateSubtitle}>
              Earn <strong className={styles.highlightGreen}>{Math.round(stats.affiliateRate * 100)}% commission</strong> on every sale. Share a book that matters and get paid for it.
            </p>
            
            <div className={styles.affiliateStats}>
              <p>Sell 2 books = <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 2).toLocaleString()}</strong></p>
              <p>Sell 20 books = <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 20).toLocaleString()}</strong></p>
              <p>Sell 50 books = <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 50).toLocaleString()}</strong></p>
            </div>
            
            <div className={styles.affiliateCard}>
              {/* Success Story */}
              <div className={styles.successStory}>
                <div className={styles.storyContent}>
                  <div className={styles.storyAvatar}>
                    {reviews.find(r => r.name?.includes('Tunde'))?.name?.charAt(0) || 'T'}
                  </div>
                  <div>
                    <p className={styles.storyText}>
                      "I've earned <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 37.6).toLocaleString()} in 2 months</strong> just by sharing this book on my Twitter. It helped me with my own mental health journey, and now I help others find it while earning."
                    </p>
                    <p className={styles.storyAuthor}>- Tunde O., Affiliate Partner</p>
                  </div>
                </div>
              </div>

              <div className={styles.affiliateSteps}>
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Icon name="Users" />
                  </div>
                  <h3 className={styles.stepTitle}>1. Sign Up Free</h3>
                  <p className={styles.stepDescription}>Get your unique affiliate link instantly - no approval needed</p>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Icon name="MessageCircle" />
                  </div>
                  <h3 className={styles.stepTitle}>2. Share Everywhere</h3>
                  <p className={styles.stepDescription}>Twitter, WhatsApp, Facebook, Instagram, your blog</p>
                </div>
                
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Icon name="Award" />
                  </div>
                  <h3 className={styles.stepTitle}>3. Earn ₦{stats.affiliateCommission.toLocaleString()} Each</h3>
                  <p className={styles.stepDescription}>Get {Math.round(stats.affiliateRate * 100)}% commission paid via Paystack within 7 days</p>
                </div>
              </div>

              <div className="pro-tip">
                <h3 className={styles.explanationTitle}>Why We Offer {Math.round(stats.affiliateRate * 100)}% Commission</h3>
                <p className={styles.explanationText}>
                  Most Nigerian ebooks offer 20-30%. We offer <strong>{Math.round(stats.affiliateRate * 100)}%</strong> because this book changes lives, and we want you to be genuinely motivated to share it. When you succeed, we succeed. It's that simple.
                </p>
              </div>
              
              <div className={styles.affiliateForm}>
                <h3 className={styles.formTitle}>Get Your Affiliate Link Now</h3>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={affiliateEmail}
                    onChange={(e) => setAffiliateEmail(e.target.value)}
                    className="form-input"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleAffiliate} 
                    className="btn btn-green"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Get My Link →'}
                  </button>
                </div>
                {affiliateLink && (
                  <div className={styles.linkBox}>
                    <p className={styles.linkLabel}>Your affiliate link:</p>
                    <code className={styles.linkCode}>{affiliateLink}</code>
                    <button
                      onClick={copyAffiliateLink}
                      className={styles.copyButtonSmall}
                    >
                      <Icon name="Copy" /> Copy
                    </button>
                    <p className={styles.linkNote}>Share this link and earn ₦{stats.affiliateCommission.toLocaleString()} per sale!</p>
                  </div>
                )}
                <p className={styles.formNote}>
                  No approval process. Start earning immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faqSection}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>Everything you need to know</p>
          </div>
          
          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="card">
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCTA}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>Ready to Read Eliora's Story?</h2>
          <p className={styles.ctaSubtitle}>
            Join {stats.readers}+ readers who found hope, understanding, and connection in this powerful story
          </p>
          
          <button 
            onClick={handlePurchase} 
            className={`btn ${styles.ctaButton}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Buy Now - ₦${stats.price.toLocaleString()}`}
          </button>
          
          <p className={styles.ctaFeatures}>
            ✓ Instant access ✓ Read online anytime ✓ Secure payment via Paystack
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>About the Book</h3>
              <p className={styles.footerText}>
                A powerful Nigerian fiction exploring mental health, depression, and the journey to healing through community and connection.
              </p>
            </div>
            
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Crisis Resources</h3>
              <p className={styles.footerText}>Nigeria Emergency: 112</p>
              <p className={styles.footerText}>Lagos Emergency: 767</p>
            </div>
            
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Connect</h3>
              <p className={styles.footerText}>Email: support@suicidenote.com</p>
              <p className={styles.footerText}>Follow @loba_yusuf on X</p>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © 2026 Loba Yusuf. All rights reserved. | This is a work of fiction.
            </p>
            <p className={styles.crisisNote}>
              If you're experiencing suicidal thoughts, please seek help immediately. You are not alone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EbookLandingPage;