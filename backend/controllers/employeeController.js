const pool = require('../config/database');

const createEmployee = async (req, res) => {
  try {
    const { name, position, department } = req.body;
    const query = 'INSERT INTO employees (name, position, department) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, position, department];
    const result = await pool.query(query, values);
    const employee = result.rows[0];
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
    const query = 'SELECT * FROM employees';
    const result = await pool.query(query);
    const employees = result.rows;
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const query = 'SELECT * FROM employees WHERE id = $1';
    const result = await pool.query(query, [req.params.id]);
    const employee = result.rows[0];
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { name, position, department } = req.body;
    const query = 'UPDATE employees SET name = $1, position = $2, department = $3 WHERE id = $4 RETURNING *';
    const values = [name, position, department, req.params.id];
    const result = await pool.query(query, values);
    const employee = result.rows[0];
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const query = 'DELETE FROM employees WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [req.params.id]);
    const employee = result.rows[0];
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.status(200).json(employee);
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