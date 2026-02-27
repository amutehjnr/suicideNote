// src/pages/AffiliateTokenRedirect.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AffiliateTokenRedirect = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAndRedirect = async () => {
      // Log the token to see what's coming from the URL
      console.log('🔍 Token from URL params:', token);
      console.log('🔍 Full URL:', window.location.href);
      
      // Check if token exists and is not undefined
      if (!token || token === 'undefined' || token.trim() === '') {
        console.error('❌ No valid token provided in URL');
        toast.error('Invalid dashboard link: No token provided');
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return;
      }

      try {
        console.log('🔍 Validating token:', token);
        
        const response = await axios.get(`/api/v1/affiliate/token/validate/${token}`);
        console.log('✅ Validation response:', response.data);
        
        if (response.data.success) {
          // Store token in localStorage for the dashboard to use
          localStorage.setItem('affiliate_token', token);
          // Token is valid, redirect to dashboard with token
          navigate(`/affiliate/dashboard?token=${token}`);
        } else {
          toast.error('Invalid or expired dashboard link');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        console.error('❌ Token validation error:', error);
        console.error('Error response:', error.response?.data);
        toast.error(error.response?.data?.error || 'Invalid or expired dashboard link');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };

    validateAndRedirect();
  }, [token, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #e0e0e0',
        borderTop: '4px solid #059669',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      <p style={{ color: '#333', fontSize: '16px' }}>
        {token && token !== 'undefined' ? 'Validating your dashboard access...' : 'Invalid dashboard link...'}
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AffiliateTokenRedirect;