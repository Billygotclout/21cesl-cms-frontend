import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

const AllUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jacob Jones', username: 'Admin', email: 'abrahamjo333@gmail.com', role: 'Administrator', published: 1 },
    { id: 2, name: 'Jenny Wilson', username: 'Admin', email: 'abrahamjo333@gmail.com', role: 'Administrator', published: 1 },
    { id: 3, name: 'Brooklyn Simmons', username: 'Admin', email: 'abrahamjo333@gmail.com', role: 'Administrator', published: 1 },
    { id: 4, name: 'Brooklyn Simmons', username: 'Admin', email: 'abrahamjo333@gmail.com', role: 'Administrator', published: 1 },
    { id: 5, name: 'Brooklyn Simmons', username: 'Admin', email: 'abrahamjo333@gmail.com', role: 'Administrator', published: 1 },
    { id: 6, name: 'Brooklyn Simmons', username: 'Admin', email: 'abrahamjo333@gmail.com', role: 'Administrator', published: 1 },
  ]);

  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 7;

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Users</h1>
        <button className="flex items-center gap-2 bg-white text-[#1BB8AB] border border-[#1BB8AB] rounded-full px-4 py-2 text-sm">
          <Plus size={16} />
          <span>Add new user</span>
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">All Users</h2>
        <div className="relative w-64 ml-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={18} />
          <input
            type="text"
            placeholder="Search for here"
            className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded shadow mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b border-blue-100 bg-blue-50">
                <th className="p-4">
                  <input type="checkbox" className="h-4 w-4" />
                </th>
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Username</th>
                <th className="p-4 font-normal">Email</th>
                <th className="p-4 font-normal">Role</th>
                <th className="p-4 font-normal">Published</th>
                <th className="p-4 font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100">
                  <td className="p-4">
                    <input type="checkbox" className="h-4 w-4" />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">{user.published}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                    <Trash2 size={18} />
                    <span className="sr-only">Delete</span>

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center p-4">
          <nav className="flex items-center">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              className="p-2 rounded-md hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
                  currentPage === page 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => goToPage(currentPage + 1)}
              className="p-2 rounded-md hover:bg-gray-100"
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;