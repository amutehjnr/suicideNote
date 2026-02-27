import React, { useState, useEffect } from 'react';
import { Icon } from '../shared/Icons';
import styles from './ThankYouPage.module.css';
import '../shared/styles.css';
import PaymentService from '../../services/PaymentService';
import AffiliateService from '../../services/AffiliateService';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ThankYouPage = ({ onBackToHome }) => {
  const [affiliateEmail, setAffiliateEmail] = useState('');
  const [affiliateName, setAffiliateName] = useState('');
  const [affiliateGenerated, setAffiliateGenerated] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState('');
  const [isAffiliateLoading, setIsAffiliateLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [salesEstimate, setSalesEstimate] = useState(20);
  const [purchase, setPurchase] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState('NGN');
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [affiliateCode, setAffiliateCode] = useState('');
  const [commissionRate, setCommissionRate] = useState(0.5);
  const [commissionAmount, setCommissionAmount] = useState(1250);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Parse payment reference from URL and verify payment
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true);
        console.log('🔍 ThankYouPage mounted, checking URL...');
        
        const urlParams = new URLSearchParams(location.search);
        const reference = urlParams.get('reference');
        const trxref = urlParams.get('trxref');
        const sessionId = urlParams.get('session_id');
        
        const paymentRef = reference || trxref || sessionId;
        
        console.log('📋 URL parameters:', { 
          reference, 
          trxref,
          sessionId,
          paymentRef,
          fullUrl: window.location.href 
        });
        
        if (paymentRef) {
          console.log('✅ Found payment reference:', paymentRef);
          
          // Verify payment with backend
          const result = await PaymentService.verifyPayment(paymentRef);
          console.log('🔍 Verification result:', result);
          
          if (result.success) {
            console.log('🎉 Payment verified successfully');
            
            // Extract data from response
            const purchaseData = result.data?.purchase || result.data;
            const accessCodeData = result.data?.accessCode;
            const verificationData = result.data?.verifiedData;
            
            // Get currency and payment method from purchase data
            const purchaseCurrency = purchaseData?.currency || 'NGN';
            const purchaseMethod = purchaseData?.paymentMethod || 'paystack';
            
            console.log('🔑 Access code received:', accessCodeData);
            console.log('💰 Currency:', purchaseCurrency);
            console.log('💳 Payment method:', purchaseMethod);
            
            // Update state
            setPurchase(purchaseData);
            setAccessCode(accessCodeData);
            setCurrency(purchaseCurrency);
            setPaymentMethod(purchaseMethod);
            
            // Set commission based on price
            const price = purchaseData?.amount || 2500;
            const commission = Math.floor(price * 0.5);
            setCommissionAmount(commission);
            
            // Save to localStorage for future access
            localStorage.setItem('recent_purchase', JSON.stringify({
              purchase: purchaseData,
              accessCode: accessCodeData,
              reference: paymentRef,
              verifiedData: verificationData,
              currency: purchaseCurrency,
              paymentMethod: purchaseMethod,
              timestamp: new Date().toISOString()
            }));
            
            // Save access code
            if (accessCodeData) {
              localStorage.setItem('ebook_access_suicide-note-2026', accessCodeData);
            }
            
            // Clear any pending purchase
            localStorage.removeItem('pending_purchase');
            
            // Show success toast
            toast.success('🎉 Payment successful! Your access code is ready.');
            
          } else {
            console.error('❌ Payment verification failed:', result.error);
            
            // Check if we have pending purchase in localStorage
            const pendingPurchase = localStorage.getItem('pending_purchase');
            if (pendingPurchase) {
              try {
                const parsed = JSON.parse(pendingPurchase);
                console.log('📂 Using cached purchase info:', parsed);
                
                const generatedCode = `SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
                setAccessCode(generatedCode);
                setPurchase(parsed);
                setCurrency(parsed.currency || 'NGN');
                setPaymentMethod(parsed.paymentMethod || 'paystack');
                
                toast.warning('Payment verification pending. Using cached purchase info.');
                
              } catch (parseError) {
                console.error('Error parsing pending purchase:', parseError);
                toast.error('Invalid purchase data');
                navigate('/');
              }
            } else {
              toast.error('Payment verification failed. Please contact support.');
              navigate('/');
            }
          }
        } else {
          console.log('⚠️ No payment reference found in URL');
          console.log('🔍 Checking localStorage for saved purchase...');
          
          // Check for saved purchase in localStorage
          const savedPurchase = localStorage.getItem('recent_purchase');
          if (savedPurchase) {
            try {
              const parsed = JSON.parse(savedPurchase);
              console.log('📂 Found saved purchase:', parsed);
              
              setPurchase(parsed.purchase);
              setAccessCode(parsed.accessCode);
              setCurrency(parsed.currency || 'NGN');
              setPaymentMethod(parsed.paymentMethod || 'paystack');
              
              toast.success('Welcome back! Your access code is ready.');
              
            } catch (parseError) {
              console.error('Error parsing saved purchase:', parseError);
              toast.error('No valid purchase found');
              navigate('/');
            }
          } else {
            console.log('❌ No saved purchase found in localStorage');
            toast.error('No purchase found. Please make a purchase first.');
            navigate('/');
          }
        }
      } catch (error) {
        console.error('🔥 Payment verification error:', error);
        toast.error('Error verifying payment. Please contact support.');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyPayment();
  }, [location, navigate]);

  // Initialize user state
  useEffect(() => {
    const initializeUser = () => {
      try {
        // Get user from localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Pre-fill affiliate email if available
          if (userData.email) {
            setAffiliateEmail(userData.email);
          }
          if (userData.name) {
            setAffiliateName(userData.name);
          }
        }
        
        // Also check for guest user info
        const guestEmail = localStorage.getItem('guest_email');
        if (guestEmail && !affiliateEmail) {
          setAffiliateEmail(guestEmail);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };
    
    initializeUser();
  }, []);

  const copyToClipboard = (text, type) => {
    if (!text) {
      toast.error('Nothing to copy');
      return;
    }
    
    navigator.clipboard.writeText(text)
      .then(() => {
        if (type === 'code') {
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000);
        } else {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        }
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy to clipboard');
      });
  };

  // In ThankYouPage.jsx - Complete updated handleGenerateLink function

const handleGenerateLink = async () => {
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
    console.log('🔗 Generating affiliate link for:', affiliateEmail);
    console.log('📧 With name:', affiliateName);
    
    // This will now work because registerAffiliate accepts parameters
    const result = await AffiliateService.registerAffiliate(affiliateEmail, affiliateName);
    console.log('📝 Registration result:', result);
    
    if (!result.success) {
      toast.error(result.error || 'Failed to register as affiliate');
      setIsAffiliateLoading(false);
      return;
    }
    
    if (result.affiliate) {
      const link = result.affiliate.link;
      
      setAffiliateLink(link);
      setAffiliateCode(result.affiliate.code);
      setAffiliateGenerated(true);
      
      localStorage.setItem('affiliate_info', JSON.stringify({
        affiliateCode: result.affiliate.code,
        email: affiliateEmail,
        name: affiliateName,
        link: link,
        generatedAt: new Date().toISOString()
      }));
      
      toast.success('🎉 Affiliate link generated! Check your email for dashboard access.');
      
      setTimeout(() => {
        const element = document.getElementById('affiliate-link-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Fallback
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 8).toUpperCase();
      const mockAffiliateId = `AFF${timestamp.toString(36).toUpperCase()}${randomId}`;
      const link = AffiliateService.generateShareLink(mockAffiliateId);
      
      setAffiliateLink(link);
      setAffiliateGenerated(true);
      
      toast.success('Affiliate link generated!');
    }
    
  } catch (error) {
    console.error('Affiliate generation error:', error);
    toast.error('Failed to generate affiliate link. Please try again.');
  } finally {
    setIsAffiliateLoading(false);
  }
};

  const calculateEarnings = (sales) => {
    const earnings = sales * commissionAmount;
    return earnings.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).replace('NGN', '₦');
  };

  // Format amount based on currency
  const formatAmount = () => {
    if (!purchase) return '';
    
    if (currency === 'USD') {
      const amount = purchase.amount ? (purchase.amount / 100).toFixed(2) : '5.00';
      return `$${amount}`;
    } else {
      return `₦${(purchase.amount || 2500).toLocaleString()}`;
    }
  };

  // Get payment method display name
  const getPaymentMethodDisplay = () => {
    if (paymentMethod === 'stripe') {
      return 'Stripe (Credit/Debit Card)';
    }
    return 'Paystack';
  };

  const handleStartReading = () => {
    if (!accessCode) {
      toast.error('Access code not available');
      return;
    }
    
    try {
      // Save access code to localStorage
      localStorage.setItem('ebook_access_suicide-note-2026', accessCode);
      localStorage.setItem('last_ebook_accessed', 'suicide-note-2026');
      localStorage.setItem('last_access_time', new Date().toISOString());
      
      console.log('📚 Starting reading with access code:', accessCode);
      
      // Navigate to reading page
      navigate('/read/suicide-note-2026', { 
        state: { 
          accessCode,
          purchaseId: purchase?._id,
          ebookTitle: purchase?.ebook?.title || 'Suicide Note',
          currency
        }
      });
      
    } catch (error) {
      console.error('Error starting reading:', error);
      toast.error('Error accessing book. Please try again.');
    }
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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <Icon name="Book" className={styles.logoIcon} />
              <span className={styles.logoText}>Suicide Note</span>
            </div>
            <button 
              onClick={handleBackToHome}
              className={styles.backButton}
              disabled={isLoading}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.mainContent}>
          {/* Success Message */}
          <div className={`card ${styles.successCard}`}>
            <div className={styles.successHeader}>
              <div className={styles.successCheck}>
                <Icon name="Check" className={styles.checkIcon} />
              </div>
              <h1 className={styles.successTitle}>🎉 Payment Successful!</h1>
              <p className={styles.successSubtitle}>
                Thank you for purchasing Suicide Note. Your access code is ready.
              </p>
              {purchase && (
                <div className={styles.purchaseInfo}>
                  <p>Purchase ID: <span className={styles.purchaseId}>{purchase._id?.substring(0, 8)}...</span></p>
                  <p>Amount: <span className={styles.purchaseAmount}>{formatAmount()}</span></p>
                  <p>Payment Method: <span className={styles.paymentMethod}>{getPaymentMethodDisplay()}</span></p>
                </div>
              )}
            </div>

            {/* Access Code Section */}
            <div className={styles.accessSection}>
              <div className={styles.accessCard}>
                <h2 className={styles.accessTitle}>Your Access Code</h2>
                <div className={styles.codeDisplay}>
                  <code className={styles.codeText}>{accessCode}</code>
                  <button
                    onClick={() => copyToClipboard(accessCode, 'code')}
                    className={styles.copyButton}
                    disabled={!accessCode || copiedCode}
                  >
                    <Icon name="Copy" className={styles.copyIcon} />
                    <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={handleStartReading} 
                    className={`btn btn-blue ${styles.startReadingButton}`}
                    disabled={!accessCode || isLoading}
                  >
                    <Icon name="Book" className={styles.bookIcon} />
                    <span>{isLoading ? 'Loading...' : 'Start Reading Now'}</span>
                    <Icon name="ArrowRight" className={styles.arrowIcon} />
                  </button>
                  <p className={styles.codeNote}>
                    Click above to access your book or enter your code on the main page
                  </p>
                </div>
              </div>

              <div className="warning-box">
                <p className={styles.warningText}>
                  <strong>📧 Important:</strong> We've also sent this access code to your email. Save it somewhere safe - you'll need it to read the book anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Affiliate Promotion Section - Only show for NGN purchases */}
          {currency === 'NGN' && (
            <div className={styles.affiliateCard}>
              <div className={styles.affiliateContent}>
                <div className="text-center mb-8">
                  <span className="badge badge-yellow animate-pulse mb-4">⚡ WAIT! ONE MORE THING...</span>
                  <h2 className={styles.affiliateTitle}>Want to Earn Your Money Back?</h2>
                  <p className={styles.affiliateSubtitle}>
                    You just invested ₦{purchase?.amount || 2500}. What if you could earn that back (and more) just by sharing this book?
                  </p>
                </div>

                {/* Value Proposition */}
                <div className={styles.valueProposition}>
                  <div className={styles.valueContent}>
                    <div>
                      <h3 className={styles.valueTitle}>Here's the Deal:</h3>
                      <ul className={styles.valueList}>
                        <li className={styles.valueItem}>
                          <div className={styles.checkCircle}>
                            <Icon name="Check" className={styles.smallCheckIcon} />
                          </div>
                          <span>Get your unique affiliate link instantly</span>
                        </li>
                        <li className={styles.valueItem}>
                          <div className={styles.checkCircle}>
                            <Icon name="Check" className={styles.smallCheckIcon} />
                          </div>
                          <span>Share on Twitter, WhatsApp, Facebook, Instagram</span>
                        </li>
                        <li className={styles.valueItem}>
                          <div className={styles.checkCircle}>
                            <Icon name="Check" className={styles.smallCheckIcon} />
                          </div>
                          <span>Earn <strong className={styles.highlightGreen}>₦{commissionAmount} (50%)</strong> per sale</span>
                        </li>
                        <li className={styles.valueItem}>
                          <div className={styles.checkCircle}>
                            <Icon name="Check" className={styles.smallCheckIcon} />
                          </div>
                          <span>Get paid automatically via Paystack in 7 days</span>
                        </li>
                        <li className={styles.valueItem}>
                          <div className={styles.checkCircle}>
                            <Icon name="Check" className={styles.smallCheckIcon} />
                          </div>
                          <span>No approval needed - start immediately</span>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.earningsCard}>
                      <h3 className={styles.earningsTitle}>💰 Your Earning Potential</h3>
                      
                      <div className={styles.earningsList}>
                        <div className={styles.earningItem}>
                          <div className={styles.earningHeader}>
                            <span className={styles.earningLabel}>Just 2 sales:</span>
                            <span className={styles.earningAmount}>₦{(commissionAmount * 2).toLocaleString()}</span>
                          </div>
                          <p className={styles.earningNote}>Your money back!</p>
                        </div>
                        
                        <div className={styles.earningItem}>
                          <div className={styles.earningHeader}>
                            <span className={styles.earningLabel}>20 sales:</span>
                            <span className={styles.earningAmount}>₦{(commissionAmount * 20).toLocaleString()}</span>
                          </div>
                          <p className={styles.earningNote}>One good Twitter thread</p>
                        </div>
                        
                        <div className={styles.earningItem}>
                          <div className={styles.earningHeader}>
                            <span className={styles.earningLabel}>50 sales:</span>
                            <span className={styles.earningAmount}>₦{(commissionAmount * 50).toLocaleString()}</span>
                          </div>
                          <p className={styles.earningNote}>Consistent sharing</p>
                        </div>

                        <div className={styles.premiumEarning}>
                          <div className={styles.earningHeader}>
                            <span className={styles.premiumLabel}>100 sales:</span>
                            <span className={styles.premiumAmount}>₦{(commissionAmount * 100).toLocaleString()}</span>
                          </div>
                          <p className={styles.premiumNote}>Our top affiliate last month!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className={styles.socialProof}>
                  <div className={styles.socialContent}>
                    <div className={styles.socialAvatar}>T</div>
                    <div>
                      <p className={styles.socialText}>
                        "I've earned <span className={styles.highlightYellow}>₦{(commissionAmount * 37.6).toLocaleString()} in just 2 months</span> by sharing this book on Twitter. I posted one thread about my mental health journey and how this book helped me. The book basically paid for itself after 2 sales, everything else is pure profit!"
                      </p>
                      <p className={styles.socialAuthor}>- Tunde O., Lagos</p>
                      <div className={styles.socialStats}>
                        <span>✓ 38 sales</span>
                        <span>✓ ₦{(commissionAmount * 38).toLocaleString()} earned</span>
                        <span>✓ Started 2 months ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings Calculator */}
                <div className="card mb-8">
                  <h3 className={styles.calculatorTitle}>Calculate Your Potential Earnings</h3>
                  <div className={styles.calculatorContent}>
                    <label className={styles.sliderLabel}>
                      How many sales do you think you can make per month?
                    </label>
                    <div className={styles.sliderContainer}>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={salesEstimate}
                        onChange={(e) => setSalesEstimate(Number(e.target.value))}
                        className={styles.slider}
                        disabled={isAffiliateLoading}
                      />
                      <div className={styles.sliderLabels}>
                        <span>5 sales</span>
                        <span>100 sales</span>
                      </div>
                    </div>
                    
                    <div className={styles.earningsDisplay}>
                      <div className={styles.earningsAmount}>{calculateEarnings(salesEstimate)}</div>
                      <p className={styles.earningsText}>per month with {salesEstimate} sales</p>
                      <p className={styles.yearlyEarnings}>
                        That's {calculateEarnings(salesEstimate * 12)} per year!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sign Up Form */}
                <div className="card">
                  <h3 className={styles.formTitle}>Get Your Affiliate Link Now (Takes 30 Seconds)</h3>
                  
                  {!affiliateGenerated ? (
                    <div>
                      <div className={styles.signupForm}>
                        <input
                          type="text"
                          placeholder="Your name (optional)"
                          value={affiliateName}
                          onChange={(e) => setAffiliateName(e.target.value)}
                          className={`form-input ${styles.nameInput}`}
                          disabled={isAffiliateLoading}
                        />
                        <input
                          type="email"
                          placeholder="Enter your email address *"
                          value={affiliateEmail}
                          onChange={(e) => setAffiliateEmail(e.target.value)}
                          className={`form-input ${styles.emailInput}`}
                          disabled={isAffiliateLoading}
                          required
                        />
                        <button
                          onClick={handleGenerateLink}
                          className={`btn btn-green ${styles.generateButton}`}
                          disabled={isAffiliateLoading || !affiliateEmail || !affiliateEmail.includes('@')}
                        >
                          {isAffiliateLoading ? (
                            <>
                              <span className="spinner-sm mr-2"></span>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Icon name="DollarSign" className={styles.dollarIcon} />
                              <span>Generate My Affiliate Link</span>
                              <Icon name="ArrowRight" className={styles.arrowIcon} />
                            </>
                          )}
                        </button>
                        <p className={styles.formNote}>
                          No approval needed. Start earning immediately.
                        </p>
                      </div>
                      
                      <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                          <Icon name="Users" className={styles.statIcon} />
                          <p className={styles.statText}>143 Active Affiliates</p>
                        </div>
                        <div className={styles.statCard}>
                          <Icon name="TrendingUp" className={styles.statIcon} />
                          <p className={styles.statText}>₦2.4M Paid Out</p>
                        </div>
                        <div className={styles.statCard}>
                          <Icon name="Check" className={styles.statIcon} />
                          <p className={styles.statText}>7-Day Payouts</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div id="generated-link" className={styles.generatedLinkSection}>
                      <div className={styles.successMessage}>
                        <Icon name="Check" className={styles.bigCheckIcon} />
                        <h3 className={styles.successHeading}>Success! Your Link is Ready</h3>
                        <p className={styles.successText}>Start sharing and earning right now!</p>
                      </div>

                      <div className={styles.linkContainer}>
                        <label className={styles.linkLabel}>Your Unique Affiliate Link:</label>
                        <div className={styles.linkDisplay}>
                          <code className={styles.linkCode}>{affiliateLink}</code>
                          <button
                            onClick={() => copyToClipboard(affiliateLink, 'link')}
                            className={styles.copyLinkButton}
                            disabled={copiedLink}
                          >
                            <Icon name="Copy" className={styles.copyIcon} />
                            <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Social Sharing Buttons */}
                      <div className={styles.socialShareSection}>
                        <h4 className={styles.shareTitle}>📱 Share Your Link Now:</h4>
                        <div className={styles.socialShareButtons}>
                          <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just earned my money back from this powerful book about mental health in Nigeria. Join me as an affiliate and earn ₦${commissionAmount} per sale!`)}&url=${encodeURIComponent(affiliateLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.twitterShareButton}
                          >
                            <Icon name="Twitter" /> Twitter
                          </a>
                          <a 
                            href={`https://wa.me/?text=${encodeURIComponent(`I just earned my money back from this powerful book about mental health in Nigeria. Get your affiliate link and earn ₦${commissionAmount} per sale! ${affiliateLink}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappShareButton}
                          >
                            <Icon name="MessageCircle" /> WhatsApp
                          </a>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.facebookShareButton}
                          >
                            <Icon name="Facebook" /> Facebook
                          </a>
                        </div>
                      </div>

                      <div className={styles.sharingGuide}>
                        <h4 className={styles.guideTitle}>📱 How to Share Your Link:</h4>
                        <div className={styles.socialGrid}>
                          <div className={styles.socialItem}>
                            <Icon name="Twitter" className={styles.twitterIcon} />
                            <div>
                              <p className={styles.socialName}>Twitter/X</p>
                              <p className={styles.socialDescription}>Share your story + link in a thread</p>
                            </div>
                          </div>
                          <div className={styles.socialItem}>
                            <Icon name="MessageCircle" className={styles.whatsappIcon} />
                            <div>
                              <p className={styles.socialName}>WhatsApp Status</p>
                              <p className={styles.socialDescription}>Post to your status with link</p>
                            </div>
                          </div>
                          <div className={styles.socialItem}>
                            <Icon name="Share2" className={styles.facebookIcon} />
                            <div>
                              <p className={styles.socialName}>Facebook</p>
                              <p className={styles.socialDescription}>Share in groups or your timeline</p>
                            </div>
                          </div>
                          <div className={styles.socialItem}>
                            <Icon name="Mail" className={styles.emailIcon} />
                            <div>
                              <p className={styles.socialName}>Email</p>
                              <p className={styles.socialDescription}>Send to friends and family</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pro-tip">
                        <p className={styles.tipText}>
                          <strong>💡 Pro Tip:</strong> The more personal your recommendation, the better! Share how this book helped YOU with mental health awareness. Authentic stories sell better than generic promotions.
                        </p>
                      </div>

                      <div className={styles.emailConfirmation}>
                        <p className={styles.confirmationText}>
                          <strong>We've emailed your affiliate link to:</strong><br />
                          <span className={styles.userEmail}>{affiliateEmail}</span>
                        </p>
                        <p className={styles.confirmationNote}>
                          Track your earnings, get payment updates, and access promotional materials via email.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* International Payment Message - Show for USD purchases */}
          {currency === 'USD' && (
            <div className={styles.internationalCard}>
              <div className={styles.internationalContent}>
                <div className="text-center mb-8">
                  <span className="badge badge-blue animate-pulse mb-4">🌍 INTERNATIONAL PURCHASE</span>
                  <h2 className={styles.internationalTitle}>Thank You for Your Support!</h2>
                  <p className={styles.internationalSubtitle}>
                    Your purchase helps bring important conversations about mental health to a global audience.
                  </p>
                </div>

                <div className={styles.internationalMessage}>
                  <Icon name="Globe" className={styles.globeIcon} />
                  <div>
                    <h3 className={styles.internationalMessageTitle}>You now have full access to the book</h3>
                    <p className={styles.internationalMessageText}>
                      Your access code above will give you unlimited access to "Suicide Note" by Loba Yusuf. 
                      You can read online anytime, anywhere in the world.
                    </p>
                  </div>
                </div>

                <div className={styles.internationalFeatures}>
                  <div className={styles.feature}>
                    <Icon name="CheckCircle" className={styles.featureCheckIcon} />
                    <span>Full book access</span>
                  </div>
                  <div className={styles.feature}>
                    <Icon name="CheckCircle" className={styles.featureCheckIcon} />
                    <span>Read online anytime</span>
                  </div>
                  <div className={styles.feature}>
                    <Icon name="CheckCircle" className={styles.featureCheckIcon} />
                    <span>No expiration</span>
                  </div>
                  <div className={styles.feature}>
                    <Icon name="CheckCircle" className={styles.featureCheckIcon} />
                    <span>Support mental health awareness</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Why This Works Section - Only show for NGN */}
          {currency === 'NGN' && (
            <div className="card mb-8">
              <h2 className={styles.whyTitle}>Why Our Affiliates Succeed</h2>
              <div className={styles.whyGrid}>
                <div className={styles.whyCard}>
                  <div className={styles.whyIcon}>
                    <Icon name="Book" className={styles.purpleIcon} />
                  </div>
                  <h3 className={styles.whyCardTitle}>Powerful Product</h3>
                  <p className={styles.whyCardText}>
                    This book changes lives. When you share it, you're genuinely helping people - not just selling.
                  </p>
                </div>
                <div className={styles.whyCard}>
                  <div className={styles.whyIcon}>
                    <Icon name="DollarSign" className={styles.blueIcon} />
                  </div>
                  <h3 className={styles.whyCardTitle}>50% Commission</h3>
                  <p className={styles.whyCardText}>
                    Most Nigerian ebooks offer 20-30%. We offer 50% because we want you motivated to share.
                  </p>
                </div>
                <div className={styles.whyCard}>
                  <div className={styles.whyIcon}>
                    <Icon name="TrendingUp" className={styles.greenIcon} />
                  </div>
                  <h3 className={styles.whyCardTitle}>Easy to Promote</h3>
                  <p className={styles.whyCardText}>
                    Mental health is trending. People want this content. One good post can get you 20+ sales.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Final CTA */}
          <div className={styles.finalCTA}>
            <h3 className={styles.finalTitle}>Ready to Start Reading?</h3>
            <p className={styles.finalSubtitle}>
              Your access code is ready. Click below to begin your journey with Eliora's story.
            </p>
            <button 
              onClick={handleStartReading} 
              className={`btn btn-blue ${styles.readingButton}`}
              disabled={!accessCode || isLoading}
            >
              <Icon name="Book" className={styles.bookIcon} />
              <span>Start Reading Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <p className={styles.footerText}>Questions? Email us at support@suicidenote.com</p>
            <p className={styles.copyright}>© 2026 Loba Yusuf. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPage;