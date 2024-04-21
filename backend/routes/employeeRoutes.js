const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', (req, res) => employeeController.getAllEmployees(req, res));
router.post('/', (req, res) => employeeController.createEmployee(req, res));
router.get('/:id', (req, res) => employeeController.getEmployeeById(req, res));
router.put('/:id', (req, res) => employeeController.updateEmployee(req, res));
router.delete('/:id', (req, res) => employeeController.deleteEmployee(req, res));

module.exports = router;