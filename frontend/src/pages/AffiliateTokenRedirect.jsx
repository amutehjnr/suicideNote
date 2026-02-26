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
      try {
        const response = await axios.get(`/api/v1/affiliate/token/validate/${token}`);
        
        if (response.data.success) {
          // Token is valid, redirect to dashboard with token
          navigate(`/affiliate/dashboard?token=${token}`);
        } else {
          toast.error('Invalid or expired dashboard link');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        toast.error('Invalid or expired dashboard link');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };

    if (token) {
      validateAndRedirect();
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #059669',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      <p>Validating your dashboard access...</p>
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