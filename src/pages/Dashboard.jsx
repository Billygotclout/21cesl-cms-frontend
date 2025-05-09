import React, { useState } from "react";
import {
  PencilLine,
  Trash2,
  Search,
  Plus,
} from "lucide-react";
import DashBoardLayout from "../components/DashBoardLayout";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const activities = [
    { title: "Hello guys!", author: "Admin", date: "19/03/2024" },
    { title: "Cctv", author: "Admin", date: "19/03/2024" },
    { title: "Sample page", author: "Admin", date: "19/03/2024" },
    { title: "Privacy policy", author: "Admin", date: "19/03/2024" },
  ];

  return (
    <DashBoardLayout>
      <div className="px-6 pt-6 pb-10">
        {/* Welcome Banner */}
        <div className="bg-[#1BB8AB] text-white rounded-xl p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">
            Welcome Back 21st Century Evolution Systems
          </h2>
          <p className="mb-4 text-sm">
            Lorem Ipsum Dolor Sit Amet Consectetur. Id Turpis Id Id Non Neque Lectus Commodo Ipsum.
            Interdum Interdum Egestas Consequat At Luctus Vestibulum Nulla Tortor Vitae. Sem Sollicitudin
          </p>
          <button className="bg-white text-[#1BB8AB] font-medium px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100">
            <Plus size={16} />
            Add new user
          </button>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="relative w-72">
              <input
                type="text"
                className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BB8AB]"
                placeholder="Search for here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-[#b5b4b4]">
                <tr>
                  <th className="px-4 py-3"><input type="checkbox" /></th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Preview</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((item, idx) => (
                  <tr key={idx} className="border-b-[1px] border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3"><input type="checkbox" /></td>
                    <td className="px-4 py-3">{item.title}</td>
                    <td className="px-4 py-3">{item.author}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">
                      <button className="bg-teal-50 text-[#1BB8AB] px-3 py-1 rounded hover:bg-teal-100 text-xs font-medium flex items-center gap-1">
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <PencilLine className="text-gray-500 cursor-pointer" size={16} />
                      <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer" size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Dashboard;
