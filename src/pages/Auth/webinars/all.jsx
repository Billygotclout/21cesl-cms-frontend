import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  PencilLine,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
} from "lucide-react";
import Webinar from "../../WebinarLayout";

const DeleteWebinarModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <Trash2 className="text-red-500" size={24} />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Delete webinar
            </h3>
            <p className="text-gray-500">
              Are you sure you want to delete this webinar?
            </p>
          </div>
        </div>
        <div className="flex items-center rounded-full border-gray-100 mx-4 my-2 p-2">
          <button
            onClick={onClose}
            className="py-3 px-7 text-center text-gray-600 font-medium hover:bg-gray-50 transition-colors border border-gray-200 rounded-full"
          >
            Cancel
          </button>
          <div className="ml-auto">
            <button
              onClick={onConfirm}
              className="py-3 px-7 text-center text-white font-medium bg-red-400 hover:bg-red-500 transition-colors rounded-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WebinarPage = () => {
  const navigate = useNavigate();
  const allWebinars = [
    {
      id: 1,
      title: "Hello guys!",
      author: "Admin",
      date: "19/03/2024",
      published: true,
    },
    {
      id: 2,
      title: "Hello guys!",
      author: "Admin",
      date: "19/03/2024",
      published: false,
    },
    {
      id: 3,
      title: "Hello guys!",
      author: "Admin",
      date: "19/03/2024",
      published: true,
    },
    {
      id: 4,
      title: "Hello guys!",
      author: "Admin",
      date: "19/03/2024",
      published: false,
    },
    {
      id: 5,
      title: "Hello guys!",
      author: "Admin",
      date: "19/03/2024",
      published: true,
    },
    {
      id: 6,
      title: "Hello guys!",
      author: "Admin",
      date: "19/03/2024",
      published: true,
    },
  ];

  const [selectedWebinars, setSelectedWebinars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [webinarToDelete, setWebinarToDelete] = useState(null);
  const totalPages = 6;

  const toggleSelect = (id) => {
    if (selectedWebinars.includes(id)) {
      setSelectedWebinars(
        selectedWebinars.filter((webinarId) => webinarId !== id)
      );
    } else {
      setSelectedWebinars([...selectedWebinars, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedWebinars.length === allWebinars.length) {
      setSelectedWebinars([]);
    } else {
      setSelectedWebinars(allWebinars.map((webinar) => webinar.id));
    }
  };

  const handleDeleteClick = (webinar) => {
    setWebinarToDelete(webinar);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting webinar: ${webinarToDelete.title}`);
    setDeleteModalOpen(false);
    setWebinarToDelete(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Webinar</h1>
          <div className="flex mt-4">
            <button
              onClick={() => navigate("/webinars")}
              className="pb-2 px-4 text-[#1BB8AB] border-b-2 border-[#1BB8AB]"
            >
              All
            </button>
            <button
              onClick={() => navigate("/webinars/published")}
              className="pb-2 px-4 text-gray-500"
            >
              Published
            </button>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-teal-50 text-[#1BB8AB] border border-[#1BB8AB] rounded-xl px-4 py-2 hover:bg-blue-50 transition-colors duration-200">
          <Plus size={16} />
          <span>Add new webinar</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">All webinars</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              color="#1BB8AB"
              size={18}
            />
            <input
              type="text"
              placeholder="Search for webinar"
              className="pl-10 pr-4 py-2 border border-gray-50 rounded-full focus:outline-none focus:ring-1 focus:ring-[#1BB8AB] w-64"
            />
          </div>
          <div className="relative inline-block">
            <button className="flex items-center border border-gray-50 rounded-lg px-4 py-2 bg-white text-gray-700">
              <CalendarDays size={16} className="mr-2" color="#1BB8AB" />
              <select>
                <option>Last 7 Day</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6 flex-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50 text-[#b5b4b4]">
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedWebinars.length === allWebinars.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allWebinars.map((webinar) => (
                <tr
                  key={webinar.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedWebinars.includes(webinar.id)}
                      onChange={() => toggleSelect(webinar.id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800">{webinar.title}</td>
                  <td className="px-6 py-4 text-gray-800">{webinar.author}</td>
                  <td className="px-6 py-4 text-gray-800">{webinar.date}</td>
                  <td className="px-6 py-4">
                    <button className="bg-teal-50 text-[#1BB8AB] px-3 py-1 rounded hover:bg-teal-100 font-medium flex items-center gap-1">
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1">
                        <PencilLine
                          className="text-gray-500 cursor-pointer"
                          size={16}
                        />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-red-500"
                        onClick={() => handleDeleteClick(webinar)}
                      >
                        <Trash2
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          size={16}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-auto">
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === page
                ? "bg-[#1BB8AB] text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <DeleteWebinarModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        webinarName={webinarToDelete?.title}
      />
    </div>
  );
};

export default WebinarPage;