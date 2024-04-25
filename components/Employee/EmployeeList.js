import Link from 'next/link';

const EmployeeList = ({ employees, handleDeleteEmployee }) => {
  // Check if employees is not defined or not an array
  if (!employees || !Array.isArray(employees)) {
    return <div>...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-300">
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.email}</td>
              <td className="px-4 py-2">{employee.phone}</td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-center space-x-2">
                  <Link href="" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View
                  </Link>
                  <Link href="" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;