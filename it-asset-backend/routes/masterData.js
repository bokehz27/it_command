const express = require('express');
const createMasterDataController = require('../controllers/masterDataController');
const { Brand, Category, Location, Department /*, Add other models here */ } = require('../models');

const router = express.Router();

// Function to create routes for a model
const createRoutesForModel = (model) => {
  const controller = createMasterDataController(model);
  const modelRouter = express.Router();
  modelRouter.get('/', controller.getAll);
  modelRouter.post('/', controller.create);
  modelRouter.put('/:id', controller.update);
  modelRouter.delete('/:id', controller.delete);
  return modelRouter;
};

// Use the function to create routes for each master data model
router.use('/brands', createRoutesForModel(Brand));
router.use('/categories', createRoutesForModel(Category));
router.use('/locations', createRoutesForModel(Location));
router.use('/departments', createRoutesForModel(Department));
// ... Add more routes for other master data here ...

module.exports = router;