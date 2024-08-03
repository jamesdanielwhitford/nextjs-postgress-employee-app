const pool = require('../config/database');

const createEmployee = async (employee) => {
  const { name, email, phone } = employee;
  const query = 'INSERT INTO employees (name, email, phone) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, email, phone];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllEmployees = async () => {
  const query = 'SELECT * FROM employees';
  const result = await pool.query(query);
  return result.rows;
};

const getEmployeeById = async (id) => {
  const query = 'SELECT * FROM employees WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateEmployee = async (id, employee) => {
  const { name, email, phone } = employee;
  const query = 'UPDATE employees SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *';
  const values = [name, email, phone, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteEmployee = async (id) => {
  const query = 'DELETE FROM employees WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};