const nodemailer = require('nodemailer');
const winston = require('winston');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Send Access Code Email
   */
  async sendAccessCodeEmail(to, name, accessCode, ebook) {
    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
    const accessUrl = `${frontendUrl}/access/${ebook.slug || ebook._id}?code=${accessCode}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: `Your Access Code for ${ebook.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .code-box { background: white; padding: 20px; text-align: center; border: 2px dashed #059669; font-family: monospace; font-size: 28px; font-weight: bold; color: #059669; margin: 20px 0; border-radius: 5px; }
            .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .ebook-info { background: white; padding: 15px; border-left: 4px solid #059669; margin: 20px 0; }
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
              
              <div class="ebook-info">
                <h3 style="margin: 0 0 10px 0; color: #059669;">${ebook.title}</h3>
                <p style="margin: 0;">${ebook.description || 'Start reading your ebook now!'}</p>
              </div>
              
              <div class="code-box">
                ${accessCode}
              </div>
              
              <p style="text-align: center;">
                <a href="${accessUrl}" class="button">Access Your Ebook</a>
              </p>
              
              <p><strong>How to use:</strong></p>
              <ol>
                <li>Click the button above or visit: ${frontendUrl}/access</li>
                <li>Enter your access code: <strong>${accessCode}</strong></li>
                <li>Start reading immediately</li>
              </ol>
              
              <p>Keep this code safe - you'll need it to access your ebook.</p>
              
              <p>Happy reading!</p>
              <p><strong>The Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      winston.info(`Access code email sent to: ${to}`);
      return true;
    } catch (error) {
      winston.error('Error sending access code email:', error);
      return false;
    }
  }
}

module.exports = new EmailService();