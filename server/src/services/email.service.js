const winston = require('winston');

class EmailService {
  constructor() {
    console.log('📧 Initializing email service with Brevo API...');
    console.log('📧 BREVO_API_KEY:', process.env.BREVO_API_KEY ? 'Set' : 'Not set');
  }

  async sendVerificationEmail(to, token, name = 'there') {
    console.log(`📧 Sending verification email to: ${to}`);
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Suicide Note</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
            <p style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </p>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #059669;">${verificationUrl}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, 'Verify Your Email - Suicide Note', htmlContent);
  }

  async sendWelcomeEmail(to, name = 'there') {
    console.log(`📧 Sending welcome email to: ${to}`);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .feature { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #059669; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome Aboard!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Welcome to Suicide Note! Your email has been successfully verified.</p>
            
            <h3>What's next?</h3>
            
            <div class="feature">
              <strong>📚 Read the Book</strong>
              <p>Access your ebook anytime from your dashboard.</p>
            </div>
            
            <div class="feature">
              <strong>💰 Become an Affiliate</strong>
              <p>Earn 50% commission by sharing the book with others.</p>
            </div>
            
            <div class="feature">
              <strong>💬 Join Our Community</strong>
              <p>Connect with other readers and share your thoughts.</p>
            </div>
            
            <p>Start by exploring the ebook or checking out our affiliate program.</p>
            
            <p>If you have any questions, feel free to reply to this email.</p>
            
            <p>Happy reading!</p>
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, 'Welcome to Suicide Note!', htmlContent);
  }

