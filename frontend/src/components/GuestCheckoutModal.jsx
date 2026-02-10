import React, { useState } from 'react';
import { Icon } from './shared/Icons';
import styles from './GuestCheckoutModal.module.css';
import PaymentService from '../services/PaymentService'; // Import the object
import toast from 'react-hot-toast';

const GuestCheckoutModal = ({
  isOpen,
  onClose,
  onSuccess,
  ebookId,
  ebookPrice,
  ebookTitle = 'Suicide Note',
  affiliateCode, // optional
  campaignName,  // optional
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
  if (!validateEmail(email)) {
    toast.error('Please enter a valid email');
    return;
  }

  console.log('📦 GuestCheckoutModal props:', {
    ebookId,
    ebookPrice,
    ebookTitle,
    affiliateCode,
    campaignName
  });

  setIsLoading(true);

  try {
    // Build payment data - CORRECT format
    const paymentData = {
      ebookId: String(ebookId), // Ensure it's a string
      email: email.trim(),
      name: name.trim() || email.split('@')[0],
      amount: Number(ebookPrice), // Must be a number
    };

    // Only add optional fields if they exist AND are valid
    if (affiliateCode && affiliateCode.trim() !== '') {
      paymentData.affiliateCode = String(affiliateCode).trim();
    }
    
    // ⚠️ FIX: Ensure campaignName is always a string (not null/undefined)
    if (campaignName && campaignName.trim() !== '') {
      paymentData.campaignName = String(campaignName).trim();
    } else {
      // Provide a default string value if campaignName is null/undefined/empty
      paymentData.campaignName = 'direct-purchase'; // Default value
    }

    // Add callback URL
    // paymentData.callback_url = `${window.location.origin}/payment-callback`;

    console.log('📤 Sending payment data:', paymentData);

    // ✅ Call PaymentService correctly
    const result = await PaymentService.initializePayment(paymentData);

    console.log('✅ Payment initialization result:', result);

    // ✅ Check for authorization URL
    if (result?.success) {
      const authUrl = result.data?.authorizationUrl || result.data?.authorization_url;
      
      if (authUrl) {
        console.log('🔗 Redirecting to Paystack:', authUrl);
        
        // Save purchase info temporarily for thank you page
        localStorage.setItem('pending_purchase', JSON.stringify({
          reference: result.data.reference,
          ebookTitle: ebookTitle,
          amount: ebookPrice,
          timestamp: new Date().toISOString()
        }));
        
        // Redirect to Paystack
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
            <div className={styles.priceTag}>₦{ebookPrice.toLocaleString()}</div>
            <p className={styles.priceDescription}>One-time payment for "{ebookTitle}"</p>
          </div>

          <div className={styles.stepContent}>
            <div className={styles.formGroup}>
              <label>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
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
              />
            </div>

            <button onClick={handleSubmit} disabled={isLoading || !validateEmail(email)}>
              {isLoading ? 'Processing...' : 'Proceed to Payment →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutModal;