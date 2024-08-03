import { useState, useEffect } from 'react';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  const handleSubmit = async (employee) => {
    try {
      if (editingEmployee) {
        // Update existing employee
        const response = await fetch(`/api/employees/${editingEmployee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
        
        if (response.ok) {
          const updatedEmployee = await response.json();
          setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
          setEditingEmployee(null);
        } else {
          console.error('Error updating employee:', await response.text());
        }
      } else {
        // Create new employee
        const response = await fetch('/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });
        
        if (response.ok) {
          const newEmployee = await response.json();
          setEmployees([...employees, newEmployee]);
        } else {
          console.error('Error creating employee:', await response.text());
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
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
        <h1>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h1>
        <EmployeeForm 
          employee={editingEmployee} 
          onSubmit={handleSubmit} 
        />
      </div>
      <div className="container">
        <h2>Employee List</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading employees...</p>
        ) : (
          <EmployeeList
            employees={employees}
            handleEditEmployee={handleEditEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default Home;