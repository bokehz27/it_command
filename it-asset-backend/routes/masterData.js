const express = require('express');
const createMasterDataController = require('../controllers/masterDataController');

// Import models ทั้งหมดที่ต้องการสร้าง API
const { 
    Brand, Category, Location, Department, 
    Subcategory, Model, Ram, Cpu, Storage, 
    WindowsVersion, OfficeVersion, AntivirusProgram, 
    SpecialProgram, Position, Email, Building, AssetStatus 
} = require('../models');

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
router.use('/subcategories', createRoutesForModel(Subcategory));
router.use('/models', createRoutesForModel(Model));
router.use('/rams', createRoutesForModel(Ram));
router.use('/cpus', createRoutesForModel(Cpu));
router.use('/storages', createRoutesForModel(Storage));
router.use('/windows-versions', createRoutesForModel(WindowsVersion));
router.use('/office-versions', createRoutesForModel(OfficeVersion));
router.use('/antivirus-programs', createRoutesForModel(AntivirusProgram));
router.use('/special-programs', createRoutesForModel(SpecialProgram));
router.use('/positions', createRoutesForModel(Position));
router.use('/emails', createRoutesForModel(Email));
router.use('/buildings', createRoutesForModel(Building));
router.use('/asset-statuses', createRoutesForModel(AssetStatus));

module.exports = router;