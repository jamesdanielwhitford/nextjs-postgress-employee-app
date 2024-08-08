import nc from 'next-connect';
import {
  createEmployee,
  getAllEmployees,
} from '../../../backend/controllers/employeeController';

const handler = nc();

handler.get(async (req, res) => {
  await getAllEmployees(req, res);
});

handler.post(async (req, res) => {
  await createEmployee(req, res);
});

export default handler;