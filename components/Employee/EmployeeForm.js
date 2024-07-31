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
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="btn">
        {isEditing ? 'Update Employee' : 'Add Employee'}
      </button>
      {isEditing && (
        <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }} className="mt-4 block text-center text-blue-600 hover:text-blue-800">
          Cancel
        </a>
      )}
    </form>
  );
};

export default EmployeeForm;