  /**
   * Send Access Code Email via Brevo API
   */
  async sendAccessCodeEmail(to, name, accessCode, ebook) {
    console.log(`📧 Sending access code email to: ${to}`);
    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'https://suicidenote.onrender.com';
    
    const accessUrl = `${frontendUrl}/access/${ebook.slug || ebook._id}?code=${accessCode}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; padding: 20px; text-align: center; border: 2px dashed #059669; font-family: monospace; font-size: 28px; font-weight: bold; color: #059669; margin: 20px 0; border-radius: 5px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .dashboard-link { display: inline-block; margin-top: 15px; color: #059669; text-decoration: none; font-weight: bold; }
          .dashboard-link:hover { text-decoration: underline; }
          .note { font-size: 14px; color: #666; margin-top: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Purchase!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name || 'Valued Reader'},</h2>
            <p>Thank you for purchasing <strong>"${ebook.title}"</strong>! Your access code is ready below.</p>
            
            <div class="code-box">${accessCode}</div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${accessUrl}" class="button">📖 Access Your Ebook Dashboard</a>
            </div>
            
            <div class="note">
              <p style="margin: 0 0 10px 0;"><strong>🔗 How it works:</strong></p>
              <p style="margin: 5px 0;">1. Click the button above</p>
              <p style="margin: 5px 0;">2. Your access code will be automatically validated</p>
              <p style="margin: 5px 0;">3. You'll be redirected to your personal reading dashboard</p>
              <p style="margin: 5px 0;">4. The code will be saved for future visits</p>
            </div>
            
            <p style="text-align: center; margin-top: 20px;">
              <a href="${frontendUrl}" class="dashboard-link">🔐 Go to Login Page Instead</a>
            </p>
            
            <p style="font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 15px;">
              <strong>Save your code:</strong> <span style="background: #f0f0f0; padding: 3px 8px; border-radius: 3px;">${accessCode}</span>
            </p>
            
            <p>Keep this email safe - you'll need this code to access your ebook.</p>
            <p>Happy reading!</p>
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, `Your Access Code for ${ebook.title} - Suicide Note`, htmlContent);
  }

  async sendFreeAccessEmail(to, name, accessCode, ebook, customMessage) {
    console.log(`📧 Sending free access email to: ${to}`);
    const frontendUrl = process.env.FRONTEND_URL || 'https://suicidenote.onrender.com';
    const accessUrl = `${frontendUrl}/access/${ebook.slug || ebook._id}?code=${accessCode}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #9b59b6, #8e44ad); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; padding: 20px; text-align: center; border: 2px dashed #9b59b6; font-family: monospace; font-size: 28px; font-weight: bold; color: #9b59b6; margin: 20px 0; border-radius: 5px; }
          .message-box { background: #e8f4fd; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; }
          .button { display: inline-block; background: #9b59b6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .dashboard-link { display: inline-block; margin-top: 15px; color: #9b59b6; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎁 You've Received Complimentary Access!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name || 'Valued Reader'},</h2>
            
            <div class="message-box">
              <p>${customMessage || 'We\'re pleased to offer you complimentary access to our ebook.'}</p>
            </div>
            
            <p>You now have free access to <strong>"${ebook.title}"</strong>. Your personal access code is below:</p>
            
            <div class="code-box">${accessCode}</div>
            
            <p style="text-align: center;">
              <a href="${accessUrl}" class="button">Access Your Ebook Dashboard</a>
            </p>
            
            <p style="text-align: center; margin-top: 15px;">
              <a href="${frontendUrl}" class="dashboard-link">🔐 Go to Login Page</a>
            </p>
            
            <p>This code will never expire. Keep it safe to access your ebook anytime.</p>
            
            <p>Happy reading!</p>
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, `🎁 Complimentary Access to ${ebook.title}`, htmlContent);
  }

  async sendPurchaseConfirmationEmail(to, name, purchase, accessCode) {
    console.log(`📧 Sending purchase confirmation email to: ${to}`);
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: purchase.currency || 'NGN',
    }).format(purchase.amount / 100);

    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'https://suicidenote.onrender.com';
    const accessUrl = `${frontendUrl}/access/${purchase.ebook?.slug || purchase.ebook}?code=${accessCode}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code { background: white; padding: 20px; text-align: center; border: 2px dashed #059669; font-family: monospace; font-size: 24px; font-weight: bold; color: #059669; margin: 20px 0; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Purchase Successful!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for purchasing <strong>"${purchase.ebook?.title || 'Suicide Note'}"</strong>!</p>
            
            <h3>Purchase Details:</h3>
            <ul>
              <li><strong>Order ID:</strong> ${purchase.transactionReference}</li>
              <li><strong>Amount:</strong> ${formattedAmount}</li>
              <li><strong>Date:</strong> ${new Date(purchase.createdAt).toLocaleDateString()}</li>
            </ul>
            
            <h3>Your Access Code:</h3>
            <div class="code">${accessCode}</div>
            
            <p style="text-align: center;">
              <a href="${accessUrl}" class="button">Access Your Reading Dashboard</a>
            </p>
            
            <p>This code will take you directly to your ebook reader after validation.</p>
            
            <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <strong>💰 Want to Earn Your Money Back?</strong>
              <p>Become an affiliate and earn 50% commission (₦${Math.floor(purchase.amount * 0.5 / 100)}) for every sale you refer!</p>
              <p><a href="${process.env.CLIENT_URL}/affiliate">Learn More →</a></p>
            </div>
            
            <p>If you have any issues accessing the ebook, reply to this email for support.</p>
            
            <p>Happy reading!</p>
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, 'Purchase Confirmation - Suicide Note', htmlContent);
  }

  // services/email.service.js - Add this method
async sendAffiliateWelcomeEmail(to, name, affiliate, includeDashboardLink = false) {
  console.log(`📧 Sending affiliate welcome email to: ${to}`);
  console.log('📧 Sending affiliate welcome email with dashboard token:', affiliate.dashboardToken);
  console.log('📧 Dashboard URL:', `${process.env.CLIENT_URL || 'https://suicidenote.onrender.com'}/affiliate/token/${affiliate.dashboardToken}`);
  
  const dashboardUrl = `${process.env.CLIENT_URL || 'https://suicidenote.onrender.com'}/affiliate/token/${affiliate.dashboardToken}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .link-box { background: white; padding: 15px; border: 2px solid #059669; border-radius: 5px; margin: 20px 0; font-family: monospace; word-break: break-all; text-align: center; font-size: 18px; font-weight: bold; color: #059669; }
        .dashboard-box { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 1px solid #a5d6a7; }
        .button { display: inline-block; background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin: 10px 0; }
        .button:hover { background: #047857; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Our Affiliate Program!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name || 'Valued Partner'},</h2>
          <p>Congratulations! You're now part of the Suicide Note affiliate program.</p>
          
          <h3>Your Affiliate Details:</h3>
          <ul>
            <li><strong>Affiliate Code:</strong> ${affiliate.affiliateCode}</li>
            <li><strong>Commission Rate:</strong> ${(affiliate.commissionRate * 100)}%</li>
            <li><strong>Commission per Sale:</strong> ₦1,500</li>
          </ul>
          
          <h3>Your Unique Affiliate Link:</h3>
          <div class="link-box">${affiliate.referralLink}</div>
          
          <div class="dashboard-box">
            <h3 style="color: #059669; margin-top: 0;">🔐 One-Click Access to Your Dashboard</h3>
            <p>Click the button below to access your affiliate dashboard instantly - no login required!</p>
            <a href="${dashboardUrl}" class="button">Access Your Dashboard</a>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">
              This link is unique to you. Bookmark it for easy access.
            </p>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important:</strong> This dashboard link is unique to you. 
            Do not share it with others. Keep it safe to track your earnings.
          </div>
          
          <h3>How to Start Earning:</h3>
          <ol>
            <li><strong>Share your link:</strong> Share your unique affiliate link on social media, blogs, or with friends</li>
            <li><strong>Track performance:</strong> Visit your dashboard anytime to monitor clicks, conversions, and earnings</li>
            <li><strong>Get paid:</strong> Request payouts when you reach the ₦5,000 minimum threshold</li>
          </ol>
          
          <div style="background: #e7f3ff; padding: 15px; border-left: 4px solid #1890ff; margin: 20px 0;">
            <strong>💡 Pro Tip:</strong>
            <p>Share your personal story about how the book helped you. Authentic recommendations convert better than generic links!</p>
          </div>
          
          <p><strong>Payout Information:</strong></p>
          <ul>
            <li>Minimum payout: ₦5,000</li>
            <li>Payouts are processed within 7 days of request</li>
            <li>Payments are made via bank transfer</li>
          </ul>
          
          <p>If you have any questions, reply to this email.</p>
          
          <p>Happy earning!</p>
          <p><strong>The Suicide Note Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 Suicide Note. All rights reserved.</p>
          <p>Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return this.sendEmailViaBrevo(to, '🎉 Welcome to the Suicide Note Affiliate Program!', htmlContent);
}

  async sendAffiliateCommissionEmail(to, name, purchase, commissionAmount) {
    console.log(`📧 Sending affiliate commission email to: ${to}`);
    const formattedCommission = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(commissionAmount / 100);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .commission { background: white; padding: 20px; text-align: center; border: 2px solid #059669; font-size: 32px; font-weight: bold; color: #059669; margin: 20px 0; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 New Commission Earned!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Great news! Someone just purchased <strong>"Suicide Note"</strong> through your affiliate link!</p>
            
            <div class="commission">${formattedCommission} Earned!</div>
            
            <h3>Sale Details:</h3>
            <ul>
              <li><strong>Commission Amount:</strong> ${formattedCommission}</li>
              <li><strong>Sale Reference:</strong> ${purchase.transactionReference}</li>
              <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
              <li><strong>Time:</strong> ${new Date().toLocaleTimeString()}</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${process.env.CLIENT_URL}/affiliate/dashboard" class="button">View Your Earnings Dashboard</a>
            </p>
            
            <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <strong>💰 Your Updated Earnings:</strong>
              <p>Keep sharing your link to earn more! Remember, you need ₦5,000 minimum to request a payout.</p>
            </div>
            
            <p>Thank you for promoting Suicide Note!</p>
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, '💰 New Commission Earned!', htmlContent);
  }

  async sendPasswordResetEmail(to, token) {
    console.log(`📧 Sending password reset email to: ${to}`);
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <h2>Hi there,</h2>
            <p>We received a request to reset your password for your Suicide Note account.</p>
            
            <p style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </p>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #059669;">${resetUrl}</p>
            
            <p>This link will expire in 1 hour.</p>
            
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, 'Reset Your Password - Suicide Note', htmlContent);
  }

  async sendPasswordChangedEmail(to) {
    console.log(`📧 Sending password changed email to: ${to}`);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .warning { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Changed</h1>
          </div>
          <div class="content">
            <h2>Hi there,</h2>
            <p>Your Suicide Note account password was recently changed.</p>
            
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <p>If you didn't make this change, please contact our support team immediately.</p>
            </div>
            
            <p><strong>Change Details:</strong></p>
            <ul>
              <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              <li><strong>Account:</strong> ${to}</li>
            </ul>
            
            <p>For security reasons, if you didn't make this change, please:</p>
            <ol>
              <li>Reset your password immediately</li>
              <li>Check your account for any suspicious activity</li>
              <li>Contact our support team</li>
            </ol>
            
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, 'Password Changed Successfully - Suicide Note', htmlContent);
  }

  async sendRefundConfirmationEmail(to, name, purchase, reason) {
    console.log(`📧 Sending refund confirmation email to: ${to}`);
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: purchase.currency || 'NGN',
    }).format(purchase.amount / 100);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #1890ff; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Refund Request Received</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We've received your refund request for purchase <strong>${purchase.transactionReference}</strong>.</p>
            
