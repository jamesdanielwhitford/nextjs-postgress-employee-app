import { createEmployee, getAllEmployees } from '../../../controllers/employeeController';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getAllEmployees(req, res);
    case 'POST':
      return createEmployee(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}