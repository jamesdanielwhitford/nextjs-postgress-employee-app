import Link from 'next/link';

const EmployeeList = ({ employees, handleDeleteEmployee }) => {
  if (!employees || employees.length === 0) {
    return <p className="text-center text-gray-500">No employees found</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td className="actions">
                <Link href={`/employees/${employee.id}`}>
                  <a className="edit-btn">Edit</a>
                </Link>
                <button
                  className="delete-btn delete"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;