            <div class="info-box">
              <p><strong>Refund Details:</strong></p>
              <ul>
                <li><strong>Amount:</strong> ${formattedAmount}</li>
                <li><strong>Reason:</strong> ${reason}</li>
                <li><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</li>
              </ul>
            </div>
            
            <p><strong>What happens next:</strong></p>
            <ol>
              <li>Our team will review your request within 24-48 hours</li>
              <li>If approved, the refund will be processed to your original payment method</li>
              <li>You'll receive a confirmation email once the refund is processed</li>
              <li>Access to the ebook has been temporarily suspended during review</li>
            </ol>
            
            <p>Refunds typically take 5-10 business days to appear in your account, depending on your bank.</p>
            
            <p>If you have any questions about your refund, reply to this email.</p>
            
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, 'Refund Request Received - Suicide Note', htmlContent);
  }

  async sendPayoutConfirmationEmail(to, name, amount, reference) {
    console.log(`📧 Sending payout confirmation email to: ${to}`);
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount / 100);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #059669, #047857); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .amount { background: white; padding: 20px; text-align: center; border: 2px solid #059669; font-size: 32px; font-weight: bold; color: #059669; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Payout Processed!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Great news! Your affiliate commission payout has been processed.</p>
            
            <div class="amount">${formattedAmount}</div>
            
            <p><strong>Payout Details:</strong></p>
            <ul>
              <li><strong>Amount:</strong> ${formattedAmount}</li>
              <li><strong>Reference:</strong> ${reference}</li>
              <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
              <li><strong>Time:</strong> ${new Date().toLocaleTimeString()}</li>
              <li><strong>Method:</strong> Bank Transfer via Paystack</li>
            </ul>
            
            <p>The funds should appear in your bank account within 1-3 business days, depending on your bank.</p>
            
            <div style="background: #e7f3ff; padding: 15px; border-left: 4px solid #1890ff; margin: 20px 0;">
              <strong>💡 Keep Earning:</strong>
              <p>Continue sharing your affiliate link to earn more commissions!</p>
              <p>Your next payout will be available when you reach ₦5,000 in earnings.</p>
            </div>
            
            <p>Thank you for being a valuable part of our affiliate program!</p>
            
            <p><strong>The Suicide Note Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Suicide Note. All rights reserved.</p>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmailViaBrevo(to, '💰 Affiliate Payout Processed!', htmlContent);
  }

  /**
   * Core method to send email via Brevo API
   */
  async sendEmailViaBrevo(to, subject, htmlContent) {
    try {
      console.log(`📧 Sending email via Brevo API to: ${to}`);
      console.log(`📧 Subject: ${subject}`);
      
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: 'Suicide Note',
            email: 'sanimustapha2215@gmail.com'
          },
          to: [
            {
              email: to,
              name: to.split('@')[0]
            }
          ],
          subject: subject,
          htmlContent: htmlContent
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Email sent successfully via Brevo API:', data.messageId);
        winston.info(`Email sent to ${to}: ${subject}`);
        return true;
      } else {
        console.error('❌ Brevo API error:', data);
        winston.error('Brevo API error:', data);
        return false;
      }
    } catch (error) {
      console.error('❌ Brevo API exception:', error.message);
      winston.error('Brevo API exception:', error);
      return false;
    }
  }
}

module.exports = new EmailService();