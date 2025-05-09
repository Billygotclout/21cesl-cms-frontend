import React, { useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';

const AddNewUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
 
 {/* Main Content */}
 <div className="flex-1 p-8">
 <div className="flex justify-between items-center mb-4">
   <div>
     <h1 className="text-2xl font-medium text-gray-800">Add New User</h1>
     <p className="text-gray-500 mt-1">Create a brand new user and add them to this site.</p>
   </div>
 </div>
 <div className="bg-white rounded-md p-6 shadow-sm">
   <h2 className="text-lg font-medium text-gray-800 mb-6">New user information</h2>
   
   <div className="grid grid-cols-2 gap-4">
     <div>
       <input 
         type="text" 
         placeholder="Enter username" 
         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
       />
     </div>
     <div>
       <input 
         type="email" 
         placeholder="Enter email" 
         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
       />
     </div>
   </div>

   <div className="grid grid-cols-2 gap-4 mt-4">
     <div>
       <input 
         type="text" 
         placeholder="Enter first name" 
         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
       />
     </div>
     <div>
       <input 
         type="text" 
         placeholder="Enter last name" 
         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
       />
     </div>
   </div>

   <div className="grid grid-cols-2 gap-4 mt-4">
     <div className="relative">
       <input 
         type={showPassword ? "text" : "password"}
         placeholder="Enter password" 
         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
       />
       <button 
         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
         onClick={() => setShowPassword(!showPassword)}
       >
         <Eye size={20} />
       </button>
     </div>
     <div className="relative">
       <div className="w-full px-4 py-2 rounded-md border border-gray-300 flex justify-between items-center text-gray-500">
         <span>Select a role</span>
         <ChevronDown size={16} />
       </div>
     </div>
   </div>

   <div className="mt-4">
     <button className="px-5 py-2 rounded-md border border-[#1BB8AB]/100 bg-teal-50 text-[#1BB8AB] hover:bg-teal-100 transition-colors">
       Generate password
     </button>
   </div>

   <div className="mt-6 flex items-center">
     <input type="checkbox" id="sendEmail" className="rounded text-teal-500 focus:ring-teal-500 mr-2" />
     <label htmlFor="sendEmail" className="text-gray-700">Send the new user an email about their account</label>
   </div>

   <div className="mt-6">
     <button className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
       Add new user
     </button>
   </div>
 </div>
</div>
</div>
);
};

export default AddNewUser;