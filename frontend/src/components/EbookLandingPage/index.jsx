// import React, { useState, useEffect } from 'react';
// import { Icon } from '../shared/Icons';
// import styles from './EbookLandingPage.module.css';
// import '../shared/styles.css';
// import PaymentService from '../../services/PaymentService';
// import AffiliateService from '../../services/AffiliateService';
// import GuestCheckoutModal from '../../components/GuestCheckoutModal';
// import { ebookAPI } from '../../services/api';
// import toast from 'react-hot-toast';
// import { useNavigate, useLocation } from 'react-router-dom';

// const PREVIEW_CONTENT = `CHAPTER ONE

// The Note Begins

// I'm writing this because I need someone to understand.

// Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man. Not Tola, too busy with her husband and children to notice I've been disappearing for years. Not Deji, who has exams next week and a future that shouldn't be shadowed by this.

// Someone. Anyone. Maybe no one.

// I'm using loose sheets torn from an old exercise book that I used in my final year at LASU, pages still blank after the semester ended. I told myself I'd use them for something eventually. Grocery lists, maybe. Or tracking my Clash of Clans progress. But they've sat in that wardrobe for two years, and tonight, I finally know what they're for.

// It's Friday, November 15, 2024. 11:47 PM. NEPA took light around nine---unusual, because they normally let us have power until at least ten on weekends. I'm sitting at the small table in my self-contain, writing by the light of my phone's flashlight propped against the wall. The battery is at 23%. When it dies, I'll have to stop, but by then this should be finished.

// My name is Eliora Oluwafemi Adetayo. Eliora means my God is light, Oluwafemi---God loves me, and Adetayo---the crown meets joy. My parents named me like I was supposed to be something. Like these names would protect me or guide me or make me into a relevant person.

// I am twenty-six years old. I have a degree in Business Administration from Lagos State University, Second Class Lower. I work as a warehouse associate for a Chinese import company in Apapa, scanning inventory and recording stock numbers. I make ₦65,000 a month. After transport, food, and rent---which my parents helped pay this year because I couldn'tmanage it alone---I have maybe ₦8,000 left for everything else. I live in Ojuelegba in a room so small I can touch opposite walls if I spread my arms wide enough.

// This is my life. This has been my life for two and a half years, and I can't see how it will ever be different.

// I should start at the beginning, give context, explain the journey, make it make sense, right? But I don't know where the beginning is. When I graduated and couldn't find work? When I took this warehouse job "temporarily" and got stuck? When my university friends scattered across Lagos, Abuja, abroad, and our group chat went silent? When I realized I could go weeks without anyone saying my name out loud?

// Maybe there is no beginning. Maybe this has always been here, waiting.

// The thing about Lagos is, you can be surrounded by twenty million people and still drown in loneliness. I learned that slowly, the way you learn anything that kills you---one day at a time, so gradually you don't notice until you're already gone.

// I wake up at 5 AM every day because my commute takes two hours. Danfo from Ojuelegba to CMS, then another from CMS to Apapa. The conductors shout the same routes in the same rhythm---"CMS! CMS! One chance! Enter, we dey go!"---and I squeeze into seats meant for three people but holding four, my body pressed against strangers who smell like sweat and heat and the same exhaustion I feel.

// No one looks at anyone. That's the rule of Lagos transport. You stare at your phone or out the window or at nothing, because eye contact is an invitation, and we're all too tired for invitations.

// I clock in at 7 AM. Mr. Chen, my manager, barely looks up from his clipboard. I don't think he knows my full name. He calls me "You" or "Hey" or sometimes just points. The warehouse is concrete floors and fluorescent lights that make these annoying buzz sounds. Metal shelves stretch up to the ceiling, rows and rows of boxes with codes I've memorized without meaning to: 3847B, rechargeable fans. 4729C, phone chargers. 6012A, plastic basins.

// I scan items. I record numbers in the computer. I stack boxes. I move to the next section. The beep of the scanner becomes the only rhythm in my day.

// Ibrahim tries to talk to me sometimes. He's from Kano, been here four years, always inviting me to lunch: "Bros, come chop na." I tell him I'm not hungry or I brought food or maybe later. After six months, he stopped asking. He still greets me every morning---"Bros, how far?"---and I nod or say "I dey" and that's it. He's not unkind. I'm just not much of a talker.

// Ngozi at the front desk says "Good morning!" every day with this bright smile like she means it. She waves. She tries. I mumble something back. She deserves better than my mumbling, but I don't have better to give.

// At 4 PM, I clock out. Two hours back to Ojuelegba. By the time I get home, it's past six and I'm so tired I can feel it in my bones. Not tired from physical work---the warehouse isn't hard labor, just mindless repetition. Tired from existing. Tired from pretending I'm fine when Mr. Chen yells about working faster. Tired from sitting in traffic watching the sun set behind buildings I'll never afford to live in. Tired from being invisible.

// I eat---usually bread and eggs or indomie if I'm too drained to cook---and then I open my laptop.

// This is the only part of the day that feels like anything.

// I play Clash of Clans. My username is SilentKing047. Town Hall Level 11, working toward 12. My clan is called Naija Warriors, mostly Nigerians living abroad---London, Texas, Toronto---people who left and made something of themselves. They don't know I'm a warehouse worker living in a self-contain in Ojuelegba. They think I'm a student, I think, or maybe they don't think about me at all except when I attack in clan wars.

// I'm good at it. I know troop combinations, attack strategies, when to use spells and when to save them. I can three-star bases that should be too strong for my level. In the clan chat, people say "Nice hit, Silent" or "Clutch attack, bro." For those few seconds, I feel like I did something that mattered.

// I upgrade my barracks. I collect resources. I watch the timer count down---six hours until my barbarian king is done upgrading, twelve hours until I can use my army again. I check the app obsessively, even at work, because there's always something to do, some progress to track. I can measure my life in these small victories: archer tower to level 13, clan castle to level 6, war stars earned.

// But when I close the app, nothing has changed. My room is still small. My bank account is still nearly empty. I'm still twenty-six with a business degree and a job that doesn't require one. The progress isn't real. It's pixels on a screen. And I know this, but I keep playing because at least it's something.

// Sometimes I watch films. Korean dramas, mostly---the ones where people are sad but beautiful, where suffering is aesthetic and meaningful. Or Hollywood movies where the underdog wins, where the quiet guy turns out to be secretly brilliant, where hard work pays off and people notice. I download them using Airtel night plan. My internet is too slow for streaming, and I can't afford more data.

// I fall asleep with my laptop still playing, voices in a language I don't always understand filling the silence so I don't have to hear how alone I am.

// At night, after the films end or I've finally closed Clash of Clans, there's the other thing. The thing I don't want to write about but should, because this is supposed to be honest.

// I masturbate. Not because I'm thinking about anyone or because I want to --- but because when the urge comes, I don't have the energy to resist. It's routine now---like brushing my teeth, only sadder.
// `;

// const EbookLandingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [accessCode, setAccessCode] = useState('');
//   const [hasAccess, setHasAccess] = useState(false);
//   const [showReader, setShowReader] = useState(false);
//   const [affiliateEmail, setAffiliateEmail] = useState('');
//   const [affiliateName, setAffiliateName] = useState('');
//   const [affiliateLink, setAffiliateLink] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAffiliateLoading, setIsAffiliateLoading] = useState(false);
//   const [showGuestCheckout, setShowGuestCheckout] = useState(false);
//   const [affiliateGenerated, setAffiliateGenerated] = useState(false);
//   const [copiedLink, setCopiedLink] = useState(false);
//   const [salesEstimate, setSalesEstimate] = useState(20);
  
