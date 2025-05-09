import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam"; // Import react-webcam (ensure it's installed)
import DashBoardLayout from "../components/DashBoardLayout";
import { ArrowLeft, ImagePlus, UserRound, BadgeCheck, Eye, EyeOff, TriangleAlert, Camera, Image, Camera as CameraIcon } from "lucide-react";
import UploadPhoto from "../components/UploadPhoto";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("detail");
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [bio, setBio] = useState("");
  const [bioUpdated, setBioUpdated] = useState(false);
  const [detailUpdated, setDetailUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showTakePhotoModal, setShowTakePhotoModal] = useState(false);
  const [showConfirmPhotoModal, setShowConfirmPhotoModal] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const navigate = useNavigate();

  const handlePhotoUpload = (imageUrl) => {
    setSelectedPhoto(imageUrl);
    setShowUploadModal(false);
  };

  const handlePasswordUpdate = () => {
    const correctPassword = "123456";
    if (currentPassword !== correctPassword) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1000);
    } else {
      setPasswordUpdated(true);
      setTimeout(() => setPasswordUpdated(false), 1000);
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== "bio") setBioUpdated(false);
    if (tab !== "detail") setDetailUpdated(false);
    if (tab !== "password") setPasswordUpdated(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    console.log("Updated profile data:", formData);
    setDetailUpdated(true);
    setTimeout(() => setDetailUpdated(false), 1000);
  };

  const handleBioUpdate = () => {
    console.log("Updated bio:", bio);
    setBioUpdated(true);
    setTimeout(() => setBioUpdated(false), 1000);
  };

  const togglePhotoModal = () => {
    setShowPhotoModal(!showPhotoModal);
  };

  // "Take a photo" Modal (Before Photo) with Webcam
  const TakePhotoModal = () => {
    const modalRef = useRef(null);
    const webcamRef = useRef(null); // Ref for the Webcam component

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowTakePhotoModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    if (!showTakePhotoModal) return null;

    const handleTakePhoto = () => {
      // Capture the photo from the webcam
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedPhoto(imageSrc); // Store the captured photo
        setShowTakePhotoModal(false);
        setShowConfirmPhotoModal(true);
      } else {
        console.error("Failed to capture photo. Ensure webcam is enabled.");
      }
    };

    // Webcam video constraints
    const videoConstraints = {
      width: 192,
      height: 192,
      facingMode: "user", // Use front-facing camera
    };

    return (
      <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setShowTakePhotoModal(false)}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Take a photo</h2>
          </div>
          <p className="text-gray-600 mb-6">Looking good! Take a photo when you're ready</p>
          {/* Webcam feed */}
          <div className="w-48 h-48 rounded-full bg-black flex items-center justify-center mx-auto mb-6 overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleTakePhoto}
              className="p-4 bg-teal-500 rounded-full text-white hover:bg-teal-600"
            >
              <CameraIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // "Confirm photo" Modal (After Photo)
  const ConfirmPhotoModal = () => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowConfirmPhotoModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    if (!showConfirmPhotoModal) return null;

    const handleConfirmPhoto = () => {
      setSelectedPhoto(capturedPhoto);
      setShowConfirmPhotoModal(false);
    };

    const handleRetakePhoto = () => {
      setShowConfirmPhotoModal(false);
      setShowTakePhotoModal(true);
    };

    return (
      <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setShowConfirmPhotoModal(false)}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Upload photo</h2>
          </div>
          <p className="text-gray-600 mb-6">Looking good! You can upload it now</p>
          <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden">
            <img
              src={capturedPhoto}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirmPhoto}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600"
            >
              Confirm photo
            </button>
            <button
              onClick={handleRetakePhoto}
              className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200"
            >
              Retake photo
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PhotoModal = () => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowPhotoModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    if (!showPhotoModal) return null;

    return (
      <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-xl p-6 w-96 max-w-md">
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-3 p-4 w-full text-gray-700 hover:bg-teal-50 hover:text-teal-500 rounded-lg transition"
              onClick={() => {
                console.log("Choose photo selected");
                setShowUploadModal(true);
                setShowPhotoModal(false);
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Image size={24} />
              </div>
              <span className="text-lg font-medium">Choose photo</span>
            </button>

            <button
              className="flex items-center gap-3 p-4 w-full text-gray-700 hover:bg-teal-50 hover:text-teal-500 rounded-lg transition"
              onClick={() => {
                console.log("Take photo selected");
                setShowPhotoModal(false);
                setShowTakePhotoModal(true);
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Camera size={24} />
              </div>
              <span className="text-lg font-medium">Take photo</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashBoardLayout>
      <div className=" max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate("/")} className="text-gray-500 mr-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="flex">
            <button
              className={`pb-3 px-4 font-medium text-sm ${
                activeTab === "detail"
                  ? "text-[#1BB8AB] border-b-2 border-[#1BB8AB]"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("detail")}
            >
              My detail
            </button>
            <button
              className={`pb-3 px-4 font-medium text-sm ${
                activeTab === "bio"
                  ? "text-[#1BB8AB] border-b-2 border-[#1BB8AB]"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("bio")}
            >
              Biographical info
            </button>
            <button
              className={`pb-3 px-4 font-medium text-sm ${
                activeTab === "password"
                  ? "text-[#1BB8AB] border-b-2 border-[#1BB8AB]"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("password")}
            >
              Password
            </button>
          </nav>
        </div>

        {activeTab === "detail" && (
          <div className="mb-8 border-gray-100 rounded-lg p-6 shadow-sm bg-white">
            {detailUpdated && (
              <div className="mb-3 flex justify-center items-center">
                <div className="absolute top-25 mt-2 mr-4 flex items-center gap-2 px-4 py-2 border border-[#1BB8AB] bg-[#f8fefe] text-[#1BB8AB] rounded-xl text-sm font-md shadow-sm z-10">
                  <BadgeCheck size={16} className="text-[#1BB8AB]" />
                  Basic details successfully updated
                </div>
              </div>
            )}

            <h2 className="text-xl font-medium text-gray-800 mb-6">Basic details</h2>

            <div className="flex items-center mb-8">
              <div className="relative">
                {selectedPhoto ? (
                  <img
                    src={selectedPhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-teal-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserRound size={48} className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="ml-6">
                <button
                  className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm text-gray-600"
                  onClick={togglePhotoModal}
                >
                  <ImagePlus size={18} className="mr-2" />
                  {selectedPhoto ? "Change photo" : "Add photo"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Email address"
                  readOnly
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleUpdate}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUpdate();
                }}
                className="bg-[#1BB8AB] text-white mt-8 px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {activeTab === "bio" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {bioUpdated && (
              <div className="mb-3 flex justify-center items-center">
                <div className="absolute top-25 mt-2 mr-4 flex items-center gap-2 px-4 py-2 border border-[#1BB8AB] bg-[#f8fefe] text-[#1BB8AB] rounded-xl text-sm font-md shadow-sm z-10">
                  <BadgeCheck size={16} className="text-[#1BB8AB]" />
                  Bio successfully updated
                </div>
              </div>
            )}

            <h2 className="text-lg font-semibold text-gray-800 mb-4">About yourself</h2>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write about yourself"
              className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1BB8AB] mb-6"
            />

            <button
              onClick={handleBioUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate();
              }}
              className="bg-[#1BB8AB] text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              Update
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {passwordError && (
              <div className="mb-3 flex justify-center items-center">
                <div className="absolute top-25 mt-2 mr-4 flex items-center gap-2 px-4 py-2 border border-red-500 bg-red-50 text-red-500 rounded-xl text-sm font-md shadow-sm z-10">
                  <TriangleAlert size={16} className="text-red-500" />
                  Incorrect password, try again
                </div>
              </div>
            )}

            {passwordUpdated && (
              <div className="mb-3 flex justify-center items-center">
                <div className="absolute top-25 mt-2 mr-4 flex items-center gap-2 px-4 py-2 border border-[#1BB8AB] bg-[#f8fefe] text-[#1BB8AB] rounded-xl text-sm font-md shadow-sm z-10">
                  <BadgeCheck size={16} className="text-[#1BB8AB]" />
                  Password successfully updated
                </div>
              </div>
            )}

            <h2 className="text-lg font-semibold text-gray-800 mb-6">Password management</h2>

            <div className="space-y-4 max-w-lg">
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1BB8AB]"
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1BB8AB]"
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handlePasswordUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate();
              }}
              className="bg-[#1BB8AB] text-white mt-6 px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              Update
            </button>
          </div>
        )}

        <PhotoModal />
        {showUploadModal && (
          <UploadPhoto
            onClose={() => setShowUploadModal(false)}
            onUpload={handlePhotoUpload}
          />
        )}
        <TakePhotoModal />
        <ConfirmPhotoModal />
      </div>
    </DashBoardLayout>
  );
};

export default Profile;