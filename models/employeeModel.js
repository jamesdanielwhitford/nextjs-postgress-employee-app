import { sql } from '../config/database';

const createEmployee = async (employee) => {
  const { name, email, phone } = employee;
  const result = await sql`
    INSERT INTO employees (name, email, phone)
    VALUES (${name}, ${email}, ${phone})
    RETURNING *
  `;
  return result.rows[0];
};

const getAllEmployees = async () => {
  const result = await sql`SELECT * FROM employees`;
  return result.rows;
};

const getEmployeeById = async (id) => {
  const result = await sql`
    SELECT * FROM employees WHERE id = ${id}
  `;
  return result.rows[0];
};

const updateEmployee = async (id, employee) => {
  const { name, email, phone } = employee;
  const result = await sql`
    UPDATE employees
    SET name = ${name}, email = ${email}, phone = ${phone}
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteEmployee = async (id) => {
  const result = await sql`
    DELETE FROM employees
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};