//   const [reviews, setReviews] = useState([
//     {
//       name: "Chioma A.",
//       rating: 5,
//       text: "This book saved my life. I was in a dark place and Eliora's story showed me I wasn't alone. The honest portrayal of depression in Nigeria is exactly what we need.",
//       date: "2 weeks ago"
//     },
//     {
//       name: "Tunde O.",
//       rating: 5,
//       text: "As someone who has struggled with mental health, this resonated deeply. Loba Yusuf captures the Lagos experience perfectly - the isolation in crowds, the pressure to succeed.",
//       date: "1 month ago"
//     },
//     {
//       name: "Amara K.",
//       rating: 5,
//       text: "Raw, honest, and hopeful. Every Nigerian should read this. It's time we stop treating mental health as a 'white people problem' and start having real conversations.",
//       date: "3 weeks ago"
//     }
//   ]);

//   const [faqs, setFaqs] = useState([
//     {
//       q: "Can I download the ebook?",
//       a: "No, this is a web-based reading experience. You'll receive an access code after purchase that lets you read the full book online anytime. This protects the author's intellectual property while giving you unlimited access."
//     },
//     {
//       q: "How does the affiliate program work?",
//       a: "Promote the book using your unique affiliate link and earn 50% commission on every sale. You'll receive your commission via Paystack within 7 days of each sale."
//     },
//     {
//       q: "Is this book appropriate for all ages?",
//       a: "This book is recommended for readers 18+ due to mature themes including depression, suicidal ideation, and mental health struggles. Please read the content warnings before purchasing."
//     },
//     {
//       q: "What payment methods do you accept?",
//       a: "We accept all major cards, bank transfers, and USSD payments through Paystack's secure payment gateway."
//     }
//   ]);

//   const [stats, setStats] = useState({
//     readers: 127,
//     rating: 4.9,
//     chapters: 10,
//     price: 3000,
//     affiliateCommission: 1500,
//     affiliateRate: 0.5
//   });

//   // Check cookies on page load
//   useEffect(() => {
//     console.log('🍪 All cookies on page load:', document.cookie);
//     const affiliateRef = document.cookie.replace(/(?:(?:^|.*;\s*)affiliate_ref\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//     console.log('🍪 affiliate_ref from cookies:', affiliateRef);
//   }, []);

//   // Initialize and check for payment callback
//   useEffect(() => {
//     const initialize = async () => {
//       // Check for payment callback in URL
//       const urlParams = new URLSearchParams(window.location.search);
//       const reference = urlParams.get('reference') || urlParams.get('trxref');
      
//       console.log('🔍 Payment callback detected:', { reference, fullUrl: window.location.href });
      
//       if (reference) {
//         // ⚠️ IMMEDIATELY clean the URL to prevent re-triggering
//         window.history.replaceState({}, document.title, window.location.pathname);
        
//         try {
//           toast.loading('Verifying your payment...');
//           const result = await PaymentService.verifyPayment(reference);
          
//           if (result.success) {
//             // Store purchase data
//             const purchaseData = {
//               purchase: result.data,
//               accessCode: result.data.accessCode || "SN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
//               timestamp: new Date().toISOString()
//             };
//             localStorage.setItem('recent_purchase', JSON.stringify(purchaseData));
            
//             // Store access code for reading
//             if (result.data.accessCode) {
//               localStorage.setItem(`ebook_access_suicide-note-2026`, result.data.accessCode);
//             }
            
//             console.log('✅ Payment verified, redirecting to thank you page');
            
//             // Clear any pending toasts
//             toast.dismiss();
            
//             // Add small delay to ensure localStorage is saved
//             setTimeout(() => {
//               // ⚠️ ALWAYS redirect to production, no matter what
//               window.location.href = 'https://suicidenotebook.com/thank-you';
//             }, 300);
            
//             return;
//           } else {
//             toast.error('Payment verification failed. Please contact support.');
//           }
//         } catch (error) {
//           // console.error('Payment verification error:', error);
//           toast.error('Failed to verify payment. Please try again.');
//         } finally {
//           toast.dismiss();
//         }
//       }
      
//       // Only run these if NOT in a payment callback
//       // Check existing access
//       const savedCode = localStorage.getItem(`ebook_access_suicide-note-2026`);
//       if (savedCode) {
//         setHasAccess(true);
//       }
      
//       // Fetch real data in background
//       fetchRealData();
//     };
    
//     initialize();
//   }, [navigate]);

//   // Fetch real data from API
//   const fetchRealData = async () => {
//     const ebookId = 'suicide-note-2026';
    
//     try {
//       const ebookResponse = await ebookAPI.getById(ebookId);
//       // console.log('🔍 API Response:', ebookResponse.data);
      
//       if (ebookResponse.data?.success) {
//         const ebook = ebookResponse.data.data.ebook || ebookResponse.data.data;
//         // console.log('📦 Ebook data:', ebook);
//         // console.log('💰 Price from API:', ebook.price);
        
//         // Update stats with real data
//         if (ebook.price || ebook.salesCount || ebook.ratings) {
//           // Use API price or default to 3000
//           const apiPrice = ebook.price || ebook.currentPrice;
//           const finalPrice = apiPrice === 25 ? 3000 : (apiPrice || stats.price);
          
//           setStats(prev => ({
//             ...prev,
//             readers: ebook.salesCount || ebook.readerCount || prev.readers,
//             rating: ebook.ratings?.average || ebook.averageRating || prev.rating,
//             price: finalPrice,
//             affiliateCommission: Math.floor(finalPrice * (ebook.affiliateCommissionRate || ebook.affiliateRate || 0.5)),
//             affiliateRate: ebook.affiliateCommissionRate || ebook.affiliateRate || 0.5
//           }));
//         }
//       }
//     } catch (error) {
//       // console.log('Using default data');
//     }
//   };

//   // Main purchase handler
//   const handlePurchase = () => {
//     setIsLoading(false);
//     setShowGuestCheckout(true);
//   };

//   // Handle guest checkout success
//   const handleGuestCheckoutSuccess = async (guestData) => {
//     try {
//       setIsLoading(true);
      
//       // Get affiliate code from URL
//       const urlParams = new URLSearchParams(window.location.search);
//       const affiliateCode = urlParams.get('ref');
      
//       // Initialize payment
//       const result = await PaymentService.initializePayment('suicide-note-2026', affiliateCode);
      
//       if (!result.success) {
//         toast.error(result.error || 'Failed to initialize payment');
//       }
      
//     } catch (error) {
//       // console.error('Payment processing error:', error);
//       toast.error('Payment processing failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Access code validation
//   const handleAccessCode = async () => {
//     if (!accessCode.trim()) {
//       toast.error('Please enter an access code');
//       return;
//     }
    
//     // console.log('🎬 handleAccessCode started with code:', accessCode);
    
//     setIsLoading(true);
    
//     try {
//       const result = await PaymentService.validateAccessCode(accessCode, 'suicide-note-2026');
//       // console.log('🔑 Validation result:', result);
      
//       if (result.success) {
//         // console.log('✅ Access granted!');
        
//         const cleanCode = accessCode.trim().toUpperCase();
//         localStorage.setItem(`ebook_access_suicide-note-2026`, cleanCode);
        
//         // ⚠️ CRITICAL: Try multiple navigation methods
//         // console.log('🧭 Attempting navigation methods...');
        
//         // Method 1: Direct URL (always works)
//         // console.log('Method 1: Direct URL redirect');
//         window.location.href = `/read/suicide-note-2026?accessCode=${cleanCode}&validated=true`;
        
//         // Method 2: navigate with state (fallback)
//         setTimeout(() => {
//           // console.log('Method 2: Using navigate()');
//           navigate(`/read/suicide-note-2026`, {
//             state: {
//               accessCode: cleanCode,
//               validationData: result.data,
//               timestamp: new Date().toISOString()
//             },
//             replace: true
//           });
//         }, 100);
        
//         // Method 3: Programmatic navigation
//         setTimeout(() => {
//           // console.log('Method 3: History API');
//           window.history.pushState(
//             { accessCode: cleanCode },
//             '',
//             `/read/suicide-note-2026`
//           );
//           window.dispatchEvent(new PopStateEvent('popstate'));
//         }, 200);
        
