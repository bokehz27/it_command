// it-asset-backend/routes/ipPools.js
const express = require('express');
const router = express.Router();
const ipPoolController = require('../controllers/ipPoolController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, ipPoolController.getAllIpPools)
  .post(protect, ipPoolController.createIpPool);

router.route('/:id')
  .put(protect, ipPoolController.updateIpPool) // <<< เพิ่มบรรทัดนี้
  .delete(protect, ipPoolController.deleteIpPool);

module.exports = router;