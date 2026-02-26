import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EbookLandingPage from './components/EbookLandingPage';
import ThankYouPage from './components/ThankYouPage';
import ReaderPage from './components/ReaderPage';
import AffiliateDashboard from './components/AffiliateDashboard';

function App() {
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handlePurchase = () => {
    setPurchaseComplete(true);
  };

  const handleBackToHome = () => {
    setPurchaseComplete(false);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <EbookLandingPage 
            onPurchase={handlePurchase} 
            purchaseComplete={purchaseComplete}
          />
        } 
      />
      <Route 
        path="/thank-you" 
        element={
          <ThankYouPage 
            onBackToHome={handleBackToHome} 
            purchaseComplete={purchaseComplete}
          />
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/read/:ebookId" element={<ReaderPage />} />
      <Route path="/affiliate/token/:token" element={<AffiliateTokenRedirect />} />
      <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
    </Routes>
  );
}

export default App;