//         toast.success('Access granted! Redirecting...');
        
//       } else {
//         // console.error('❌ Access denied:', result.error);
//         toast.error(result.error || 'Invalid access code');
//         setAccessCode('');
//       }
//     } catch (error) {
//       // console.error('🔥 Validation error:', error);
//       toast.error('Failed to validate access code');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Affiliate handler - register and generate link
//   const handleAffiliate = async () => {
//     if (!affiliateEmail) {
//       toast.error('Please enter your email address');
//       return;
//     }
    
//     if (!affiliateEmail.includes('@')) {
//       toast.error('Please enter a valid email address');
//       return;
//     }
    
//     setIsAffiliateLoading(true);
    
//     try {
//       // console.log('🔗 Generating affiliate link for:', affiliateEmail);
//       // console.log('📧 With name:', affiliateName);
      
//       const result = await AffiliateService.registerAffiliate(affiliateEmail, affiliateName);
//       // console.log('📝 Registration result:', result);
      
//       if (!result.success) {
//         toast.error(result.error || 'Failed to register as affiliate');
//         setIsAffiliateLoading(false);
//         return;
//       }
      
//       if (result.affiliate) {
//         const link = result.affiliate.link || AffiliateService.generateShareLink(result.affiliate.code);
        
//         setAffiliateLink(link);
//         setAffiliateGenerated(true);
        
//         localStorage.setItem('affiliate_info', JSON.stringify({
//           affiliateCode: result.affiliate.code,
//           email: affiliateEmail,
//           name: affiliateName,
//           link: link,
//           generatedAt: new Date().toISOString()
//         }));
        
//         toast.success('🎉 Affiliate link generated! Check your email for dashboard access.');
        
//         setTimeout(() => {
//           const element = document.getElementById('affiliate-link-section');
//           if (element) {
//             element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }
//         }, 300);
//       } else {
//         // Fallback
//         const timestamp = Date.now();
//         const randomId = Math.random().toString(36).substr(2, 8).toUpperCase();
//         const mockAffiliateId = `AFF${timestamp.toString(36).toUpperCase()}${randomId}`;
//         const link = AffiliateService.generateShareLink(mockAffiliateId);
        
//         setAffiliateLink(link);
//         setAffiliateGenerated(true);
        
//         toast.success('Affiliate link generated!');
//       }
      
//     } catch (error) {
//       // console.error('❌ Affiliate generation error:', error);
//       toast.error('Failed to generate affiliate link. Please try again.');
//     } finally {
//       setIsAffiliateLoading(false);
//     }
//   };

//   // Copy affiliate link to clipboard
//   const copyAffiliateLink = () => {
//     if (affiliateLink) {
//       navigator.clipboard.writeText(affiliateLink);
//       setCopiedLink(true);
//       setTimeout(() => setCopiedLink(false), 2000);
//       toast.success('Link copied to clipboard!');
//     }
//   };

//   // Calculate earnings based on sales estimate
//   const calculateEarnings = (sales) => {
//     const earnings = sales * stats.affiliateCommission;
//     return `₦${earnings.toLocaleString()}`;
//   };

//   // Render ebook content
//   const renderEbookContent = () => {
//     if (!hasAccess) {
//       const lines = PREVIEW_CONTENT.split('\n');
//       const totalLines = lines.length;
//       const blurStartLine = Math.floor(totalLines * 0.6);
    
//       return (
//         <div className={styles.ebookContent}>
//           <div className={styles.previewWrapper}>
//             {lines.map((line, idx) => {
//               // Calculate blur intensity based on position
//               let blur = 0;
//               let opacity = 1;
            
//               if (idx > blurStartLine) {
//                 const blurProgress = Math.min(1, (idx - blurStartLine) / (totalLines - blurStartLine));
//                 blur = blurProgress * 10;
//                 opacity = 1 - (blurProgress * 0.3); // Slight fade for smoother transition
//               }
            
//               return (
//                 <p 
//                   key={idx} 
//                   className={`${styles.contentLine} ${idx > blurStartLine ? styles.blurredLine : ''}`}
//                   style={{ 
//                     filter: blur > 0 ? `blur(${blur}px)` : 'none',
//                     opacity: opacity,
//                     userSelect: blur > 5 ? 'none' : 'auto'
//                   }}
//                 >
//                   {line || '\u00A0'}
//                 </p>
//               );
//             })}
//           </div>
        
//           <div className={styles.purchaseOverlay}>
//             <button 
//               onClick={handlePurchase} 
//               className={`btn btn-primary ${styles.purchaseBtn}`}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Processing...' : `Buy Full Book - ₦${stats.price.toLocaleString()}`}
//             </button>
//             <p className={styles.purchaseText}>Continue reading instantly after purchase</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={styles.ebookContent}>
//         {/* <p className={styles.fullAccessText}>You have full access to this book. Thank you for your purchase!</p> */}
//         {PREVIEW_CONTENT.split('\n').map((line, idx) => (
//           <p key={idx} className={styles.contentLine}>{line || '\u00A0'}</p>
//         ))}
//         <div className={styles.successMessage}>
//           {/* <p className={styles.successText}>[Full book content continues for all chapters...]</p> */}
//           {/* <p className={styles.successNote}>The complete book would load here after payment verification</p> */}
//         </div>
//       </div>
//     );
//   };

//   if (showReader) {
//     return (
//       <div className={styles.readerContainer}>
//         <div className={styles.readerHeader}>
//           <div className="container">
//             <div className={styles.readerNav}>
//               <h1 className={styles.readerTitle}>Suicide Note</h1>
//               <button onClick={() => setShowReader(false)} className={styles.backButton}>
//                 ← Back to Homepage
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className={styles.readerContent}>
//           <div className="container">
//             {renderEbookContent()}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* Guest Checkout Modal */}
//       <GuestCheckoutModal
//         isOpen={showGuestCheckout}
//         onClose={() => setShowGuestCheckout(false)}
//         onSuccess={handleGuestCheckoutSuccess}
//         ebookId="suicide-note-2026"
//         ebookPrice={stats.price}
//         ebookTitle="Suicide Note"
//         affiliateCode={new URLSearchParams(window.location.search).get('ref')}
//       />
      
//       {/* Navigation */}
//       <nav className={styles.navbar}>
//         <div className="container">
//           <div className={styles.navContent}>
//             <div className={styles.logo}>
//               <Icon name="Book" className={styles.logoIcon} />
//               <span className={styles.logoText}>Suicide Note</span>
//             </div>
            
//             <div className={styles.desktopNav}>
//               <a href="#preview" className={styles.navLink}>Preview</a>
//               <a href="#reviews" className={styles.navLink}>Reviews</a>
//               <a href="#faq" className={styles.navLink}>FAQ</a>
//               <a href="#affiliate" className={styles.navLink}>Affiliate</a>
//               <button 
//                 onClick={handlePurchase} 
//                 className="btn btn-primary"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Processing...' : 'Buy Now'}
//               </button>
//             </div>
            
//             <button 
//               className={styles.mobileMenuButton} 
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               disabled={isLoading}
//             >
//               <Icon name={mobileMenuOpen ? "X" : "Menu"} />
//             </button>
//           </div>
//         </div>
        
