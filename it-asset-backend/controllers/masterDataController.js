// Generic controller for simple CRUD operations on master data tables
const createMasterDataController = (model) => ({
  getAll: async (req, res) => {
    try {
      const items = await model.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${model.name}`, error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newItem = await model.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: `Error creating ${model.name}`, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await model.update(req.body, { where: { id } });
      if (updated) {
        const updatedItem = await model.findByPk(id);
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ message: `${model.name} not found` });
      }
    } catch (error) {
        res.status(500).json({ message: `Error updating ${model.name}`, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await model.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ message: `${model.name} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting ${model.name}`, error: error.message });
    }
  }
});

module.exports = createMasterDataController;