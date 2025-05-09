import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  PencilLine,
  CornerUpLeft,
  CornerUpRight,
  AlignCenter,
  Laptop,
  Columns2,
  MousePointer2,
  Smartphone,
  Tablet,
} from "lucide-react";
import EditorSidebar from "../../../components/Column";

const Editor = () => {
  const [pencilDropdownOpen, setPencilDropdownOpen] = useState(false);
  const [laptopDropdownOpen, setLaptopDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [postVisibility, setPostVisibility] = useState("public");
  const [postPassword, setPostPassword] = useState("");
  const [visibilityButtonPosition, setVisibilityButtonPosition] = useState(null);
  const [publishButtonPosition, setPublishButtonPosition] = useState(null);

  const pencilDropdownRef = useRef(null);
  const laptopDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pencilDropdownRef.current &&
        !pencilDropdownRef.current.contains(event.target)
      ) {
        setPencilDropdownOpen(false);
      }
      if (
        laptopDropdownRef.current &&
        !laptopDropdownRef.current.contains(event.target)
      ) {
        setLaptopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePencilClick = () => {
    setPencilDropdownOpen(!pencilDropdownOpen);
  };

  const handleLaptopClick = () => {
    setLaptopDropdownOpen(!laptopDropdownOpen);
  };

  const handleColumnsClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePencilOptionClick = (option) => {
    console.log(`Selected pencil option: ${option}`);
    setPencilDropdownOpen(false);
  };

  const handleLaptopOptionClick = (option) => {
    console.log(`Selected laptop option: ${option}`);
    setLaptopDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-y-auto">
      <header className="flex items-center justify-between p-0 bg-white z-20 sticky top-0">
        <div className="flex items-center space-x-5">
          <img
            src="https://via.placeholder.com/32"
            alt="Logo"
            className="h-8"
          />
          <button className="p-2 bg-[#1BB8AB] text-white rounded-md hover:bg-teal-600">
            <Plus className="w-5 h-5" />
          </button>
          <div className="relative" ref={pencilDropdownRef}>
            <button
              className={`p-2 text-gray-500 hover:text-gray-700 ${
                pencilDropdownOpen ? "bg-gray-100 rounded-md" : ""
              }`}
              onClick={handlePencilClick}
            >
              <PencilLine className="w-5 h-5" />
            </button>
            {pencilDropdownOpen && (
              <div className="absolute top-full left-12 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-55 z-30">
                <ul className="py-1">
                  <li>
                    <button
                      aria-label="Toggle pencil options"
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-[#1BB8AB] hover:bg-teal-50"
                      onClick={() => handlePencilOptionClick("Edit")}
                    >
                      <PencilLine className="inline-block mr-2" size={20} />
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-[#1BB8AB] hover:bg-teal-50"
                      onClick={() => handlePencilOptionClick("Select")}
                    >
                      <MousePointer2 className="inline-block mr-2" size={20} />
                      Select
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <CornerUpLeft className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <CornerUpRight className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <AlignCenter className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-gray-600 hover:text-gray-800">
            Save draft
          </button>
          <div className="relative" ref={laptopDropdownRef}>
            <button
              className={`p-2 text-gray-500 hover:text-gray-700 ${
                laptopDropdownOpen ? "bg-gray-100 rounded-md" : ""
              }`}
              onClick={handleLaptopClick}
            >
              <Laptop className="w-5 h-5" />
            </button>
            {laptopDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-40 z-30">
                <ul className="py-1">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-[#1BB8AB] hover:bg-teal-50"
                      onClick={() => handleLaptopOptionClick("Desktop")}
                    >
                      <Laptop className="inline-block mr-2" size={20} />
                      Desktop
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-[#1BB8AB] hover:bg-teal-50"
                      onClick={() => handleLaptopOptionClick("Tablet")}
                    >
                      <Tablet className="inline-block mr-2" size={20} />
                      Tablet
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-[#1BB8AB] hover:bg-teal-50"
                      onClick={() => handleLaptopOptionClick("Mobile")}
                    >
                      <Smartphone className="inline-block mr-2" size={20} />
                      Mobile
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button className="p-2 m-4 px-4 text-white bg-[#1BB8AB] rounded-lg">
            Publish
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={handleColumnsClick}
          >
            <Columns2 className="w-5 h-5" />
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <main
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "flex-1 mr-30" : "flex-1"
          }`}
        >
          <div
            className={`mx-auto p-8 ${sidebarOpen ? "max-w-3xl" : "max-w-4xl"}`}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Add title"
                className="w-full text-4xl placeholder-[#1BB8AB] focus:outline-none"
              />
              <div className="mt-4 text-gray-500 flex items-center justify-between">
                <span>Type / to choose a block</span>
                <button className="p-1 bg-[#1BB8AB] text-white rounded-md hover:bg-teal-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
        <EditorSidebar
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-1/4" : "w-0"
          }`}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          postVisibility={postVisibility}
          setPostVisibility={setPostVisibility}
          postPassword={postPassword}
          setPostPassword={setPostPassword}
          visibilityButtonPosition={visibilityButtonPosition}
          setVisibilityButtonPosition={setVisibilityButtonPosition}
          publishButtonPosition={publishButtonPosition}
          setPublishButtonPosition={setPublishButtonPosition}
        />
      </div>
    </div>
  );
};

export default Editor;