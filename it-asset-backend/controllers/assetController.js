const { Asset, Brand, Category, Subcategory, Location, Department, Employee, Ram, Cpu, Storage, WindowsVersion, OfficeVersion, AntivirusProgram, AssetStatus } = require('../models');

// @desc    Get all assets
// @route   GET /api/assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      include: [
        { model: Brand, attributes: ['name'] },
        { model: Category, attributes: ['name'] },
        { model: Subcategory, attributes: ['name'] },
        { model: Location, attributes: ['name'] },
        { model: Department, attributes: ['name'] },
        { model: Employee, as: 'user', attributes: ['fullName'] },
        { model: Ram, attributes: ['size'] },
        { model: Cpu, attributes: ['name'] },
        { model: Storage, attributes: ['type', 'size'] },
        { model: WindowsVersion, attributes: ['name'] },
        { model: OfficeVersion, attributes: ['name'] },
        { model: AntivirusProgram, attributes: ['name'] },
        { model: AssetStatus, as: 'status', attributes: ['name'] }
      ]
    });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets', error: error.message });
  }
};

// @desc    Create a new asset
// @route   POST /api/assets
exports.createAsset = async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        // Here you would add logic to log this 'CREATE' action to the asset_history table
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({ message: 'Error creating asset', error: error.message });
    }
};

// ... We will add more functions like getAssetById, updateAsset, deleteAsset later ...