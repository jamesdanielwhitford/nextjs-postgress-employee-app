// controllers/employeeController.js
const employeeModel = require('../models/employeeModel');

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.createEmployee(req.body);
    if (!employee) {
      throw new Error('Failed to create employee');
    }
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.query;
  try {
    const employee = await employeeModel.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.query;
  try {
    const updatedEmployee = await employeeModel.updateEmployee(id, req.body);
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.query;
  try {
    const deletedEmployee = await employeeModel.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};