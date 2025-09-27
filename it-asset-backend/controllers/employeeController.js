// it-asset-backend/controllers/employeeController.js
const { Employee, Department, Position, Email } = require('../models');

// @desc    Get all employees with their related data
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: Department, attributes: ['name'] },
        { model: Position, attributes: ['name'] },
        { model: Email, attributes: ['email_address'] }
      ]
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// @desc    Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

// @desc    Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

// @desc    Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};