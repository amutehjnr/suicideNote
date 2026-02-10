const express = require('express');
const router = express.Router();
const ebookController = require('../controllers/ebook.controller');
const authMiddleware = require('../middleware/auth.middleware');

// === PUBLIC ROUTES ===
router.get('/', ebookController.getAllEbooks);
router.get('/search', ebookController.searchEbooks);
router.get('/featured', ebookController.getFeaturedEbooks);
router.get('/categories', ebookController.getCategories);
router.get('/:id/preview', ebookController.getEbookPreview);

// These routes use optional auth for user context
router.get('/:id', authMiddleware.optional, ebookController.getEbookById);
router.get('/:id/reviews', authMiddleware.optional, ebookController.getReviews);

// === PROTECTED ROUTES ===
router.post('/:id/reviews', authMiddleware.protect, ebookController.addReview);
router.post('/:id/reviews/:reviewId/helpful', authMiddleware.protect, ebookController.markHelpfulReview);
router.post('/:id/reviews/:reviewId/report', authMiddleware.protect, ebookController.reportReview);

router.post('/:id/progress', authMiddleware.protect, ebookController.saveReadingProgress);
router.get('/:id/progress', authMiddleware.protect, ebookController.getReadingProgress);

// === OTHER ROUTES ===
router.post('/validate-access-code', ebookController.validateAccessCode);
router.get('/:id/content', authMiddleware.optional, ebookController.getEbookContent);
router.get('/:id/stats', authMiddleware.protect, authMiddleware.restrictTo('admin'), ebookController.getEbookStats);

module.exports = router;