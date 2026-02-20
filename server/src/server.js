require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const path = require('path');
const adminRoutes = require('./routes/admin.routes');

console.log('🚀 Starting server...');

// ================== DATABASE ==================
require('./config/database');
const distPath = path.join(__dirname, '../dist');

// ================== ROUTES ==================
const authRoutes = require('./routes/auth.routes');
const ebookRoutes = require('./routes/ebook.routes');
const paymentRoutes = require('./routes/payment.routes');
const accessRoutes = require('./routes/accessRoutes');
const emailAccessRoutes = require('./routes/emailAccess.routes');

// ================== MIDDLEWARE ==================
const authMiddleware = require('./middleware/auth.middleware');

// ================== LOGGER ==================
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// ================== APP INIT ==================
const app = express();

// ================== CORE MIDDLEWARE ==================
console.log('🔧 Registering core middleware...');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ================== DEBUG BODY LOGGER ==================
app.use((req, res, next) => {
  console.log('🔍 ===== REQUEST DEBUG =====');
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('===========================');
  next();
});

// ================== SECURITY ==================
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ================== RATE LIMIT ==================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// ================== SANITIZATION & PERF ==================
app.use(mongoSanitize());
app.use(compression());

// ================== REQUEST LOGGING ==================
app.use(authMiddleware.requestLogger);

// ================== STATIC ==================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ================== TEST ROUTES ==================
app.post('/test-simple', (req, res) => {
  res.json({
    success: true,
    message: 'Server body parsing works',
    body: req.body,
  });
});

// ================== ✅ ADMIN ROUTES - FIRST PRIORITY ==================
console.log('🔧 Registering admin routes...');
app.use('/admin', adminRoutes); // For admin pages
app.use('/api/v1/admin', adminRoutes); // For admin API

// ================== ✅ MAIN API ROUTES ==================
console.log('🔧 Registering API routes...');
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ebooks', ebookRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/access', accessRoutes);
app.use('/access', emailAccessRoutes);

// ================== HEALTH ==================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ================== ✅ FRONTEND STATIC FILES ==================
app.use(express.static(distPath));

// ================== ✅ SPA FALLBACK - AFTER ALL OTHER ROUTES ==================
app.get('*', (req, res, next) => {
  // Skip API, admin, and health routes
  if (req.originalUrl.startsWith('/api')) return next();
  if (req.originalUrl.startsWith('/admin')) return next(); // CRITICAL: Skip admin routes
  if (req.originalUrl.startsWith('/health')) return next();

  // Serve index.html for all other routes (React Router)
  res.sendFile(path.join(distPath, 'index.html'));
});

// ================== 404 ==================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error('🔥 ERROR:', err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Add near the top after database connection
const fixIndexes = async () => {
  try {
    console.log('🔧 Checking database indexes...');
    const Purchase = require('./models/Purchase.model');
    
    // Drop the problematic index if it exists
    try {
      await Purchase.collection.dropIndex('transactionReference_1');
      console.log('✅ Dropped problematic transactionReference index');
    } catch (error) {
      // Index doesn't exist, that's fine
    }
    
    // Create sparse index
    try {
      await Purchase.collection.createIndex(
        { transactionReference: 1 }, 
        { 
          sparse: true, 
          background: true,
          name: 'transactionReference_sparse'
        }
      );
      console.log('✅ Created sparse index for transactionReference');
    } catch (error) {
      console.log('ℹ️ Index may already exist:', error.message);
    }
    
    console.log('✅ Index check completed');
  } catch (error) {
    console.error('❌ Error checking indexes:', error);
  }
};

// Call this after database connection
mongoose.connection.once('open', async () => {
  console.log('✅ MongoDB connected');
  await fixIndexes();
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Health → http://localhost:${PORT}/health`);
  console.log(`✅ Test → http://localhost:${PORT}/test-simple`);
  console.log(`✅ Admin Login → http://localhost:${PORT}/admin/signin`);
  console.log(`✅ Admin Dashboard → http://localhost:${PORT}/admin/dashboard`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
});

module.exports = app;