//         {mobileMenuOpen && (
//           <div className={styles.mobileMenu}>
//             <div className={styles.mobileMenuContent}>
//               <a href="#preview" className={styles.mobileNavLink}>Preview</a>
//               <a href="#reviews" className={styles.mobileNavLink}>Reviews</a>
//               <a href="#faq" className={styles.mobileNavLink}>FAQ</a>
//               <a href="#affiliate" className={styles.mobileNavLink}>Affiliate</a>
//               <button 
//                 onClick={handlePurchase} 
//                 className="btn btn-primary w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Processing...' : 'Buy Now'}
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section with Book Cover */}
//       <section className={styles.hero}>
//         <div className="container">
//           <div className={styles.heroGrid}>
//              {/* Book Cover Container - Will be first in DOM for mobile */}
//              <div className={styles.heroCard}>
//                <div className={styles.bookCoverContainer}>
//                  <img 
//                    src="/images/suicide-note-cover.jpeg" 
//                    alt="Suicide Note Book Cover" 
//                    className={styles.bookCover}
//                     onError={(e) => {
//                      e.target.onerror = null;
//                      e.target.src = 'https://via.placeholder.com/400x600?text=Suicide+Note+Cover';
//                     }}
//                   />
//                   <div className={styles.bookCoverBadge}>
//                     <span className={styles.bestsellerBadge}>#1 Bestseller</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Hero Content */}
//               <div className={styles.heroContent}>
//                 <span className="badge badge-red">#1 Nigerian Mental Health Fiction</span>
//                 <h1 className={styles.heroTitle}>A Story of Darkness, Hope, and Healing</h1>
//                 <p className={styles.heroSubtitle}>
//                   Follow Eliora's journey from the edge of despair to finding community, purpose, and reasons to live in Lagos, Nigeria.
//                 </p>
        
//                 <div className="rating mb-6">
//                   {[...Array(5)].map((_, i) => (
//                     <Icon key={i} name="Star" className="star" />
//                   ))}
//                   <span className={styles.ratingText}>{stats.rating.toFixed(1)}/5 from {stats.readers} readers</span>
//                 </div>
        
//                 <div className={styles.ctaButtons}>
//                   <button 
//                     onClick={handlePurchase} 
//                     className={`btn btn-primary ${styles.ctaButton}`}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Processing...' : `Buy Now - ₦${stats.price.toLocaleString()}`}
//                   </button>
//                   <button 
//                     onClick={() => setShowReader(true)} 
//                     className={`btn btn-outline ${styles.ctaButton}`}
//                   >
//                     Read Preview
//                   </button>
//                 </div>
        
//                 <p className={styles.instantAccess}>
//                   Instant access • Read online • No downloads needed
//                 </p>
//               </div>
//             </div>
//           </div>
//       </section>

//       {/* Preview Section */}
//       <section id="preview" className={styles.previewSection}>
//         <div className="container">
//           <div className="text-center mb-12">
//             <h2 className={styles.sectionTitle}>Preview the First Chapter</h2>
//             <p className={styles.sectionSubtitle}>Read before you buy - see if this book resonates with you</p>
//           </div>
          
//           <div className={styles.previewCard}>
//             <div className={styles.previewHeader}>
//               <h3 className={styles.previewTitle}>Chapter One: The Note Begins</h3>
//               <button onClick={() => setShowReader(true)} className={styles.openReaderButton}>
//                 <Icon name="Eye" className={styles.eyeIcon} />
//                 <span>Open Reader</span>
//               </button>
//             </div>
            
//             <div className={styles.previewContent}>
//               <p className={styles.previewText}>
//                 "I'm writing this because I need someone to understand. Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man..."
//               </p>
//               <p className={styles.previewNote}>
//                 Preview continues in the reader. Purchase to read all {stats.chapters} chapters.
//               </p>
//             </div>
            
//             <div className={styles.accessForm}>
//               <div className={styles.accessInputGroup}>
//                 <input
//                   type="text"
//                   placeholder="Enter access code from purchase"
//                   value={accessCode}
//                   onChange={(e) => setAccessCode(e.target.value)}
//                   className="form-input"
//                   disabled={isLoading}
//                 />
//                 <button 
//                   onClick={handleAccessCode} 
//                   className="btn btn-secondary"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Validating...' : 'Access Full Book'}
//                 </button>
//               </div>
//               <p className={styles.accessNote}>
//                 Already purchased? Enter your access code to read the full book
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className={styles.statsSection}>
//         <div className="container">
//           <div className={styles.statsGrid}>
//             <div className={styles.statItem}>
//               <div className={styles.statNumber}>{stats.readers}+</div>
//               <div className={styles.statLabel}>Happy Readers</div>
//             </div>
//             <div className={styles.statItem}>
//               <div className={styles.statNumber}>{stats.rating.toFixed(1)}/5</div>
//               <div className={styles.statLabel}>Average Rating</div>
//             </div>
//             <div className={styles.statItem}>
//               <div className={styles.statNumber}>{stats.chapters}</div>
//               <div className={styles.statLabel}>Powerful Chapters</div>
//             </div>
//             <div className={styles.statItem}>
//               <div className={styles.statNumber}>₦{stats.price.toLocaleString()}</div>
//               <div className={styles.statLabel}>One-Time Payment</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section id="reviews" className={styles.reviewsSection}>
//         <div className="container">
//           <div className="text-center mb-12">
//             <h2 className={styles.sectionTitle}>What Readers Are Saying</h2>
//             <p className={styles.sectionSubtitle}>Real reviews from real readers</p>
//           </div>
          
//           <div className={styles.reviewsGrid}>
//             {reviews.map((review, idx) => (
//               <div key={idx} className="card">
//                 <div className={styles.reviewHeader}>
//                   <div className="rating">
//                     {[...Array(review.rating || 5)].map((_, i) => (
//                       <Icon key={i} name="Star" className="star" />
//                     ))}
//                   </div>
//                   <span className={styles.reviewDate}>{review.date || "Recently"}</span>
//                 </div>
//                 <p className={styles.reviewText}>{review.text}</p>
//                 <p className={styles.reviewer}>- {review.name || 'Anonymous Reader'}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12">
//             <div className={styles.ratingBadge}>
//               <div className="rating">
//                 {[...Array(5)].map((_, i) => (
//                   <Icon key={i} name="Star" className="star" style={{ width: '1.5rem', height: '1.5rem' }} />
//                 ))}
//               </div>
//               <span className={styles.ratingScore}>{stats.rating.toFixed(1)} out of 5 stars</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Affiliate Section */}
//       <section id="affiliate" className={styles.affiliateSection}>
//         <div className="container">
//           <div className="text-center">
//             <span className="badge badge-green">💰 Earn ₦{stats.affiliateCommission.toLocaleString()} Per Sale</span>
//             <h2 className={`${styles.sectionTitle} mt-4`}>Become an Affiliate Partner</h2>
//             <p className={styles.affiliateSubtitle}>
//               Earn <strong className={styles.highlightGreen}>{Math.round(stats.affiliateRate * 100)}% commission</strong> on every sale. Share a book that matters and get paid for it.
//             </p>
            
//             <div className={styles.affiliateStats}>
//               <p>Sell 2 books = <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 2).toLocaleString()}</strong></p>
//               <p>Sell 20 books = <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 20).toLocaleString()}</strong></p>
//               <p>Sell 50 books = <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 50).toLocaleString()}</strong></p>
//             </div>
            
//             <div className={styles.affiliateCard}>
//               {/* Success Story */}
//               <div className={styles.successStory}>
//                 <div className={styles.storyContent}>
//                   <div className={styles.storyAvatar}>
//                     {reviews.find(r => r.name?.includes('Tunde'))?.name?.charAt(0) || 'T'}
//                   </div>
//                   <div>
//                     <p className={styles.storyText}>
//                       "I've earned <strong className={styles.highlightGreen}>₦{(stats.affiliateCommission * 37.6).toLocaleString()} in 2 months</strong> just by sharing this book on my Twitter. It helped me with my own mental health journey, and now I help others find it while earning."
//                     </p>
//                     <p className={styles.storyAuthor}>- Tunde O., Affiliate Partner</p>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.affiliateSteps}>
//                 <div className={styles.step}>
//                   <div className={styles.stepIcon}>
//                     <Icon name="Users" />
//                   </div>
//                   <h3 className={styles.stepTitle}>1. Sign Up Free</h3>
//                   <p className={styles.stepDescription}>Get your unique affiliate link instantly - no approval needed</p>
//                 </div>
                
