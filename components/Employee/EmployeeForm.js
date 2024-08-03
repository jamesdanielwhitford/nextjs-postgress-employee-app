import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EmployeeForm = ({ employee, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (employee) {
        // Edit existing employee
        const response = await fetch(`/api/employees/${employee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedEmployee = await response.json();
          onSubmit(updatedEmployee);
          router.push('/');
        } else {
          console.error('Error updating employee:', await response.text());
        }
      } else {
        // Create new employee
        onSubmit(formData);
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {employee ? 'Update Employee' : 'Add Employee'}
      </button>
      {employee && (
        <button type="button" onClick={() => router.push('/')}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default EmployeeForm;