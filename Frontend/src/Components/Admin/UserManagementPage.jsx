import React, { useState } from "react";

const UserManagementPage = () => {
  const user = [
    { id: 1, name: "kartik", email: "kartik@gmail.com", role: "admin" },
    { id: 3, name: "kartik", email: "kartik@gmail.com", role: "admin" },
   
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleForm = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can reset form here if needed
    // setFormData({ name: '', email: '', role: 'Customer' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleDeleteUser(userID){
    console.log(userID);
    
  }
  return (
    <div className="m-8">
      <h2 className="m-8 font-bold text-2xl">User Management</h2>
      <h3 className="font-bold text-gray-900 ">Add New User</h3>
      <form onSubmit={handleForm} className="w-max-full flex flex-col">
        <label className="block text-gray-500 text-lg mt-2">Name</label>
        <input
          type="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-400 py-1 mt-2 rounded px-2"
        />
        <label className="block text-gray-500 text-lg">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-400 py-1 mt-2 rounded px-2"
        />
        <label className="block text-gray-500 text-lg">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-400 py-1 mt-2 rounded"
        />
        <label className="block text-gray-500 text-lg mt-2 py-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-400 py-1 mt-2 rounded "
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="py-2 mt-3 px-2 w-25 rounded bg-green-500">
          Add User
        </button>
      </form>
      <div className="mt-8">
      <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase ">
            <tr>
              <th className="py-3 px-4">NAME</th>
              <th className="py-3 px-4">EMAIL</th>
              <th className="py-3 px-4">ROLE</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
           
          </thead>
          <tbody>
              {user.length > 0
                ? user.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 w-full hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <select  onChange={(e)=>handleSelect(user.id,e.target.value)} className="p-2  border-round " >
                          <option value="Customer">Customer</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button  onClick ={()=>handleDeleteUser(user.id)}className="bg-red-500 py-1 px-2 rounded text-white ">Delete</button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
