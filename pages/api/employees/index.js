import nc from 'next-connect';
import {
  createEmployee,
  getAllEmployees,
} from '../../../backend/controllers/employeeController';

const handler = nc();

handler.get(async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    const test = req.body;
    console.log("input:", test);
    const employee = await createEmployee(req.body);
    console.log("returned:", employee);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;