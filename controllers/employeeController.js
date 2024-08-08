const employeeModel = require('../models/employeeModel');

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.createEmployee(req.body);
    if (!employee) {
      throw new Error('Failed to create employee');
    }
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching all employees:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
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
    console.error(`Error fetching employee with id ${id}:`, error);
    res.status(500).json({ error: error.message || 'Internal server error' });
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
    console.error(`Error updating employee with id ${id}:`, error);
    res.status(500).json({ error: error.message || 'Internal server error' });
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
    console.error(`Error deleting employee with id ${id}:`, error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};