import nc from 'next-connect';
import {
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../../../backend/controllers/employeeController';
import { response } from 'express';

const handler = nc();

handler.get(async (req, res) => {
  try {
    const employee = await getEmployeeById(req,res,req.query.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const employee = await updateEmployee(req,res, req.query.id, req.body);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const employee = await deleteEmployee(req,res,req.query.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;