//                 <div className={styles.step}>
//                   <div className={styles.stepIcon}>
//                     <Icon name="MessageCircle" />
//                   </div>
//                   <h3 className={styles.stepTitle}>2. Share Everywhere</h3>
//                   <p className={styles.stepDescription}>Twitter, WhatsApp, Facebook, Instagram, your blog</p>
//                 </div>
                
//                 <div className={styles.step}>
//                   <div className={styles.stepIcon}>
//                     <Icon name="Award" />
//                   </div>
//                   <h3 className={styles.stepTitle}>3. Earn ₦{stats.affiliateCommission.toLocaleString()} Each</h3>
//                   <p className={styles.stepDescription}>Get {Math.round(stats.affiliateRate * 100)}% commission paid via Paystack within 7 days</p>
//                 </div>
//               </div>

//               <div className="pro-tip">
//                 <h3 className={styles.explanationTitle}>Why We Offer {Math.round(stats.affiliateRate * 100)}% Commission</h3>
//                 <p className={styles.explanationText}>
//                   Most Nigerian ebooks offer 20-30%. We offer <strong>{Math.round(stats.affiliateRate * 100)}%</strong> because this book changes lives, and we want you to be genuinely motivated to share it. When you succeed, we succeed. It's that simple.
//                 </p>
//               </div>
              
//               <div className={styles.affiliateForm} id="affiliate-link-section">
//                 <h3 className={styles.formTitle}>Get Your Affiliate Link Now</h3>
                
//                 {!affiliateGenerated ? (
//                   <>
//                     <div className={styles.formGroup}>
//                       <input
//                         type="text"
//                         placeholder="Your name (optional)"
//                         value={affiliateName}
//                         onChange={(e) => setAffiliateName(e.target.value)}
//                         className="form-input"
//                         disabled={isAffiliateLoading}
//                       />
//                     </div>
//                     <div className={styles.formGroup}>
//                       <input
//                         type="email"
//                         placeholder="Enter your email *"
//                         value={affiliateEmail}
//                         onChange={(e) => setAffiliateEmail(e.target.value)}
//                         className="form-input"
//                         disabled={isAffiliateLoading}
//                         required
//                       />
//                     </div>
//                     <button 
//                       onClick={handleAffiliate} 
//                       className="btn btn-green"
//                       disabled={isAffiliateLoading || !affiliateEmail || !affiliateEmail.includes('@')}
//                     >
//                       {isAffiliateLoading ? (
//                         <>
//                           <span className="spinner-sm mr-2"></span>
//                           Processing...
//                         </>
//                       ) : (
//                         'Get My Affiliate Link →'
//                       )}
//                     </button>
//                     <p className={styles.formNote}>
//                       No approval process. Start earning immediately.
//                     </p>
//                   </>
//                 ) : (
//                   <div className={styles.linkBox}>
//                     <p className={styles.linkLabel}>🎉 Your affiliate link is ready!</p>
//                     <code className={styles.linkCode}>{affiliateLink}</code>
//                     <div className={styles.linkActions}>
//                       <button
//                         onClick={copyAffiliateLink}
//                         className={styles.copyButtonLarge}
//                       >
//                         <Icon name="Copy" /> {copiedLink ? 'Copied!' : 'Copy Link'}
//                       </button>
//                     </div>
                    
//                     {/* Social sharing buttons */}
//                     <div className={styles.socialShare}>
//                       <p className={styles.shareLabel}>Share on:</p>
//                       <div className={styles.socialButtons}>
//                         <a 
//                           href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('I just earned from sharing this powerful book about mental health in Nigeria. Join me as an affiliate and earn 50% commission!')}&url=${encodeURIComponent(affiliateLink)}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={styles.twitterShare}
//                         >
//                           <Icon name="Twitter" /> Twitter
//                         </a>
//                         <a 
//                           href={`https://wa.me/?text=${encodeURIComponent(`Check out this powerful book about mental health in Nigeria. I'm earning as an affiliate and you can too! ${affiliateLink}`)}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={styles.whatsappShare}
//                         >
//                           <Icon name="MessageCircle" /> WhatsApp
//                         </a>
//                         <a 
//                           href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={styles.facebookShare}
//                         >
//                           <Icon name="Facebook" /> Facebook
//                         </a>
//                       </div>
//                     </div>
                    
//                     {/* Earnings calculator */}
//                     <div className={styles.calculator}>
//                       <h4 className={styles.calculatorTitle}>💰 Estimate Your Earnings</h4>
//                       <div className={styles.sliderContainer}>
//                         <label className={styles.sliderLabel}>
//                           How many sales per month?
//                         </label>
//                         <input
//                           type="range"
//                           min="5"
//                           max="100"
//                           step="5"
//                           value={salesEstimate}
//                           onChange={(e) => setSalesEstimate(Number(e.target.value))}
//                           className={styles.slider}
//                         />
//                         <div className={styles.sliderLabels}>
//                           <span>5 sales</span>
//                           <span>100 sales</span>
//                         </div>
//                       </div>
                      
//                       <div className={styles.earningsDisplay}>
//                         <div className={styles.earningsAmount}>{calculateEarnings(salesEstimate)}</div>
//                         <p className={styles.earningsText}>per month with {salesEstimate} sales</p>
//                       </div>
//                     </div>
                    
//                     <p className={styles.linkNote}>
//                       Share this link and earn ₦{stats.affiliateCommission.toLocaleString()} per sale! We'll email you tracking updates and payout information.
//                     </p>
//                     <p className={styles.emailConfirmation}>
//                       <small>We've sent a confirmation to <strong>{affiliateEmail}</strong></small>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section id="faq" className={styles.faqSection}>
//         <div className="container">
//           <div className="text-center mb-12">
//             <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
//             <p className={styles.sectionSubtitle}>Everything you need to know</p>
//           </div>
          
//           <div className={styles.faqGrid}>
//             {faqs.map((faq, idx) => (
//               <div key={idx} className="card">
//                 <h3 className={styles.faqQuestion}>{faq.q}</h3>
//                 <p className={styles.faqAnswer}>{faq.a}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className={styles.finalCTA}>
//         <div className="container text-center">
//           <h2 className={styles.ctaTitle}>Ready to Read Eliora's Story?</h2>
//           <p className={styles.ctaSubtitle}>
//             Join {stats.readers}+ readers who found hope, understanding, and connection in this powerful story
//           </p>
          
//           <button 
//             onClick={handlePurchase} 
//             className={`btn ${styles.ctaButton}`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Processing...' : `Buy Now - ₦${stats.price.toLocaleString()}`}
//           </button>
          
//           <p className={styles.ctaFeatures}>
//             ✓ Instant access ✓ Read online anytime ✓ Secure payment via Paystack
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         <div className="container">
//           <div className={styles.footerGrid}>
//             <div className={styles.footerSection}>
//               <h3 className={styles.footerTitle}>About the Book</h3>
//               <p className={styles.footerText}>
//                 A powerful Nigerian fiction exploring mental health, depression, and the journey to healing through community and connection.
//               </p>
//             </div>
            
//             <div className={styles.footerSection}>
//               <h3 className={styles.footerTitle}>Crisis Resources</h3>
//               <p className={styles.footerText}>Nigeria Emergency: 112</p>
//               <p className={styles.footerText}>Lagos Emergency: 767</p>
//             </div>
            
//             <div className={styles.footerSection}>
//               <h3 className={styles.footerTitle}>Connect</h3>
//               <p className={styles.footerText}>Email: support@suicidenotebook.com</p>
//               <p className={styles.footerText}>Follow @loba_yusuf on X</p>
//             </div>
//           </div>
          
//           <div className={styles.footerBottom}>
//             <p className={styles.copyright}>
//               © 2026 Loba Yusuf. All rights reserved. | This is a work of fiction.
//             </p>
//             <p className={styles.crisisNote}>
//               If you're experiencing suicidal thoughts, please seek help immediately. You are not alone.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default EbookLandingPage;

