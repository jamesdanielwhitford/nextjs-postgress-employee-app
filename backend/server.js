const express = require('express');
const app = express(); 

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);
const employeeController = require('../controllers/employeeController');

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});