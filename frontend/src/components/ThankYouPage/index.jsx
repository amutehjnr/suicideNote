// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import PaymentService from '../../services/PaymentService';
// import styles from './ThankYouPage.module.css';

// const ThankYouPage = ({ onBackToHome }) => {
//   const [accessCode, setAccessCode] = useState('SN-MLQFLMOV-3B9CF9');
//   const [isLoading, setIsLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [purchase, setPurchase] = useState(null);
  
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Parse payment reference from URL and verify payment
//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         setIsLoading(true);
        
//         const urlParams = new URLSearchParams(location.search);
//         const reference = urlParams.get('reference');
//         const trxref = urlParams.get('trxref');
//         const sessionId = urlParams.get('session_id');
        
//         const paymentRef = reference || trxref || sessionId;
        
//         if (paymentRef) {
//           const result = await PaymentService.verifyPayment(paymentRef);
          
//           if (result.success) {
//             const purchaseData = result.data?.purchase || result.data;
//             const accessCodeData = result.data?.accessCode;
            
//             setPurchase(purchaseData);
            
//             if (accessCodeData) {
//               setAccessCode(accessCodeData);
//               localStorage.setItem('ebook_access_suicide-note-2026', accessCodeData);
//             }
            
//             localStorage.setItem('recent_purchase', JSON.stringify({
//               purchase: purchaseData,
//               accessCode: accessCodeData,
//               reference: paymentRef,
//               timestamp: new Date().toISOString()
//             }));
            
//             toast.success('🎉 Payment confirmed!');
//           } else {
//             const savedPurchase = localStorage.getItem('recent_purchase');
//             if (savedPurchase) {
//               const parsed = JSON.parse(savedPurchase);
//               setPurchase(parsed.purchase);
//               if (parsed.accessCode) {
//                 setAccessCode(parsed.accessCode);
//               }
//               toast.warning('Using cached purchase info');
//             } else {
//               toast.error('Payment verification failed');
//               navigate('/');
//             }
//           }
//         } else {
//           const savedPurchase = localStorage.getItem('recent_purchase');
//           if (savedPurchase) {
//             const parsed = JSON.parse(savedPurchase);
//             setPurchase(parsed.purchase);
//             if (parsed.accessCode) {
//               setAccessCode(parsed.accessCode);
//             }
//           } else {
//             toast.error('No purchase found');
//             navigate('/');
//           }
//         }
//       } catch (error) {
//         toast.error('Error verifying payment');
//         navigate('/');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     verifyPayment();
//   }, [location, navigate]);

//   const copyCode = () => {
//     const code = accessCode;
//     const btn = document.getElementById('copyBtn');
    
//     navigator.clipboard.writeText(code).then(() => {
//       setCopied(true);
//       if (btn) {
//         btn.textContent = 'Copied';
//         btn.classList.add('copied');
//       }
//       setTimeout(() => {
//         setCopied(false);
//         if (btn) {
//           btn.textContent = 'Copy';
//           btn.classList.remove('copied');
//         }
//       }, 2200);
//     }).catch(() => {
//       // Fallback
//       const sel = window.getSelection();
//       const range = document.createRange();
//       const codeEl = document.getElementById('accessCode');
//       if (codeEl) {
//         range.selectNodeContents(codeEl);
//         sel.removeAllRanges();
//         sel.addRange(range);
//         document.execCommand('copy');
//         sel.removeAllRanges();
//         setCopied(true);
//         if (btn) {
//           btn.textContent = 'Copied';
//           btn.classList.add('copied');
//         }
//         setTimeout(() => {
//           setCopied(false);
//           if (btn) {
//             btn.textContent = 'Copy';
//             btn.classList.remove('copied');
//           }
//         }, 2200);
//       }
//     });
//   };

//   const handleStartReading = () => {
//     if (!accessCode) {
//       toast.error('Access code not available');
//       return;
//     }
    
//     localStorage.setItem('ebook_access_suicide-note-2026', accessCode);
//     localStorage.setItem('last_ebook_accessed', 'suicide-note-2026');
//     localStorage.setItem('last_access_time', new Date().toISOString());
    
//     navigate(`/read/suicide-note-2026?code=${accessCode}`);
//   };

//   const handleBackToHome = () => {
//     if (onBackToHome) {
//       onBackToHome();
//     } else {
//       navigate('/');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Verifying your payment...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.page}>
//       {/* Check */}
//       <div className={styles.checkWrap}>
//         <div className={styles.checkRing}>
//           <svg viewBox="0 0 24 24" aria-hidden="true">
//             <polyline points="4 13 9 18 20 7" />
//           </svg>
//         </div>
//       </div>

//       {/* Heading */}
//       <span className={styles.eyebrow}>Payment confirmed</span>
//       <h1 className={styles.headline}>
//         The book<br /><em>is yours.</em>
//       </h1>
//       <p className={styles.subhead}>
//         You just bought something that was written in the dark. Now you get to read it.
//       </p>

//       <div className={styles.rule}></div>

//       {/* Access Code */}
//       <div className={styles.codeSection}>
//         <span className={styles.codeLabel}>Your access code</span>
//         <div className={styles.codeBox}>
//           <span className={styles.codeValue} id="accessCode">
//             {accessCode}
//           </span>
//           <button className={styles.copyBtn} id="copyBtn" onClick={copyCode}>
//             Copy
//           </button>
//         </div>
//         <p className={styles.codeHint}>Save this. You'll need it to access the book.</p>
//       </div>

//       {/* CTA */}
//       <button 
//         className={styles.btnPrimary}
//         onClick={handleStartReading}
//       >
//         Start Reading Now
//       </button>

