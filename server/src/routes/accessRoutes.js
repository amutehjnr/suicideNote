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
        <head><title>Invalid Link</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #8b1a1a;">Invalid Link</h1>
          <p>No ebook specified. Please check your email for the correct link.</p>
          <a href="/" style="color: #059669;">Return to Homepage</a>
        </body>
        </html>
      `);
    }
    
    if (!code) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Access Code Required</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #8b1a1a;">Access Code Required</h1>
          <p>No access code provided. Please check your email for the complete link.</p>
          <a href="/" style="color: #059669;">Return to Homepage</a>
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
        <head><title>Ebook Not Found</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #8b1a1a;">Ebook Not Found</h1>
          <p>The ebook you're looking for doesn't exist.</p>
          <a href="/" style="color: #059669;">Return to Homepage</a>
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
          <head><title>Wrong Ebook</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8b1a1a;">Wrong Ebook</h1>
            <p>This access code is for a different book:</p>
            <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>Your code is for:</strong> "${wrongEbookCode.ebook?.title || 'Unknown'}"</p>
              <p><strong>You're trying to access:</strong> "${ebook.title}"</p>
            </div>
            <p>Please check your email for the correct link.</p>
            <a href="/" style="color: #059669;">Return to Homepage</a>
          </body>
          </html>
        `);
      }
      
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Invalid Access Code</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #8b1a1a;">Invalid Access Code</h1>
          <p>The access code you entered is invalid.</p>
          <div style="background: #f0f0f0; padding: 10px; margin: 20px 0; font-family: monospace;">
            Code: ${cleanCode}
          </div>
          <p>If you believe this is an error, please contact support.</p>
          <a href="/" style="color: #059669;">Return to Homepage</a>
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
        <head><title>Access Code Expired</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #8b1a1a;">Access Code Expired</h1>
          <p>This access code expired on: ${accessCode.expiresAt.toLocaleDateString()}</p>
          <p>Please contact support if you need a new code.</p>
          <a href="/" style="color: #059669;">Return to Homepage</a>
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
    
    // Send success page with auto-redirect
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Access Granted - Redirecting...</title>
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
            max-width: 450px;
            width: 100%;
            background: white;
            padding: 40px 30px;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid #ddd8d0;
            border-top-color: #8b1a1a;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 24px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          h1 { 
            color: #1a1a1a; 
            font-size: 24px;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .ebook-title {
            color: #8b1a1a;
            font-weight: 600;
            margin-bottom: 20px;
            font-size: 18px;
          }
          .code-box {
            background: #f8f4f0;
            padding: 16px;
            border-radius: 12px;
            margin: 24px 0;
            border: 1px dashed #8b1a1a;
          }
          .code-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }
          .code-value {
            font-family: 'Courier New', monospace;
            font-size: 24px;
            font-weight: bold;
            color: #8b1a1a;
            background: white;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #ddd8d0;
          }
          .redirect-text {
            color: #666;
            font-size: 14px;
            margin: 20px 0 10px;
          }
          .btn {
            background: #059669;
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background 0.2s;
            margin-top: 16px;
          }
          .btn:hover { background: #047857; }
          .success-icon {
            color: #059669;
            font-size: 48px;
            margin-bottom: 16px;
          }
          .user-info {
            background: #f0f7ff;
            padding: 12px;
            border-radius: 8px;
            margin: 16px 0;
            font-size: 14px;
            color: #1a1a1a;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="spinner"></div>
          <div class="success-icon">✓</div>
          <h1>Access Granted! 🎉</h1>
          <div class="ebook-title">${ebook.title}</div>
          
          ${accessCode.user ? `
            <div class="user-info">
              Welcome back, ${accessCode.user.name || accessCode.user.email}!
            </div>
          ` : ''}
          
          <div class="code-box">
            <div class="code-label">Your Access Code</div>
            <div class="code-value">${cleanCode}</div>
          </div>
          
          <p class="redirect-text">Redirecting you to the reader in <span id="countdown">3</span> seconds...</p>
          
          <a href="${readerUrl}?code=${cleanCode}&validated=true&from=email" class="btn">
            Go to Reader Now →
          </a>
        </div>
        
        <script>
          (function() {
            console.log('🎬 Email access validation successful');
            
            const accessCode = ${JSON.stringify(cleanCode)};
            const ebookSlug = ${JSON.stringify(ebook.slug)};
            const ebookId = ${JSON.stringify(ebook._id.toString())};
            const readerUrl = ${JSON.stringify(readerUrl)};
            
            // Store in localStorage for persistence
            try {
              // Store by slug (preferred)
              localStorage.setItem('ebook_access_' + ebookSlug, accessCode);
              
              // Store by ID (fallback)
              localStorage.setItem('ebook_access_' + ebookId, accessCode);
              
              // Store generic keys
              localStorage.setItem('last_access_code', accessCode);
              localStorage.setItem('last_ebook_slug', ebookSlug);
              localStorage.setItem('last_validated_at', new Date().toISOString());
              
              console.log('✅ Access code stored in localStorage');
              
              // If user exists, store user info
              ${accessCode.user ? `
                localStorage.setItem('user_email', ${JSON.stringify(accessCode.user.email)});
                localStorage.setItem('user_name', ${JSON.stringify(accessCode.user.name || '')});
              ` : ''}
              
            } catch (e) {
              console.error('Failed to store in localStorage:', e);
            }
            
            // Store in sessionStorage as backup
            try {
              sessionStorage.setItem('temp_access_code', accessCode);
              sessionStorage.setItem('temp_ebook_slug', ebookSlug);
            } catch (e) {
              console.error('Failed to store in sessionStorage:', e);
            }
            
            // Countdown timer
            let seconds = 3;
            const countdownEl = document.getElementById('countdown');
            
            const interval = setInterval(() => {
              seconds--;
              if (countdownEl) countdownEl.textContent = seconds;
              
              if (seconds <= 0) {
                clearInterval(interval);
                console.log('🚀 Redirecting to reader:', readerUrl);
                window.location.href = readerUrl + '?code=' + accessCode + '&validated=true&from=email';
              }
            }, 1000);
            
            // Also redirect after 3 seconds regardless of countdown
            setTimeout(() => {
              window.location.href = readerUrl + '?code=' + accessCode + '&validated=true&from=email';
            }, 3500);
            
          })();
        </script>
      </body>
      </html>
    `);
    
  } catch (error) {
    console.error('🔥 Email access error:', error);
    
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #8b1a1a;">Something Went Wrong</h1>
        <p>We encountered an error while validating your access code.</p>
        <p style="color: #666; margin-top: 20px;">Please try again or contact support.</p>
        <a href="/" style="display: inline-block; margin-top: 30px; color: #059669;">Return to Homepage</a>
      </body>
      </html>
    `);
  }
});

