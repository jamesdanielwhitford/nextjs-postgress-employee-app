import { useState } from 'react';
import { useRouter } from 'next/router';

const EmployeeForm = ({ employee, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState(employee || {
    name: '',
    email: '',
    phone: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({ name: '', email: '', phone: '' });
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
        {isEditing ? 'Update Employee' : 'Add Employee'}
      </button>
      {isEditing && (
        <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
          Cancel
        </a>
      )}
    </form>
  );
};

export default EmployeeForm;