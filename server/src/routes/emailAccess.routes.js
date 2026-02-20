// backend/routes/emailAccess.routes.js
const express = require('express');
const router = express.Router();
const AccessCode = require('../models/AccessCode.model');
const Ebook = require('../models/Ebook.model');
const jwt = require('jsonwebtoken');

/**
 * GET /access/:slug
 * Handles email link clicks - shows form to enter access code
 * Example: /access/suicide-note-2026?code=SN-ABC123XYZ
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { code } = req.query;
    
    console.log('📧 [EMAIL ACCESS] Received:', { 
      slug, 
      code: code?.substring(0, 10) + '...',
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });
    
    // Find the ebook by slug
    const ebook = await Ebook.findOne({ slug }).select('_id title slug');
    
    if (!ebook) {
      console.log('❌ Ebook not found for slug:', slug);
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Ebook Not Found</title>
          <style>
            body { font-family: -apple-system, sans-serif; background: #f5f0eb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; }
            .card { background: white; padding: 40px; border-radius: 20px; max-width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            h1 { color: #8b1a1a; margin-bottom: 16px; }
            p { color: #666; margin-bottom: 24px; }
            a { color: #059669; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Ebook Not Found</h1>
            <p>The ebook you're looking for doesn't exist.</p>
            <a href="/">Return to Homepage</a>
          </div>
        </body>
        </html>
      `);
    }
    
    // Use relative URLs - they'll use the same origin
    const validateUrl = '/api/access/validate'; // Your existing validation endpoint
    
    // Pre-fill the code if provided in URL
    const prefillCode = code ? code.trim().toUpperCase() : '';
    
    // Send the access code entry form
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enter Access Code - ${ebook.title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f0eb;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 480px;
            width: 100%;
          }
          .card {
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #1a2332, #243044);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .book-icon {
            width: 64px;
            height: 64px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 32px;
          }
          .header-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header-subtitle {
            font-size: 16px;
            opacity: 0.8;
            margin-bottom: 4px;
          }
          .header-author {
            font-size: 14px;
            opacity: 0.6;
          }
          .content {
            padding: 30px;
          }
          .info-box {
            background: #f0f7ff;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
            border-left: 4px solid #2563eb;
          }
          .info-title {
            font-size: 14px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 8px;
          }
          .info-text {
            font-size: 14px;
            color: #4a4a4a;
            line-height: 1.5;
          }
          .form-group {
            margin-bottom: 24px;
          }
          .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #1a1a1a;
            margin-bottom: 8px;
          }
          .code-input {
            width: 100%;
            padding: 16px;
            font-size: 24px;
            font-family: 'Courier New', monospace;
            font-weight: 600;
            text-align: center;
            letter-spacing: 4px;
            border: 2px solid #e0dbd4;
            border-radius: 16px;
            background: white;
            transition: border-color 0.2s;
            text-transform: uppercase;
          }
          .code-input:focus {
            outline: none;
            border-color: #8b1a1a;
          }
          .code-input::placeholder {
            font-size: 16px;
            letter-spacing: normal;
            color: #aaa;
            text-transform: none;
          }
          .submit-btn {
            width: 100%;
            background: #8b1a1a;
            color: white;
            border: none;
            padding: 18px;
            border-radius: 16px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .submit-btn:hover {
            background: #6b1313;
          }
          .submit-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
          .footer {
            margin-top: 24px;
            text-align: center;
          }
          .footer-text {
            font-size: 14px;
            color: #666;
          }
          .footer-link {
            color: #8b1a1a;
            text-decoration: none;
            font-weight: 500;
          }
          .footer-link:hover {
            text-decoration: underline;
          }
          .error-message {
            background: #fee2e2;
            border: 1px solid #ef4444;
            border-radius: 12px;
            padding: 12px 16px;
            margin-bottom: 20px;
            color: #b91c1c;
            font-size: 14px;
            display: none;
          }
          .error-message.show {
            display: block;
          }
          .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <div class="book-icon">📖</div>
              <div class="header-title">${ebook.title}</div>
              <div class="header-subtitle">by Loba Yusuf</div>
              <div class="header-author">Access Required</div>
            </div>
            
            <div class="content">
              <div class="info-box">
                <div class="info-title">🔑 Enter Your Access Code</div>
                <div class="info-text">
                  Please enter your access code to read "${ebook.title}" by Loba Yusuf.
                  ${prefillCode ? 'We\'ve pre-filled the code from your email for you.' : ''}
                </div>
              </div>
              
              <div id="errorMessage" class="error-message"></div>
              
              <form id="accessForm" onsubmit="handleSubmit(event)">
                <div class="form-group">
                  <label class="form-label">Access Code</label>
                  <input 
                    type="text" 
                    id="accessCode" 
                    class="code-input" 
                    placeholder="SN-XXXX-XXXX" 
                    value="${prefillCode}"
                    autocomplete="off"
                    spellcheck="false"
                  >
                </div>
                
                <button type="submit" id="submitBtn" class="submit-btn">
                  <span>🔓</span>
                  <span id="btnText">Access Book</span>
                  <span id="btnSpinner" style="display: none;" class="loading-spinner"></span>
                </button>
              </form>
              
              <div class="footer">
                <p class="footer-text">
                  Didn't receive a code? <a href="/" class="footer-link">Contact Support</a>
                </p>
                <p class="footer-text" style="margin-top: 8px;">
                  <a href="/" class="footer-link">← Back to Homepage</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <script>
          const validateUrl = '/api/access/validate';
          const ebookSlug = ${JSON.stringify(ebook.slug)};
          const ebookId = ${JSON.stringify(ebook._id.toString())};
          const readerUrl = '/read/' + ebookSlug;
          
          // Auto-submit if code is pre-filled
          window.addEventListener('DOMContentLoaded', () => {
            const codeInput = document.getElementById('accessCode');
            if (codeInput.value) {
              setTimeout(() => {
                document.getElementById('accessForm').dispatchEvent(new Event('submit'));
              }, 500);
            }
          });
          
          async function handleSubmit(event) {
            event.preventDefault();
            
            const codeInput = document.getElementById('accessCode');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            const errorMessage = document.getElementById('errorMessage');
            
            const code = codeInput.value.trim();
            
            if (!code) {
              showError('Please enter your access code');
              return;
            }
            
            // Disable form
            codeInput.disabled = true;
            submitBtn.disabled = true;
            btnText.textContent = 'Validating...';
            btnSpinner.style.display = 'inline-block';
            errorMessage.classList.remove('show');
            
            try {
              console.log('🔑 Validating code:', code);
              
              const response = await fetch(validateUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  code: code,
                  ebookId: ebookId
                })
              });
              
              const result = await response.json();
              console.log('✅ Validation result:', result);
              
              if (result.success) {
                // Store in localStorage
                try {
                  localStorage.setItem('ebook_access_' + ebookSlug, code.toUpperCase());
                  localStorage.setItem('ebook_access_' + ebookId, code.toUpperCase());
                  localStorage.setItem('last_access_code', code.toUpperCase());
                  localStorage.setItem('last_ebook_slug', ebookSlug);
                  localStorage.setItem('last_validated_at', new Date().toISOString());
                  
                  if (result.data.user) {
                    localStorage.setItem('user_email', result.data.user.email);
                    localStorage.setItem('user_name', result.data.user.name || '');
                  }
                  
                  console.log('✅ Access code stored in localStorage');
                } catch (e) {
                  console.error('Failed to store in localStorage:', e);
                }
                
                // Show success message
                btnText.textContent = 'Access Granted! Redirecting...';
                
                // Redirect to reader
                setTimeout(() => {
                  window.location.href = readerUrl + '?code=' + code.toUpperCase() + '&validated=true&from=email';
                }, 1000);
                
              } else {
                // Show error
                showError(result.error || 'Invalid access code');
                
                // Re-enable form
                codeInput.disabled = false;
                submitBtn.disabled = false;
                btnText.textContent = 'Access Book';
                btnSpinner.style.display = 'none';
                codeInput.focus();
              }
              
            } catch (error) {
              console.error('🔥 Validation error:', error);
              showError('Failed to validate code. Please try again.');
              
              // Re-enable form
              codeInput.disabled = false;
              submitBtn.disabled = false;
              btnText.textContent = 'Access Book';
              btnSpinner.style.display = 'none';
            }
          }
          
          function showError(message) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              errorMessage.classList.remove('show');
            }, 5000);
          }
          
          // Auto-uppercase as user types
          document.getElementById('accessCode').addEventListener('input', function(e) {
            this.value = this.value.toUpperCase();
          });
        </script>
      </body>
      </html>
    `);
    
  } catch (error) {
    console.error('🔥 Email access error:', error);
    
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
        <style>
          body { font-family: -apple-system, sans-serif; background: #f5f0eb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; }
          .card { background: white; padding: 40px; border-radius: 20px; max-width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          h1 { color: #8b1a1a; margin-bottom: 16px; }
          p { color: #666; margin-bottom: 24px; }
          a { color: #059669; text-decoration: none; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Something Went Wrong</h1>
          <p>We encountered an error while loading the access page.</p>
          <p style="color: #666; margin-top: 20px;">Please try again or contact support.</p>
          <a href="/">Return to Homepage</a>
        </div>
      </body>
      </html>
    `);
  }
});

module.exports = router;