// backend/routes/accessRoutes.js
router.post('/validate', async (req, res) => {
  try {
    const { code, ebookId } = req.body;
    
    console.log('🔑 Validating access code:', { code, ebookId });
    
    if (!code || !ebookId) {
      return res.status(400).json({
        success: false,
        error: 'Access code and ebook ID are required'
      });
    }
    
    // Clean the code
    const cleanCode = code.trim().toUpperCase();
    
    // Find the access code
    const accessCode = await AccessCode.findOne({ 
      code: cleanCode,
      ebook: ebookId
    })
    .populate('ebook', 'title author coverImage')
    .populate('purchase', 'amount status reference')
    .populate('user', 'name email');
    
    if (!accessCode) {
      return res.status(404).json({
        success: false,
        error: 'Access code not found'
      });
    }
    
    // Check if code is active
    if (!accessCode.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Access code has been revoked'
      });
    }
    
    // Check if code has expired
    if (new Date() > accessCode.expiresAt) {
      return res.status(403).json({
        success: false,
        error: 'Access code has expired'
      });
    }
    
    // Increment access count
    await accessCode.incrementAccess({
      device: req.headers['user-agent'],
      ipAddress: req.ip
    });
    
    // Return success with access info
    res.json({
      success: true,
      data: {
        accessCode: accessCode.code,
        ebook: {
          id: accessCode.ebook._id,
          title: accessCode.ebook.title,
          author: accessCode.ebook.author,
          coverImage: accessCode.ebook.coverImage
        },
        purchase: accessCode.purchase ? {
          id: accessCode.purchase._id,
          amount: accessCode.purchase.amount,
          status: accessCode.purchase.status,
          reference: accessCode.purchase.reference
        } : null,
        user: accessCode.user ? {
          name: accessCode.user.name,
          email: accessCode.user.email
        } : null,
        accessCount: accessCode.accessCount,
        lastAccessedAt: accessCode.lastAccessedAt,
        expiresAt: accessCode.expiresAt,
        isActive: accessCode.isActive
      }
    });
    
  } catch (error) {
    console.error('Access validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;