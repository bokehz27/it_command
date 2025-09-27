const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/assets - ทุกคนที่มี Token สามารถดูได้
router.get('/', protect, assetController.getAllAssets);

// POST /api/assets - เฉพาะ admin เท่านั้นที่สร้างได้
router.post('/', protect, authorize('admin'), assetController.createAsset);

module.exports = router;