// backend/routes/emailAccess.routes.js
const express = require('express');
const router = express.Router();
const AccessCode = require('../models/AccessCode.model');
const Ebook = require('../models/Ebook.model');
const jwt = require('jsonwebtoken');

/**
 * GET /access/:slug
 * Handles email link clicks - validates code and redirects to reader
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
    
    // Validate required params
    if (!slug) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Link</title>
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
            <h1>Invalid Link</h1>
            <p>No ebook specified. Please check your email for the correct link.</p>
            <a href="/">Return to Homepage</a>
          </div>
        </body>
        </html>
      `);
    }
    
    if (!code) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Access Code Required</title>
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
            <h1>Access Code Required</h1>
            <p>No access code provided. Please check your email for the complete link.</p>
            <a href="/">Return to Homepage</a>
          </div>
        </body>
        </html>
      `);
    }
    
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
    
    // Clean the code
    const cleanCode = code.trim().toUpperCase();
    
    // Find the access code
    const accessCode = await AccessCode.findOne({ 
      code: cleanCode,
      ebook: ebook._id,
      isActive: true
    })
    .populate('user', 'email name')
    .populate('purchase', 'amount reference');
    
    // Handle invalid code
    if (!accessCode) {
      console.log('❌ Invalid access code:', { cleanCode, ebookId: ebook._id });
      
      // Check if code exists for different ebook
      const wrongEbookCode = await AccessCode.findOne({ 
        code: cleanCode,
        isActive: true 
      }).populate('ebook', 'title');
      
      if (wrongEbookCode) {
        return res.status(400).send(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Wrong Ebook</title>
            <style>
              body { font-family: -apple-system, sans-serif; background: #f5f0eb; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
              .card { background: white; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
              h1 { color: #8b1a1a; margin-bottom: 16px; }
              .code-box { background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0; font-family: monospace; }
              .wrong { color: #8b1a1a; font-weight: 600; }
              .correct { color: #059669; font-weight: 600; }
              a { color: #059669; text-decoration: none; font-weight: 500; display: inline-block; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Wrong Ebook</h1>
              <p>This access code is for a different book:</p>
              <div class="code-box">
                <p><span class="wrong">Your code is for:</span> "${wrongEbookCode.ebook?.title || 'Unknown'}"</p>
                <p><span class="correct">You're trying to access:</span> "${ebook.title}"</p>
              </div>
              <p>Please check your email for the correct link.</p>
              <a href="/">Return to Homepage</a>
            </div>
          </body>
          </html>
        `);
      }
      
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Access Code</title>
          <style>
            body { font-family: -apple-system, sans-serif; background: #f5f0eb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; }
            .card { background: white; padding: 40px; border-radius: 20px; max-width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            h1 { color: #8b1a1a; margin-bottom: 16px; }
            .code { background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace; margin: 20px 0; }
            a { color: #059669; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Invalid Access Code</h1>
            <p>The access code you entered is invalid.</p>
            <div class="code">Code: ${cleanCode}</div>
            <p>If you believe this is an error, please contact support.</p>
            <a href="/">Return to Homepage</a>
          </div>
        </body>
        </html>
      `);
    }
    
    // Check if expired
    const now = new Date();
    if (now > accessCode.expiresAt) {
      console.log('❌ Expired access code:', { cleanCode, expiresAt: accessCode.expiresAt });
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Access Code Expired</title>
          <style>
            body { font-family: -apple-system, sans-serif; background: #f5f0eb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; }
            .card { background: white; padding: 40px; border-radius: 20px; max-width: 400px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            h1 { color: #8b1a1a; margin-bottom: 16px; }
            .date { background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 20px 0; }
            a { color: #059669; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Access Code Expired</h1>
            <p>This access code expired on:</p>
            <div class="date">${accessCode.expiresAt.toLocaleDateString()}</div>
            <p>Please contact support if you need a new code.</p>
            <a href="/">Return to Homepage</a>
          </div>
        </body>
        </html>
      `);
    }
    
    // ✅ Code is valid - increment access count
    accessCode.accessCount += 1;
    accessCode.lastAccessedAt = now;
    accessCode.metadata = {
      ...accessCode.metadata,
      lastAccess: {
        device: req.headers['user-agent'],
        ipAddress: req.ip,
        timestamp: now
      }
    };
    await accessCode.save();
    
    console.log('✅ Access granted:', {
      code: cleanCode,
      ebook: ebook.title,
      user: accessCode.user?.email || 'guest',
      accessCount: accessCode.accessCount
    });
    
    // Set auth cookie if user exists
    if (accessCode.user) {
      const token = jwt.sign(
        { 
          id: accessCode.user._id, 
          email: accessCode.user.email,
          name: accessCode.user.name 
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
    }
    
    // Get frontend URL
    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'https://suicidenote.onrender.com';
    const readerUrl = `${frontendUrl}/read/${ebook.slug || ebook._id}`;
    
    // Send success page that redirects to reader (like Thank You page)
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Access Granted - Redirecting to Reader</title>
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
          .card {
            max-width: 500px;
            width: 100%;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .success-header {
            background: linear-gradient(135deg, #059669, #047857);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .success-check {
            width: 64px;
            height: 64px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 32px;
          }
          .success-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .success-subtitle {
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .code-section {
            background: #f8f4f0;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid #e0dbd4;
          }
          .code-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .code-display {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .code-text {
            flex: 1;
            background: white;
            padding: 16px;
            border-radius: 12px;
            font-family: 'Courier New', monospace;
            font-size: 20px;
            font-weight: 600;
            color: #8b1a1a;
            text-align: center;
            border: 1px solid #e0dbd4;
          }
          .copy-button {
            background: white;
            border: 1px solid #e0dbd4;
            border-radius: 12px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          }
          .copy-button:hover {
            background: #f8f4f0;
          }
          .start-reading-btn {
            width: 100%;
            background: #2563eb;
            color: white;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            cursor: pointer;
            transition: background 0.2s;
            margin-bottom: 12px;
            text-decoration: none;
          }
          .start-reading-btn:hover {
            background: #1d4ed8;
          }
          .btn-icon {
            width: 20px;
            height: 20px;
          }
          .note {
            color: #666;
            font-size: 14px;
            text-align: center;
          }
          .user-info {
            background: #f0f7ff;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 14px;
            color: #1a1a1a;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="success-header">
            <div class="success-check">✓</div>
            <div class="success-title">Access Granted! 🎉</div>
            <div class="success-subtitle">${ebook.title}</div>
          </div>
          
          <div class="content">
            ${accessCode.user ? `
              <div class="user-info">
                Welcome back, ${accessCode.user.name || accessCode.user.email}!
              </div>
            ` : ''}
            
            <div class="code-section">
              <div class="code-label">Your Access Code</div>
              <div class="code-display">
                <div class="code-text">${cleanCode}</div>
                <button class="copy-button" onclick="copyCode()">
                  <span>📋</span>
                  <span id="copyText">Copy</span>
                </button>
              </div>
            </div>
            
            <a href="${readerUrl}?code=${cleanCode}&validated=true&from=email" class="start-reading-btn">
              <span>📖</span>
              <span>Start Reading Now</span>
              <span>→</span>
            </a>
            
            <p class="note">
              Click above to access your book. We've also saved your code for future visits.
            </p>
          </div>
        </div>
        
        <script>
          function copyCode() {
            const code = ${JSON.stringify(cleanCode)};
            navigator.clipboard.writeText(code).then(() => {
              const copyText = document.getElementById('copyText');
              copyText.textContent = 'Copied!';
              setTimeout(() => {
                copyText.textContent = 'Copy';
              }, 2000);
            });
          }
          
          // Auto-redirect after 3 seconds
          setTimeout(() => {
            window.location.href = '${readerUrl}?code=${cleanCode}&validated=true&from=email';
          }, 3000);
          
          // Store in localStorage
          try {
            const accessCode = ${JSON.stringify(cleanCode)};
            const ebookSlug = ${JSON.stringify(ebook.slug)};
            const ebookId = ${JSON.stringify(ebook._id.toString())};
            
            localStorage.setItem('ebook_access_' + ebookSlug, accessCode);
            localStorage.setItem('ebook_access_' + ebookId, accessCode);
            localStorage.setItem('last_access_code', accessCode);
            localStorage.setItem('last_ebook_slug', ebookSlug);
            localStorage.setItem('last_validated_at', new Date().toISOString());
            
            ${accessCode.user ? `
              localStorage.setItem('user_email', ${JSON.stringify(accessCode.user.email)});
              localStorage.setItem('user_name', ${JSON.stringify(accessCode.user.name || '')});
            ` : ''}
            
            console.log('✅ Access code stored in localStorage');
          } catch (e) {
            console.error('Failed to store in localStorage:', e);
          }
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
          <p>We encountered an error while validating your access code.</p>
          <p style="color: #666; margin-top: 20px;">Please try again or contact support.</p>
          <a href="/">Return to Homepage</a>
        </div>
      </body>
      </html>
    `);
  }
});

module.exports = router;