//       {/* Divider */}
//       <div className={styles.dividerText}>
//         <span>Need help or just want to connect</span>
//       </div>

//       {/* Contact Row */}
//       <div className={styles.contactRow}>
//         {/* X / Twitter */}
//         <a 
//           className={styles.contactLink}
//           href="https://x.com/loba_yusuf"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Follow on X"
//         >
//           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//           </svg>
//           @loba_yusuf
//         </a>

//         {/* WhatsApp */}
//         <a 
//           className={styles.contactLink}
//           href="https://wa.me/2348131699259"
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label="Message on WhatsApp"
//         >
//           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//           </svg>
//           WhatsApp
//         </a>
//       </div>

//       {/* Footer note */}
//       <p className={styles.footerNote}>
//         Written by <strong>Loba Yusuf</strong>.<br />
//         Thank you for reading something that wasn't easy to write.
//       </p>
//     </div>
//   );
// };

// export default ThankYouPage;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PaymentService from '../../services/PaymentService';
import styles from './ThankYouPage.module.css';

const ThankYouPage = ({ onBackToHome }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [purchase, setPurchase] = useState(null);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifySelarPayment = async () => {
      try {
        setIsLoading(true);
        
        const urlParams = new URLSearchParams(location.search);
        
        // Get transaction data from URL
        const transactionId = urlParams.get('transaction_id') || 
                             urlParams.get('reference') || 
                             urlParams.get('trxref');
        
        const email = urlParams.get('email') || '';
        const name = urlParams.get('name') || '';
        const verified = urlParams.get('verified');
        
        console.log('📋 URL params:', { transactionId, email, name, verified });
        
        // Check for pending purchase in cookie
        const pendingCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('pending_purchase='));
        
        let pendingData = null;
        if (pendingCookie) {
          try {
            const cookieValue = pendingCookie.split('=')[1];
            pendingData = JSON.parse(decodeURIComponent(cookieValue));
            console.log('📦 Pending purchase from cookie:', pendingData);
          } catch (e) {
            console.error('Failed to parse pending cookie:', e);
          }
        }
        
        if (transactionId) {
          // Verify with backend
          const result = await PaymentService.verifySelarPayment(
            transactionId,
            email || pendingData?.email || '',
            name || pendingData?.name || ''
          );
          
          if (result.success) {
            setAccessCode(result.accessCode);
            setPurchase(result.purchase);
            setUser(result.user);
            
            toast.success('🎉 Payment confirmed! Your access code is ready.');
            
            // Clear pending cookie
            document.cookie = 'pending_purchase=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            toast.error(result.error || 'Payment verification failed');
          }
        } else {
          // Check for existing purchase in localStorage
          const savedPurchase = localStorage.getItem('recent_purchase');
          if (savedPurchase) {
            try {
              const parsed = JSON.parse(savedPurchase);
              setPurchase(parsed.purchase);
              setAccessCode(parsed.accessCode);
              toast.success('Welcome back! Your access code is ready.');
            } catch (e) {
              console.error('Failed to parse saved purchase:', e);
              toast.error('No valid purchase found');
              navigate('/');
            }
          } else {
            toast.error('No purchase found');
            navigate('/');
          }
        }
        
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Error verifying payment');
      } finally {
        setIsLoading(false);
      }
    };
    
    verifySelarPayment();
  }, [location, navigate]);

  const copyToClipboard = (text) => {
    if (!text) {
      toast.error('Nothing to copy');
      return;
    }
    
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard');
      });
  };

  const handleStartReading = () => {
    if (!accessCode) {
      toast.error('Access code not available');
      return;
    }
    
    localStorage.setItem('ebook_access_suicide-note-2026', accessCode);
    localStorage.setItem('last_ebook_accessed', 'suicide-note-2026');
    localStorage.setItem('last_access_time', new Date().toISOString());
    
    navigate(`/read/suicide-note-2026?code=${accessCode}`);
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Check */}
      <div className={styles.checkWrap}>
        <div className={styles.checkRing}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="4 13 9 18 20 7" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <span className={styles.eyebrow}>Payment confirmed</span>
      <h1 className={styles.headline}>
        The book<br /><em>is yours.</em>
      </h1>
      <p className={styles.subhead}>
        You just bought something that was written in the dark. Now you get to read it.
      </p>

      <div className={styles.rule}></div>

      {/* Access Code */}
      <div className={styles.codeSection}>
        <span className={styles.codeLabel}>Your access code</span>
        <div className={styles.codeBox}>
          <span className={styles.codeValue} id="accessCode">
            {accessCode || 'Loading...'}
          </span>
          <button 
            className={styles.copyBtn} 
            id="copyBtn" 
            onClick={() => copyToClipboard(accessCode)}
            disabled={!accessCode}
          >
            Copy
          </button>
        </div>
        <p className={styles.codeHint}>Save this. You'll need it to access the book.</p>
      </div>

      {/* CTA */}
      <button 
        className={styles.btnPrimary}
        onClick={handleStartReading}
        disabled={!accessCode}
      >
        Start Reading Now
      </button>

      {/* Divider */}
      <div className={styles.dividerText}>
        <span>Need help or just want to connect</span>
      </div>

      {/* Contact Row */}
      <div className={styles.contactRow}>
        <a 
          className={styles.contactLink}
          href="https://x.com/loba_yusuf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on X"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          @loba_yusuf
        </a>

        <a 
          className={styles.contactLink}
          href="https://wa.me/2348131699259"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on WhatsApp"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      {/* Footer note */}
      <p className={styles.footerNote}>
        Written by <strong>Loba Yusuf</strong>.<br />
        Thank you for reading something that wasn't easy to write.
      </p>
    </div>
  );
};

export default ThankYouPage;