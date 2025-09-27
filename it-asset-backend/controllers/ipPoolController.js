// it-asset-backend/controllers/ipPoolController.js
const { IpPool, Building } = require('../models');

exports.getAllIpPools = async (req, res) => {
  try {
    const ipPools = await IpPool.findAll({
      include: [{ model: Building, attributes: ['name'] }],
      order: [['id', 'ASC']]
    });
    res.json(ipPools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching IP pools', error: error.message });
  }
};

exports.createIpPool = async (req, res) => {
  try {
    const newIp = await IpPool.create(req.body);
    res.status(201).json(newIp);
  } catch (error) {
    res.status(500).json({ message: 'Error creating IP address', error: error.message });
  }
};

// --- START: เพิ่มฟังก์ชันนี้เข้ามา ---
exports.updateIpPool = async (req, res) => {
    try {
        const ipToUpdate = await IpPool.findByPk(req.params.id);
        if (!ipToUpdate) {
            return res.status(404).json({ message: 'IP address not found' });
        }
        // ป้องกันการแก้ไข IP ที่ถูกใช้งานแล้ว
        if (ipToUpdate.is_used) {
            return res.status(400).json({ message: 'Cannot edit an IP address that is currently in use.' });
        }

        const [updated] = await IpPool.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedIp = await IpPool.findByPk(req.params.id);
            res.status(200).json(updatedIp);
        } else {
             res.status(404).json({ message: 'IP address not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating IP address', error: error.message });
    }
};
// --- END: เพิ่มฟังก์ชันนี้เข้ามา ---


exports.deleteIpPool = async (req, res) => {
  try {
    // ป้องกันการลบ IP ที่ถูกใช้งานแล้ว
    const ipToDelete = await IpPool.findByPk(req.params.id);
    if (ipToDelete && ipToDelete.is_used) {
        return res.status(400).json({ message: 'Cannot delete an IP address that is currently in use.' });
    }

    const deleted = await IpPool.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'IP address not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting IP address', error: error.message });
  }
};