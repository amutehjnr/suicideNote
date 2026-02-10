const axios = require('axios');
const winston = require('winston');

class PaystackService {
  constructor() {
    this.baseURL = process.env.PAYSTACK_BASE_URL;
    this.secretKey = process.env.PAYSTACK_SECRET_KEY;
    this.publicKey = process.env.PAYSTACK_PUBLIC_KEY;
    this.ebookPrice = parseInt(process.env.EBOOK_PRICE) || 250000; // in kobo
    
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  async initializeTransaction(email, amount, metadata = {}) {
    try {
      const response = await this.axiosInstance.post('/transaction/initialize', {
        email,
        amount: amount || this.ebookPrice,
        metadata,
        callback_url: `${process.env.CLIENT_URL}/payment/verify`,
      });

      if (response.data.status) {
        return {
          success: true,
          data: {
            authorizationUrl: response.data.data.authorization_url,
            reference: response.data.data.reference,
            accessCode: response.data.data.access_code,
          },
        };
      }

      return {
        success: false,
        error: 'Failed to initialize transaction',
      };
    } catch (error) {
      winston.error('Paystack initialization error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Payment initialization failed',
      };
    }
  }

  async verifyTransaction(reference) {
    try {
      const response = await this.axiosInstance.get(`/transaction/verify/${reference}`);

      if (response.data.status && response.data.data.status === 'success') {
        return {
          success: true,
          data: {
            amount: response.data.data.amount,
            currency: response.data.data.currency,
            transactionDate: response.data.data.transaction_date,
            customer: response.data.data.customer,
            metadata: response.data.data.metadata,
          },
        };
      }

      return {
        success: false,
        error: 'Transaction verification failed',
      };
    } catch (error) {
      winston.error('Paystack verification error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Transaction verification failed',
      };
    }
  }

  async createTransferRecipient(name, accountNumber, bankCode) {
    try {
      const response = await this.axiosInstance.post('/transferrecipient', {
        type: 'nuban',
        name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: 'NGN',
      });

      if (response.data.status) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        error: 'Failed to create transfer recipient',
      };
    } catch (error) {
      winston.error('Paystack transfer recipient error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create transfer recipient',
      };
    }
  }

  async initiateTransfer(recipientCode, amount, reason) {
    try {
      const response = await this.axiosInstance.post('/transfer', {
        source: 'balance',
        amount,
        recipient: recipientCode,
        reason: reason || 'Affiliate commission payout',
      });

      if (response.data.status) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        error: 'Failed to initiate transfer',
      };
    } catch (error) {
      winston.error('Paystack transfer error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to initiate transfer',
      };
    }
  }

  async listBanks() {
    try {
      const response = await this.axiosInstance.get('/bank?country=nigeria');
      
      if (response.data.status) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      return {
        success: false,
        error: 'Failed to fetch banks',
      };
    } catch (error) {
      winston.error('Paystack banks error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch banks',
      };
    }
  }

  getPublicKey() {
    return this.publicKey;
  }
}

module.exports = new PaystackService();