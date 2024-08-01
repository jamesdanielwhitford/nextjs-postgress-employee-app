import { useState, useEffect } from 'react';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async (employee) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      
      if (response.ok) {
        const data = await response.json();
        setEmployees([...employees, data]);
      } else {
        console.error('Error creating employee:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      } else {
        console.error('Error deleting employee:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Add Employee</h1>
        <EmployeeForm onSubmit={handleCreateEmployee} />
      </div>
      <div className="container">
        <h2>Employee List</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading employees...</p>
        ) : (
          <EmployeeList
            employees={employees}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default Home;