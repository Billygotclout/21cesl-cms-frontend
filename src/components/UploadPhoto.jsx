import React, { useState, useRef } from "react";
import { X, Image, Trash2 } from "lucide-react";

const UploadPhoto = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    setUploadError(null);
    if (!selectedFile) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(selectedFile.type)) {
      setUploadError("Please select a JPG or PNG image");
      return;
    }
    if (selectedFile.size > 120 * 1024 * 1024) {
      setUploadError("File size exceeds the limit of 120MB");
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onUpload(imageUrl); // Pass the image URL to the parent component
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upload</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {/* Drag-and-drop area for file upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-4 flex flex-col items-center justify-center ${
            dragActive ? "border-teal-500 bg-teal-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-teal-500 bg-teal-50 p-4 rounded-full mb-4">
            <Image size={40} />
          </div>
          <p className="text-gray-800 font-medium mb-2">
            Drag & drop your image here or{" "}
            <button
              onClick={handleBrowseClick}
              className="text-teal-500 hover:text-teal-700 font-medium"
            >
              browse
            </button>
          </p>
          <p className="text-gray-400 text-sm mb-1">Maximum upload file size: 120 MB</p>
          <p className="text-gray-400 text-sm">JPG or PNG</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
          />
        </div>

        {uploadError && <div className="text-red-500 text-sm mb-3">{uploadError}</div>}

        {previewUrl && (
          <div className="w-full flex items-center justify-between p-3 bg-white rounded-lg mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-10 w-10 object-cover rounded"
              />
              <div>
                <p className="text-sm text-gray-800 font-medium">{file?.name}</p>
                <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
              }}
              className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}

        {/* Upload button only shows when an image is added */}
        {previewUrl && (
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-lg text-white font-medium bg-teal-500 hover:bg-teal-600"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPhoto;