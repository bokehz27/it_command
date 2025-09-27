const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/assets - ทุกคนที่มี Token สามารถดูได้
router.get('/', protect, assetController.getAllAssets);

// POST /api/assets - เฉพาะ admin เท่านั้นที่สร้างได้
router.post('/', protect, authorize('admin'), assetController.createAsset);

// --- เพิ่ม 3 บรรทัดนี้เข้าไป ---
router.get('/:id', protect, assetController.getAssetById);
router.put('/:id', protect, authorize('admin'), assetController.updateAsset);
router.delete('/:id', protect, authorize('admin'), assetController.deleteAsset);

module.exports = router;