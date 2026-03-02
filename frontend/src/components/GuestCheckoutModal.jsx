import React, { useState, useEffect } from 'react';
import { Icon } from './shared/Icons';
import styles from './GuestCheckoutModal.module.css';
import PaymentService from '../services/PaymentService';
import toast from 'react-hot-toast';

const GuestCheckoutModal = ({
  isOpen,
  onClose,
  onSuccess,
  ebookId,
  ebookPrice,
  ebookTitle = 'Suicide Note',
  affiliateCode: propAffiliateCode,
  campaignName: propCampaignName,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [isLoading, setIsLoading] = useState(false);
  const [affiliateCode, setAffiliateCode] = useState(propAffiliateCode);
  const [campaignName, setCampaignName] = useState(propCampaignName);
  const [currencyOptions, setCurrencyOptions] = useState({
    NGN: {
      symbol: '₦',
      code: 'NGN',
      amount: 2500,
      displayAmount: '2,500',
      paymentMethod: 'paystack',
      icon: '🇳🇬',
      description: 'Pay with Naira (Local cards, Bank Transfer, USSD)'
    },
    USD: {
      symbol: '$',
      code: 'USD',
      amount: 500,
      displayAmount: '5.00',
      paymentMethod: 'paystack',
      icon: '🌍',
      description: 'Pay with Dollars (International cards)'
    }
  });

  // Get affiliate code from cookie on mount if not provided in props
  useEffect(() => {
    const loadAffiliateData = async () => {
      // If affiliate code not provided in props, try to get from cookie
      if (!propAffiliateCode) {
        const cookieAffiliate = PaymentService.getAffiliateCodeFromCookie?.();
        if (cookieAffiliate) {
          setAffiliateCode(cookieAffiliate);
          console.log('🎯 Found affiliate code in cookie:', cookieAffiliate);
        }
      }
      
      // If campaign name not provided in props, try to get from cookie
      if (!propCampaignName) {
        const cookieCampaign = PaymentService.getCampaignFromCookie?.();
        if (cookieCampaign) {
          setCampaignName(cookieCampaign);
          console.log('📊 Found campaign in cookie:', cookieCampaign);
        }
      }
    };

    if (isOpen) {
      loadAffiliateData();
    }
  }, [isOpen, propAffiliateCode, propCampaignName]);

  // Fetch currency options on mount
  useEffect(() => {
    const fetchCurrencyOptions = async () => {
      const result = await PaymentService.getCurrencyOptions();
      if (result.success) {
        setCurrencyOptions(result.data);
      }
    };
    
    if (isOpen) {
      fetchCurrencyOptions();
    }
  }, [isOpen]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Add this useEffect to check what's in the cookie when modal opens
useEffect(() => {
  if (isOpen) {
    const cookieRef = document.cookie
      .split('; ')
      .find(row => row.startsWith('affiliate_ref='));
    
    console.log('🍪 Raw cookies:', document.cookie);
    console.log('🍪 Affiliate cookie found:', cookieRef);
    
    const cookieAffiliate = PaymentService.getAffiliateCodeFromCookie?.();
    console.log('🎯 Affiliate code from cookie service:', cookieAffiliate);
    console.log('🎯 Current affiliateCode state:', affiliateCode);
  }
}, [isOpen, affiliateCode]);

  const handleSubmit = async () => {
    console.log('🔴 AMOUNT BEING SENT:', {
      selectedCurrency: currency,
      selectedOption: currencyOptions[currency],
      amount: currencyOptions[currency].amount,
      expectedDisplay: currency === 'NGN' ? '₦2,500' : '$5.00'
    });
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    console.log('📦 GuestCheckoutModal props:', {
      ebookId,
      ebookPrice,
      ebookTitle,
      affiliateCode,
      campaignName,
      currency
    });

    setIsLoading(true);

    try {
      const selectedOption = currencyOptions[currency];
      
      const paymentData = {
        ebookId: String(ebookId),
        email: email.trim(),
        name: name.trim() || email.split('@')[0],
        amount: selectedOption.amount,
        currency: currency,
      };

      // ✅ CRITICAL: Add affiliate code to payment data if available
      if (affiliateCode && affiliateCode.trim() !== '') {
        paymentData.affiliateCode = String(affiliateCode).trim();
        console.log('🎯 Adding affiliate code to payment:', affiliateCode);
      } else {
        console.log('ℹ️ No affiliate code found for this payment');
      }
      
      // Add campaign name if available
      paymentData.campaignName = campaignName?.trim() || 'direct-purchase';

      console.log('📤 Sending payment data with affiliate:', {
        ...paymentData,
        hasAffiliate: !!paymentData.affiliateCode
      });

      const result = await PaymentService.initializePayment(paymentData);

      console.log('✅ Payment initialization result:', result);

      if (result?.success) {
        const authUrl = result.data?.authorizationUrl || result.data?.authorization_url;
        
        if (authUrl) {
          console.log(`🔗 Redirecting to Paystack (${currency}) with affiliate:`, affiliateCode || 'none');
          
          // Store pending purchase with affiliate info
          const pendingPurchase = {
            reference: result.data.reference,
            ebookTitle: ebookTitle,
            amount: currency === 'USD' ? 5 : ebookPrice,
            currency: currency,
            affiliateCode: affiliateCode, // Store affiliate code with pending purchase
            timestamp: new Date().toISOString()
          };
          
          localStorage.setItem('pending_purchase', JSON.stringify(pendingPurchase));
          console.log('💾 Saved pending purchase with affiliate:', pendingPurchase);
          
          window.location.href = authUrl;
        } else {
          console.error('❌ No authorization URL in response:', result);
          toast.error('Payment initialization failed - no payment link generated');
        }
      } else {
        console.error('❌ Payment initialization failed:', result);
        toast.error(result?.error || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('❌ Payment failed:', error);
      toast.error(error?.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedOption = currencyOptions[currency];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <button onClick={onClose} className={styles.closeButton} disabled={isLoading}>
              <Icon name="X" />
            </button>
            <h2 className={styles.modalTitle}>Complete Your Purchase</h2>
          </div>

          <div className={styles.priceSection}>
            {affiliateCode && (
              <div className={styles.affiliateBadge}>
                <span className={styles.affiliateIcon}>🎯</span>
                <span className={styles.affiliateText}>Referred by affiliate</span>
              </div>
            )}
            
            <div className={styles.currencyToggle}>
              <button
                className={`${styles.currencyButton} ${currency === 'NGN' ? styles.active : ''}`}
                onClick={() => setCurrency('NGN')}
                disabled={isLoading}
              >
                <span className={styles.currencyIcon}>{currencyOptions.NGN.icon}</span>
                <span className={styles.currencyCode}>NGN</span>
                <span className={styles.currencyPrice}>{currencyOptions.NGN.symbol}{currencyOptions.NGN.displayAmount}</span>
                <span className={styles.currencyMethod}>Paystack</span>
              </button>
              <button
                className={`${styles.currencyButton} ${currency === 'USD' ? styles.active : ''}`}
                onClick={() => setCurrency('USD')}
                disabled={isLoading}
              >
                <span className={styles.currencyIcon}>{currencyOptions.USD.icon}</span>
                <span className={styles.currencyCode}>USD</span>
                <span className={styles.currencyPrice}>{currencyOptions.USD.symbol}{currencyOptions.USD.displayAmount}</span>
                <span className={styles.currencyMethod}>Paystack</span>
              </button>
            </div>
            
            <p className={styles.priceDescription}>
              {selectedOption.description}
            </p>
          </div>

          <div className={styles.stepContent}>
            <div className={styles.formGroup}>
              <label>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="you@example.com"
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label>Your Name (Optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                placeholder="Enter your name"
              />
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={isLoading || !validateEmail(email)}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Pay {selectedOption.symbol}{selectedOption.displayAmount}</span>
                  <span className={styles.arrow}>→</span>
                </>
              )}
            </button>

            {affiliateCode && (
              <div className={styles.affiliateNote}>
                <Icon name="Gift" className={styles.affiliateNoteIcon} />
                <span>
                  You were referred by an affiliate. They'll earn commission on your purchase.
                </span>
              </div>
            )}

            <div className={styles.paymentFeatures}>
              <div className={styles.featureItem}>
                <Icon name="Shield" className={styles.featureIcon} />
                <span>Secure Payment</span>
              </div>
              <div className={styles.featureItem}>
                <Icon name="Lock" className={styles.featureIcon} />
                <span>Encrypted Transaction</span>
              </div>
              <div className={styles.featureItem}>
                <Icon name="CheckCircle" className={styles.featureIcon} />
                <span>Instant Access</span>
              </div>
            </div>

            <div className={styles.paymentNote}>
              <Icon name="Info" /> Powered by Paystack - Secure payments in {currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutModal;