// it-asset-backend/routes/employees.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Routes for /api/employees
router.route('/')
  .get(protect, employeeController.getAllEmployees)
  .post(protect, employeeController.createEmployee);

router.route('/:id')
  .put(protect, employeeController.updateEmployee)
  .delete(protect, employeeController.deleteEmployee);

module.exports = router;