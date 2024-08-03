import nc from 'next-connect';
import {
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../../../backend/controllers/employeeController';

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;
  await getEmployeeById(req, res);
});

handler.put(async (req, res) => {
  const { id } = req.query;
  req.params = { id }; // Add this line to ensure req.params.id is available
  await updateEmployee(req, res);
});

handler.delete(async (req, res) => {
  const { id } = req.query;
  req.params = { id }; // Add this line to ensure req.params.id is available
  await deleteEmployee(req, res);
});

export default handler;