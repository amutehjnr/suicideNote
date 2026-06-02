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
      amount: 2000,
      displayAmount: '2,000',
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
      if (!propAffiliateCode) {
        const cookieAffiliate = PaymentService.getAffiliateCodeFromCookie?.();
        if (cookieAffiliate) {
          setAffiliateCode(cookieAffiliate);
        }
      }
      
      if (!propCampaignName) {
        const cookieCampaign = PaymentService.getCampaignFromCookie?.();
        if (cookieCampaign) {
          setCampaignName(cookieCampaign);
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

  useEffect(() => {
    if (isOpen) {
      const cookieRef = document.cookie
        .split('; ')
        .find(row => row.startsWith('affiliate_ref='));
      
      const cookieAffiliate = PaymentService.getAffiliateCodeFromCookie?.();
    }
  }, [isOpen, affiliateCode]);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

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

      if (affiliateCode && affiliateCode.trim() !== '') {
        paymentData.affiliateCode = String(affiliateCode).trim();
      }
      
      paymentData.campaignName = campaignName?.trim() || 'direct-purchase';

      const result = await PaymentService.initializePayment(paymentData);

      if (result?.success) {
        const authUrl = result.data?.authorizationUrl || result.data?.authorization_url;
        
        if (authUrl) {
          const pendingPurchase = {
            reference: result.data.reference,
            ebookTitle: ebookTitle,
            amount: currency === 'USD' ? 5 : ebookPrice,
            currency: currency,
            affiliateCode: affiliateCode,
            timestamp: new Date().toISOString()
          };
          
          localStorage.setItem('pending_purchase', JSON.stringify(pendingPurchase));
          window.location.href = authUrl;
        } else {
          toast.error('Payment initialization failed - no payment link generated');
        }
      } else {
        toast.error(result?.error || 'Payment initialization failed');
      }
    } catch (error) {
      toast.error(error?.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedOption = currencyOptions[currency];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          {/* Close Button */}
          <button onClick={onClose} className={styles.closeButton} disabled={isLoading}>
            ×
          </button>

          {/* Book Cover and Title */}
          <div className={styles.bookHeader}>
            <div className={styles.bookCoverWrapper}>
              <img 
                src="/images/suicide-note-cover.jpeg"
                alt={`${ebookTitle} cover`}
                className={styles.bookCoverImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x600?text=Suicide+Note';
                }}
              />
            </div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{ebookTitle}</h3>
              <p className={styles.bookPrice}>Full Book Access · {selectedOption.symbol}{selectedOption.displayAmount}</p>
            </div>
          </div>

          {/* Affiliate Badge */}
          {affiliateCode && (
            <div className={styles.affiliateBadge}>
              <span className={styles.affiliateIcon}>🎯</span>
              <span className={styles.affiliateText}>Referred by affiliate partner</span>
            </div>
          )}

          {/* Currency Toggle */}
          <div className={styles.currencyGroup}>
            <label className={styles.fieldLabel}>Select Payment Currency</label>
            <div className={styles.currencyToggle}>
              <button
                className={`${styles.currencyButton} ${currency === 'NGN' ? styles.active : ''}`}
                onClick={() => setCurrency('NGN')}
                disabled={isLoading}
              >
                <span className={styles.currencyIcon}>{currencyOptions.NGN.icon}</span>
                <div className={styles.currencyInfo}>
                  <span className={styles.currencyCode}>NGN</span>
                  <span className={styles.currencyPrice}>{currencyOptions.NGN.symbol}{currencyOptions.NGN.displayAmount}</span>
                </div>
              </button>
              <button
                className={`${styles.currencyButton} ${currency === 'USD' ? styles.active : ''}`}
                onClick={() => setCurrency('USD')}
                disabled={isLoading}
              >
                <span className={styles.currencyIcon}>{currencyOptions.USD.icon}</span>
                <div className={styles.currencyInfo}>
                  <span className={styles.currencyCode}>USD</span>
                  <span className={styles.currencyPrice}>{currencyOptions.USD.symbol}{currencyOptions.USD.displayAmount}</span>
                </div>
              </button>
            </div>
            <p className={styles.fieldHint}>{selectedOption.description}</p>
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>
              Email Address <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="you@example.com"
              className={styles.fieldInput}
              autoFocus
            />
          </div>

          {/* Name Field */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>
              Your Name <span className={styles.optional}>(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder="Enter your name"
              className={styles.fieldInput}
            />
          </div>

          {/* Submit Button */}
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
                <span>Pay {selectedOption.symbol}{selectedOption.displayAmount} — Unlock Book</span>
              </>
            )}
          </button>

          {/* Security Note */}
          <div className={styles.securityNote}>
            <span className={styles.securityIcon}>🔒</span>
            <span>SSL Encrypted · Secured by Paystack</span>
          </div>

          {/* Affiliate Note */}
          {affiliateCode && (
            <div className={styles.affiliateNote}>
              <span className={styles.affiliateNoteIcon}>✨</span>
              <span>
                You were referred by an affiliate partner. They'll earn commission on your purchase.
              </span>
            </div>
          )}

          {/* Mercy Note */}
          <div className={styles.mercyNote}>
            <p>
              If you truly can't afford it right now —{' '}
              <a href="https://wa.me/2348131699259" target="_blank" rel="noopener noreferrer">
                message me on WhatsApp
              </a>
              .
            </p>
            <p className={styles.mercyText}>
              This story was written for people who need it. Money was never supposed to be the barrier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutModal;