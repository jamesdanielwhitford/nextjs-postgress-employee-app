import { getEmployeeById, updateEmployee, deleteEmployee } from '../../../controllers/employeeController';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      return getEmployeeById(req, res, id);
    case 'PUT':
      return updateEmployee(req, res, id, req.body);
    case 'DELETE':
      return deleteEmployee(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}