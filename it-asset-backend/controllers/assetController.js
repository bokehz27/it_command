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


// --- START: เพิ่มโค้ดส่วนนี้เข้าไป ---

// @desc    Get a single asset by ID
// @route   GET /api/assets/:id
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id, {
      include: [ /* สามารถใส่ include เหมือน getAllAssets ได้ ถ้าต้องการข้อมูล关联 */ ]
    });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset', error: error.message });
  }
};


// @desc    Update an asset
// @route   PUT /api/assets/:id
exports.updateAsset = async (req, res) => {
  try {
    const [updated] = await Asset.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedAsset = await Asset.findByPk(req.params.id);
      // Here you would log the 'UPDATE' action to asset_history
      res.status(200).json(updatedAsset);
    } else {
      res.status(404).json({ message: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating asset', error: error.message });
  }
};

// @desc    Delete an asset
// @route   DELETE /api/assets/:id
exports.deleteAsset = async (req, res) => {
  try {
    const deleted = await Asset.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      // Here you would log the 'DELETE' action to asset_history
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting asset', error: error.message });
  }
};

// --- END: เพิ่มโค้ดส่วนนี้เข้าไป ---