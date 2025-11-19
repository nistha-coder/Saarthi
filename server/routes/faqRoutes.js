// ========== server/routes/faqRoutes.js (NEW FILE) ==========
const express = require('express');
const router = express.Router();
const { askFaq } = require('../controllers/faqController');

/**
 * FAQ Routes
 * Routes for FAQ functionality
 */

// POST /api/faq/ask - Ask a question to FAQ server
router.post('/ask', askFaq);

module.exports = router;