import React, { useState, useEffect } from 'react';
import PaymentService from '../../services/PaymentService';
import AffiliateService from '../../services/AffiliateService';
import GuestCheckoutModal from '../../components/GuestCheckoutModal';
import { ebookAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EbookLandingPage = () => {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [affiliateEmail, setAffiliateEmail] = useState('');
  const [affiliateName, setAffiliateName] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAffiliateLoading, setIsAffiliateLoading] = useState(false);
  const [showGuestCheckout, setShowGuestCheckout] = useState(false);
  const [affiliateGenerated, setAffiliateGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [salesEstimate, setSalesEstimate] = useState(20);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  const [reviews] = useState([
    {
      name: "Zhowi Sika",
      text: "A smooth, relatable read that captures life in Lagos with authenticity. Suicide Note beautifully shows how strangers online can become a real-life support system, transforming despair into hope and purpose.",
      initial: "Z",
      photo: "/images/ZhowiSika.jpeg"
    },
    {
      name: "Damter Nankay",
      text: "Suicide Note is deeply immersive and emotionally relatable. Eliora's journey from despair to hope reminds readers that even in life's darkest moments, healing, friendship, and purpose are still possible.",
      initial: "D",
      photo: "/images/DamterNankay.jpeg"
    },
    {
      name: "Opeyemi Saka",
      text: "A deeply reflective story about depression, loneliness, survival, and healing. It reminds readers that recovery is found in showing up every day and that the right people can change everything.",
      initial: "O",
      photo: "/images/OpeyemiSaka.jpeg"
    }
  ]);

  const [faqs] = useState([
    { q: "How do I access the book after payment?", a: "Once your payment is confirmed via Paystack, you'll receive instant access. You can read directly in your browser on any device — no downloads or apps needed." },
    { q: "Is this fiction or a true story?", a: "Suicide Note is literary fiction — Eliora is a fictional character. However, the emotional experiences he goes through are drawn from real, deeply human feelings that many young Nigerians quietly carry." },
    { q: "What if Paystack doesn't work for me?", a: "No stress — reach out on WhatsApp and we'll sort out an alternative payment method that works for you." },
    { q: "Is this book appropriate if I'm personally struggling?", a: "The book deals honestly with themes of depression and suicidal ideation. It is written with deep care and moves toward hope — but please be gentle with yourself." },
    { q: "Can I read it on my phone?", a: "Yes — the reading experience is fully optimised for mobile. You can read it anywhere, anytime, without needing to download anything." }
  ]);

  const [stats, setStats] = useState({
    readers: 1127,
    rating: 4.9,
    price: 3000,
    affiliateCommission: 1000,
    affiliateRate: 0.5
  });

  // Scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  // Sticky bar visibility
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    const ctaEl = document.getElementById('cta-block');
    const stickyBar = document.getElementById('stickyBar');
    
    if (!heroEl || !ctaEl || !stickyBar) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.target === heroEl) {
          stickyBar.classList.toggle('visible', !e.isIntersecting);
        }
        if (e.target === ctaEl) {
          stickyBar.classList.toggle('visible', !e.isIntersecting);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroEl);
    observer.observe(ctaEl);
    
    return () => observer.disconnect();
  }, []);

  // FAQ accordion
  useEffect(() => {
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference') || urlParams.get('trxref');
      
      if (reference) {
        window.history.replaceState({}, document.title, window.location.pathname);
        
        try {
          toast.loading('Verifying your payment...');
          const result = await PaymentService.verifyPayment(reference);
          
          if (result.success) {
            const purchaseData = {
              purchase: result.data,
              accessCode: result.data.accessCode || "SN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
              timestamp: new Date().toISOString()
            };
            localStorage.setItem('recent_purchase', JSON.stringify(purchaseData));
            
            if (result.data.accessCode) {
              localStorage.setItem(`ebook_access_suicide-note-2026`, result.data.accessCode);
            }
            
            toast.dismiss();
            setTimeout(() => {
              window.location.href = '/thank-you';
            }, 300);
            return;
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          toast.error('Failed to verify payment. Please try again.');
        } finally {
          toast.dismiss();
        }
      }
      
      const savedCode = localStorage.getItem(`ebook_access_suicide-note-2026`);
      if (savedCode) {
        setHasAccess(true);
      }
      
      fetchRealData();
    };
    
    initialize();
  }, [navigate]);

  const fetchRealData = async () => {
    const ebookId = 'suicide-note-2026';
    
    try {
      const ebookResponse = await ebookAPI.getById(ebookId);
      
      if (ebookResponse.data?.success) {
        const ebook = ebookResponse.data.data.ebook || ebookResponse.data.data;
        
        if (ebook.price || ebook.salesCount || ebook.ratings) {
          const apiPrice = ebook.price || ebook.currentPrice;
          const finalPrice = apiPrice === 25 ? 3000 : (apiPrice || stats.price);
          
          setStats(prev => ({
            ...prev,
            readers: ebook.salesCount || ebook.readerCount || prev.readers,
            rating: ebook.ratings?.average || ebook.averageRating || prev.rating,
            price: finalPrice,
            affiliateCommission: Math.floor(finalPrice * (ebook.affiliateCommissionRate || ebook.affiliateRate || 0.5)),
            affiliateRate: ebook.affiliateCommissionRate || ebook.affiliateRate || 0.5
          }));
        }
      }
    } catch (error) {
      // Using default data
    }
  };

  const handlePurchase = () => {
    setShowGuestCheckout(true);
  };

  const handleGuestCheckoutSuccess = async (guestData) => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateCode = urlParams.get('ref');
      await PaymentService.initializePayment('suicide-note-2026', affiliateCode);
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessCode = async () => {
    if (!accessCode.trim()) {
      toast.error('Please enter an access code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await PaymentService.validateAccessCode(accessCode, 'suicide-note-2026');
      
      if (result.success) {
        const cleanCode = accessCode.trim().toUpperCase();
        localStorage.setItem(`ebook_access_suicide-note-2026`, cleanCode);
        window.location.href = `/read/suicide-note-2026?accessCode=${cleanCode}&validated=true`;
        toast.success('Access granted! Redirecting...');
      } else {
        toast.error(result.error || 'Invalid access code');
        setAccessCode('');
      }
    } catch (error) {
      toast.error('Failed to validate access code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAffiliate = async () => {
    if (!affiliateEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!affiliateEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsAffiliateLoading(true);
    
    try {
      const result = await AffiliateService.registerAffiliate(affiliateEmail, affiliateName);
      
      if (!result.success) {
        toast.error(result.error || 'Failed to register as affiliate');
        setIsAffiliateLoading(false);
        return;
      }
      
      if (result.affiliate) {
        const link = result.affiliate.link || AffiliateService.generateShareLink(result.affiliate.code);
        setAffiliateLink(link);
        setAffiliateGenerated(true);
        localStorage.setItem('affiliate_info', JSON.stringify({
          affiliateCode: result.affiliate.code,
          email: affiliateEmail,
          name: affiliateName,
          link: link,
          generatedAt: new Date().toISOString()
        }));
        toast.success('🎉 Affiliate link generated! Check your email for dashboard access.');
      } else {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substr(2, 8).toUpperCase();
        const mockAffiliateId = `AFF${timestamp.toString(36).toUpperCase()}${randomId}`;
        const link = AffiliateService.generateShareLink(mockAffiliateId);
        setAffiliateLink(link);
        setAffiliateGenerated(true);
        toast.success('Affiliate link generated!');
      }
    } catch (error) {
      toast.error('Failed to generate affiliate link. Please try again.');
    } finally {
      setIsAffiliateLoading(false);
    }
  };

  const copyAffiliateLink = () => {
    if (affiliateLink) {
      navigator.clipboard.writeText(affiliateLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      toast.success('Link copied to clipboard!');
    }
  };

  const calculateEarnings = (sales) => {
    const earnings = sales * stats.affiliateCommission;
    return `₦${earnings.toLocaleString()}`;
  };

  if (showReader) {
    return (
      <div style={{ background: '#0d0c0b', minHeight: '100vh', color: '#e4d9c8' }}>
        <div style={{ position: 'sticky', top: 0, background: '#181614', borderBottom: '1px solid rgba(196,124,58,0.25)', padding: '20px 0' }}>
          <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 300 }}>Suicide Note</h1>
            <button onClick={() => setShowReader(false)} style={{ background: 'none', border: '1px solid rgba(196,124,58,0.25)', borderRadius: '3px', padding: '8px 16px', color: '#c47c3a', cursor: 'pointer' }}>← Back</button>
          </div>
        </div>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 28px' }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.85 }}>I'm writing this because I need someone to understand...</p>
          {!hasAccess && (
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, #0d0c0b, transparent)', padding: '60px 24px 30px', textAlign: 'center' }}>
              <button onClick={handlePurchase} style={{ background: '#c47c3a', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '3px', cursor: 'pointer' }}>Buy Full Book - ₦{stats.price.toLocaleString()}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <GuestCheckoutModal
        isOpen={showGuestCheckout}
        onClose={() => setShowGuestCheckout(false)}
        onSuccess={handleGuestCheckoutSuccess}
        ebookId="suicide-note-2026"
        ebookPrice={stats.price}
        ebookTitle="Suicide Note"
        affiliateCode={new URLSearchParams(window.location.search).get('ref')}
      />
      
      {/* Hero Section */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 28px', position: 'relative', background: '#0d0c0b' }}>
        <img 
          src="/images/suicide-note-cover.jpeg" 
          alt="Suicide Note Book Cover"
          style={{ width: '190px', borderRadius: '3px', boxShadow: '0 0 60px rgba(196,124,58,0.12), 0 30px 80px rgba(0,0,0,0.7)', background: '#1f1c19' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Suicide+Note'; }}
        />
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(46px, 8vw, 72px)', fontWeight: 300, letterSpacing: '0.04em', marginTop: '2rem', color: '#e4d9c8' }}>Suicide Note</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: '#9a8872', marginTop: '0.6rem' }}>A Short Psychological Narrative</p>
        <p style={{ fontSize: '17px', maxWidth: '420px', marginTop: '1.6rem', color: '#e4d9c8' }}>
          <em style={{ color: '#9a8872' }}>For everyone who has felt invisible<br />and couldn't find the words to explain it.</em>
        </p>
        <div style={{ marginTop: '3rem', fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.18em', color: '#9a8872', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span>Scroll</span>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, #c47c3a, transparent)', animation: 'pulse 2s ease infinite' }}></div>
        </div>
      </section>

      {/* For You Section */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>For You, If —</span>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '19px', lineHeight: 2, maxWidth: '580px', margin: '0 auto', color: '#e4d9c8' }}>
              If you've ever gone days without someone saying your name. If you've sat in a city of millions and felt like a ghost passing through. If you've smiled at people who didn't notice. If you've scrolled through other people's lives at 1 AM wondering what went wrong with yours — this story was written inside your silence.
            </p>
          </div>
        </div>
      </section>

      <div style={{ background: '#0d0c0b', padding: 0, margin: 0 }}><div style={{ width: '48px', height: '1px', background: '#c47c3a', margin: '0 auto', opacity: 0.6 }}></div></div>

      {/* Synopsis Section */}
      <section style={{ padding: '80px 0', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>The Story</span>
            <p style={{ marginBottom: '1.3rem', fontSize: '17px', color: '#e4d9c8', lineHeight: 1.85 }}>Eliora Oluwafemi Adetayo is twenty-six years old. He has a degree he can't use, a warehouse job that doesn't require one, and a self-contain in Ojuelegba small enough to touch both walls with outstretched arms. In Lagos — a city of twenty million — he is completely alone.</p>
            <p style={{ marginBottom: '1.3rem', fontSize: '17px', color: '#e4d9c8', lineHeight: 1.85 }}>On a Friday night in November, with NEPA taking the light and his phone battery at 23%, Eliora tears out the blank pages of an old exercise book and begins to write. Not a diary. Not a prayer. A suicide note. Because the silence has finally become too heavy to carry alone.</p>
            <p style={{ marginBottom: '1.3rem', fontSize: '17px', color: '#e4d9c8', lineHeight: 1.85 }}><em>Suicide Note</em> is a story about what happens in the space between despair and the next morning. About the invisible lives behind Lagos's noise. About loneliness so specific it feels like a fingerprint — and the unexpected places where healing finds its way in.</p>
          </div>
        </div>
      </section>

      <div style={{ background: '#0d0c0b', padding: 0, margin: 0 }}><div style={{ width: '48px', height: '1px', background: '#c47c3a', margin: '0 auto', opacity: 0.6 }}></div></div>

      {/* Preview Section */}
      <section style={{ padding: '80px 0', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>Read a Preview</span>
            
            <div style={{ position: 'relative', maxHeight: '108px', overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: '16px', lineHeight: 1.95, color: '#e4d9c8' }}>
                <p style={{ marginBottom: '1.3rem' }}>I'm writing this because I need someone to understand. Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man. Not Tola, too busy with her husband and children to notice I've been disappearing for years. Not Deji, who has exams next week and a future that shouldn't be shadowed by this.</p>
                <p>Someone. Anyone. Maybe no one.</p>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '68px', background: 'linear-gradient(to bottom, transparent, #0d0c0b)', pointerEvents: 'none' }}></div>
            </div>
            
            <button 
              onClick={() => setPreviewExpanded(!previewExpanded)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid rgba(196,124,58,0.25)', borderRadius: '3px', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.16em', color: '#c47c3a', textTransform: 'uppercase', margin: '20px auto 0', padding: '11px 20px' }}
            >
              <span style={{ fontSize: '16px', transition: 'transform 0.3s ease', display: 'inline-block', transform: previewExpanded ? 'rotate(45deg)' : 'none' }}>+</span>
              <span>{previewExpanded ? 'Collapse Preview' : 'Read a Preview'}</span>
            </button>
            
            {previewExpanded && (
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(196,124,58,0.25)' }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '16px', lineHeight: 1.95, color: '#e4d9c8' }}>
                  <p style={{ marginBottom: '1.3rem' }}>I'm writing this because I need someone to understand. Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man. Not Tola, too busy with her husband and children to notice I've been disappearing for years. Not Deji, who has exams next week and a future that shouldn't be shadowed by this.</p>
                  <p style={{ marginBottom: '1.3rem' }}>Someone. Anyone. Maybe no one.</p>
                </div>
                <div style={{ textAlign: 'center', color: '#c47c3a', fontSize: '13px', letterSpacing: '0.2em', margin: '2rem 0', opacity: 0.6 }}>✦</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '16px', lineHeight: 1.95, color: '#e4d9c8' }}>
                  <p>The thing about Lagos is, you can be surrounded by twenty million people and still drown in loneliness. I learned that slowly, the way you learn anything that kills you — one day at a time, so gradually you don't notice until you're already gone.</p>
                </div>
                <div style={{ textAlign: 'center', color: '#c47c3a', fontSize: '13px', letterSpacing: '0.2em', margin: '2rem 0', opacity: 0.6 }}>✦</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '16px', lineHeight: 1.95, color: '#e4d9c8' }}>
                  <p>My name is Eliora Oluwafemi Adetayo. Eliora means <em>my God is light</em>, Oluwafemi — <em>God loves me</em>, and Adetayo — <em>the crown meets joy</em>. My parents named me like I was supposed to be something. Like these names would protect me or guide me or make me into a relevant person.</p>
                </div>
                <div style={{ textAlign: 'center', color: '#c47c3a', fontSize: '13px', letterSpacing: '0.2em', margin: '2rem 0', opacity: 0.6 }}>✦</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '16px', lineHeight: 1.95, color: '#e4d9c8' }}>
                  <p>My phone battery is at 11% now. The light is dimming. I should finish this...</p>
                  <p>By the time you read this, I'll be—</p>
                  <p><em>My phone dies.</em></p>
                  <p><em>The flashlight cuts out mid-sentence, plunging the room into complete darkness.</em></p>
                  <p>I'll be—</p>
                  <p>What? Gone? Dead? Free? At peace?</p>
                  <p>I don't know. I was writing on momentum, and now the momentum has stopped.</p>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(196,124,58,0.25)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '20px', color: '#9a8872', marginBottom: '1.2rem' }}>The story doesn't end here.</p>
                  <button onClick={handlePurchase} style={{ background: '#c47c3a', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>Unlock the Full Book — ₦{stats.price.toLocaleString()}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div style={{ background: '#0d0c0b', padding: 0, margin: 0 }}><div style={{ width: '48px', height: '1px', background: '#c47c3a', margin: '0 auto', opacity: 0.6 }}></div></div>

      {/* Experience Section */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>After You Read</span>
            <blockquote style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '20px', lineHeight: 2, maxWidth: '560px', margin: '0 auto', border: 'none', padding: 0, color: '#e4d9c8' }}>
              You'll feel seen — maybe for the first time in a long time. You'll find language for things you've been carrying without words. And somewhere between Eliora's first page and his last, you may find a door you didn't know was there.
            </blockquote>
          </div>
        </div>
      </section>

      <div style={{ background: '#0d0c0b', padding: 0, margin: 0 }}><div style={{ width: '48px', height: '1px', background: '#c47c3a', margin: '0 auto', opacity: 0.6 }}></div></div>

      {/* Reviews Section */}
      <section style={{ padding: '80px 0', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease', marginBottom: '2rem' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>Readers Say</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }} className="reveal">
            {reviews.map((review, idx) => (
              <div key={idx} style={{ background: '#181614', borderTop: '2px solid #c47c3a', borderRadius: '3px', padding: '28px 24px 24px' }}>
                <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '15.5px', lineHeight: 1.85, marginBottom: '1.4rem', color: '#e4d9c8' }}>"{review.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Reviewer Avatar with Photo Support */}
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #c47c3a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#c47c3a', background: '#1f1c19', overflow: 'hidden' }}>
                    {review.photo ? (
                      <img 
                        src={review.photo} 
                        alt={review.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      review.initial
                    )}
                  </div>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.1em', color: '#9a8872', textTransform: 'uppercase' }}>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: '#0d0c0b', padding: 0, margin: 0 }}><div style={{ width: '48px', height: '1px', background: '#c47c3a', margin: '0 auto', opacity: 0.6 }}></div></div>

      {/* Author Section */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>The Author</span>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1.5px solid #c47c3a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#c47c3a', background: '#1f1c19', margin: '0 auto 1.8rem', overflow: 'hidden' }}>
              <img 
                src="/images/LobaYusuf.jpeg" 
                alt="Loba Yusuf"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />            
            </div>
            <p style={{ fontSize: '16.5px', lineHeight: 1.9, maxWidth: '540px', margin: '0 auto', color: '#e4d9c8' }}>I'm a Nigerian writer passionate about telling raw, emotional stories that make people feel seen and understood. My debut novel, <em>Suicide Note</em>, explores themes of mental health, survival, loneliness, and hope through deeply human storytelling. Beyond writing, I'm building a personal brand around books, creativity, and meaningful conversations that connect with young readers.</p>
            <br />
            <p style={{ fontSize: '14px', color: '#9a8872', fontFamily: "'Jost', sans-serif", letterSpacing: '0.06em' }}>— Loba Yusuf</p>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section id="cta-block" style={{ background: '#1f1c19', textAlign: 'center', borderTop: '1px solid rgba(196,124,58,0.25)', borderBottom: '1px solid rgba(196,124,58,0.25)', padding: '80px 0' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <img src="/images/suicide-note-cover.jpeg" alt="Suicide Note" style={{ width: '120px', borderRadius: '2px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', marginBottom: '1.6rem', background: '#181614' }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, letterSpacing: '0.06em', marginBottom: '0.5rem', color: '#e4d9c8' }}>Suicide Note</h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '26px', fontWeight: 500, color: '#c47c3a', marginBottom: '2rem', letterSpacing: '0.04em' }}>₦{stats.price.toLocaleString()}</p>
            <button onClick={handlePurchase} style={{ background: '#c47c3a', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>Unlock the Full Book</button>
            <p style={{ marginTop: '1.2rem', fontFamily: "'Jost', sans-serif", fontSize: '11.5px', letterSpacing: '0.1em', color: '#9a8872', textTransform: 'uppercase' }}>Instant access after payment · Secured by Paystack</p>
            <div style={{ marginTop: '2.2rem', paddingTop: '1.8rem', borderTop: '1px solid rgba(196,124,58,0.25)', fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '15.5px', color: '#9a8872', lineHeight: 1.8 }}>
              If you truly can't afford it right now — <a href="https://wa.me/2348131699259" target="_blank" rel="noopener" style={{ color: '#c47c3a', textDecoration: 'none', borderBottom: '1px solid rgba(196,124,58,0.3)' }}>message me on WhatsApp</a>.<br />
              <span style={{ fontSize: '14px' }}>This story was written for people who need it. Money was never supposed to be the barrier.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 0', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s ease, transform 0.7s ease', marginBottom: '2rem' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c47c3a', display: 'block', marginBottom: '1.4rem' }}>Questions</span>
          </div>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`} style={{ borderBottom: '1px solid rgba(196,124,58,0.25)' }}>
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '20px 0', fontFamily: "'Lora', serif", fontSize: '16px', color: '#e4d9c8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                {faq.q}
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '20px', color: '#c47c3a', transition: 'transform 0.3s', flexShrink: 0, transform: openFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div style={{ maxHeight: openFaq === idx ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{ fontSize: '15.5px', color: '#9a8872', lineHeight: 1.85, paddingBottom: '20px' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Access Form Section */}
      <section style={{ padding: '40px 0 80px', background: '#0d0c0b' }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 28px' }}>
          <div className="reveal" style={{ background: '#181614', borderTop: '2px solid #c47c3a', borderRadius: '3px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, marginBottom: '0.5rem', color: '#e4d9c8' }}>Already purchased?</h3>
            <p style={{ fontFamily: "'Lora', serif", color: '#9a8872', marginBottom: '2rem' }}>Enter your access code to read the full book</p>
            <div style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Enter access code from purchase"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                style={{ flex: 1, background: '#1f1c19', border: '1px solid rgba(196,124,58,0.25)', borderRadius: '3px', padding: '12px 14px', fontFamily: "'Lora', serif", fontSize: '15px', color: '#e4d9c8', outline: 'none' }}
                disabled={isLoading}
              />
              <button onClick={handleAccessCode} style={{ background: '#c47c3a', color: '#fff', fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '3px', border: 'none', cursor: 'pointer' }} disabled={isLoading}>
                {isLoading ? 'Validating...' : 'Access Full Book'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 28px', textAlign: 'center', borderTop: '1px solid rgba(196,124,58,0.25)', background: '#0d0c0b' }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.14em', color: '#9a8872', textTransform: 'uppercase' }}>© 2025 Suicide Note · <a href="https://suicidenotebook.com" style={{ color: '#9a8872', textDecoration: 'none' }}>suicidenotebook.com</a></p>
      </footer>

      {/* Sticky Bar */}
      <div id="stickyBar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#181614', borderTop: '1px solid rgba(196,124,58,0.25)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', zIndex: 100, transform: 'translateY(100%)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#e4d9c8' }}>Suicide Note</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', color: '#c47c3a', letterSpacing: '0.06em', display: 'block' }}>₦{stats.price.toLocaleString()} · Full Access</span>
        </div>
        <button onClick={handlePurchase} style={{ background: '#c47c3a', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '3px', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Unlock Book</button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        .reveal.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        #stickyBar.visible {
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
};

export default EbookLandingPage;