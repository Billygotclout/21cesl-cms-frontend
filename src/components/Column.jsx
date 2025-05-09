import React, { useState, useRef, useEffect, } from "react";
import ReactDOM from "react-dom";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  X,
  FolderOpen,
  Image,
} from "lucide-react";

// PublishSchedule Component
const PublishSchedule = ({ onClose, position, onScheduleChange }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [time, setTime] = useState({
    hour:
      today.getHours() === 0
        ? "12"
        : today.getHours() > 12
        ? String(today.getHours() - 12).padStart(2, "0")
        : String(today.getHours()).padStart(2, "0"),
    minute: String(today.getMinutes()).padStart(2, "0"),
    period: today.getHours() >= 12 ? "PM" : "AM",
  });
  const [selectedDate, setSelectedDate] = useState(today);
  const [timezone] = useState("WAT+1");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const calendarRef = useRef(null);
  const publishScheduleRef = useRef(null);
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  useEffect(() => {
    const formattedDate = getFormattedDateString();
    if (onScheduleChange) {
      onScheduleChange(formattedDate, selectedDate);
    }
  }, [selectedDate, time]);

  const getFormattedDate = () => {
    return {
      month: months[currentMonth],
      day: String(selectedDate.getDate()).padStart(2, "0"),
      year: String(currentYear),
    };
  };

  const getFormattedDateString = () => {
    const date = getFormattedDate();
    return `${date.month} ${date.day}, ${date.year} at ${time.hour}:${time.minute} ${time.period}`;
  };

  const date = getFormattedDate();

  const handleTimeChange = (field, value) => {
    const newTime = { ...time };
    if (field === "hour") {
      const hourNum = parseInt(value, 10);
      if (isNaN(hourNum) || hourNum < 1 || hourNum > 12) return;
      newTime.hour = String(hourNum).padStart(2, "0");
    } else if (field === "minute") {
      const minuteNum = parseInt(value, 10);
      if (isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) return;
      newTime.minute = String(minuteNum).padStart(2, "0");
    } else if (field === "period") {
      newTime.period = value;
    }
    setTime(newTime);
    const newDate = new Date(selectedDate);
    if (field === "hour" || field === "period") {
      let hour24 = parseInt(newTime.hour, 10);
      if (newTime.period === "PM" && hour24 < 12) {
        hour24 += 12;
      } else if (newTime.period === "AM" && hour24 === 12) {
        hour24 = 0;
      }
      newDate.setHours(hour24);
    } else if (field === "minute") {
      newDate.setMinutes(parseInt(newTime.minute, 10));
    }
    setSelectedDate(newDate);
  };

  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setIsMonthDropdownOpen(false);
  };

  const handleYearSelect = (year) => {
    setCurrentYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setSelectedDate(newDate);
  };

  const handleSetNow = () => {
    const now = new Date();
    setSelectedDate(now);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setTime({
      hour:
        now.getHours() === 0
          ? "12"
          : now.getHours() > 12
          ? String(now.getHours() - 12).padStart(2, "0")
          : String(now.getHours()).padStart(2, "0"),
      minute: String(now.getMinutes()).padStart(2, "0"),
      period: now.getHours() >= 12 ? "PM" : "AM",
    });
  };

  const handleSchedule = () => {
    const formattedDate = getFormattedDateString();
    if (onScheduleChange) {
      onScheduleChange(formattedDate, selectedDate);
    }
    onClose();
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected =
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
      days.push(
        <div
          key={i}
          className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer ${
            isSelected
              ? "bg-teal-500 text-white"
              : "hover:bg-[#1BB8AB] hover:text-white"
          }`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-7 gap-2 mt-4" ref={calendarRef}>
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-xs text-gray-500 text-center font-medium"
          >
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return ReactDOM.createPortal(
    <div
      className="fixed bg-white shadow-lg rounded-md border border-gray-200 p-4 z-50 top-0"
      style={{
        width: "326px",
        maxWidth: "100vw",
        height: "400px",
        maxHeight: "90vh",
        overflowY: "auto",
        top: `${position?.top}px`,
        right: `${position?.right}px`,
      }}
      ref={publishScheduleRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Publish</h3>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-sm font-medium w-16">TIME</span>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={time.hour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            className="w-8 text-center border border-gray-200 rounded-md"
          />
          <span className="text-gray-500">:</span>
          <input
            type="text"
            value={time.minute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            className="w-8 text-center border border-gray-200 rounded-md"
          />
          <div className="flex ml-2">
            <button
              className={`px-2 py-1 text-xs rounded-l ${
                time.period === "AM" ? "bg-teal-500 text-white" : "bg-white"
              }`}
              onClick={() => handleTimeChange("period", "AM")}
            >
              AM
            </button>
            <button
              className={`px-2 py-1 text-xs rounded-r ${
                time.period === "PM" ? "bg-teal-500 text-white" : "bg-white"
              }`}
              onClick={() => handleTimeChange("period", "PM")}
            >
              PM
            </button>
          </div>
          <span className="text-xs text-gray-500 ml-2">{timezone}</span>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium w-16">DATE</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="relative">
          <button
            className="flex items-center justify-between w-32 px-2 py-1 border border-gray-200 rounded-md"
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
          >
            <span>{date.month}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {isMonthDropdownOpen && (
            <div className="absolute z-10 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
              {months.map((month, index) => (
                <button
                  key={month}
                  className={`w-full text-left px-3 py-2 text-sm ${
                    currentMonth === index
                      ? "bg-teal-50 text-teal-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center justify-between w-16 px-2 py-1 border border-gray-200 rounded-md"
            onClick={() => handleDateSelect(selectedDate.getDate())}
          >
            <span>{date.day}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="relative">
          <button
            className="flex items-center justify-between w-24 px-2 py-1 border border-gray-200 rounded-md"
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          >
            <span>{date.year}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {isYearDropdownOpen && (
            <div className="absolute z-10 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(
                (year) => (
                  <button
                    key={year}
                    className={`w-full text-left px-3 py-2 text-sm ${
                      currentYear === year
                        ? "bg-teal-50 text-teal-500"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {months[currentMonth]} {currentYear}
          </span>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {renderCalendar()}
      </div>
      <div className="flex justify-end space-x-2 mt-2">
        <button
          className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50"
          onClick={handleSetNow}
        >
          Now
        </button>
        <button
          className="px-4 py-2 text-sm bg-teal-500 text-white rounded-md hover:bg-teal-600"
          onClick={handleSchedule}
        >
          Schedule
        </button>
      </div>
    </div>,
    document.body
  );
};

// VisibilityOptions Component
const VisibilityOptions = ({
  postVisibility,
  setPostVisibility,
  postPassword,
  setPostPassword,
  onClose,
  position,
}) => {
  const visibilityOptionsRef = useRef(null);

  const handleVisibilityChange = (option) => {
    if (postVisibility === "password" && option !== "password") {
      setPostPassword("");
    }
    setPostVisibility(option);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed bg-white shadow-lg rounded-md border border-gray-200 p-4 z-50"
      style={{
        width: "320px",
        maxWidth: "90vw",
        top: `${position?.top}px`,
        right: `${position?.right}px`,
      }}
      ref={visibilityOptionsRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Visibility</h3>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-4">
          Control how this post is viewed
        </p>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5 mt-1">
              <input
                id="public"
                type="radio"
                name="visibility"
                checked={postVisibility === "public"}
                onChange={() => handleVisibilityChange("public")}
                className="w-4 h-4 text-teal-500 border-gray-300 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="public"
                className="text-sm font-medium text-gray-800"
              >
                Public
              </label>
              <span className="text-xs text-gray-500">Visible to everyone</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5 mt-1">
              <input
                id="private"
                type="radio"
                name="visibility"
                checked={postVisibility === "private"}
                onChange={() => handleVisibilityChange("private")}
                className="w-4 h-4 text-teal-500 border-gray-300 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="private"
                className="text-sm font-medium text-gray-800"
              >
                Private
              </label>
              <span className="text-xs text-gray-500">
                Only visible to site admins and editors
              </span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5 mt-1">
              <input
                id="password-protected"
                type="radio"
                name="visibility"
                checked={postVisibility === "password"}
                onChange={() => handleVisibilityChange("password")}
                className="w-4 h-4 text-teal-500 border-gray-300 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="password-protected"
                className="text-sm font-medium text-gray-800"
              >
                Password protected
              </label>
              <span className="text-xs text-gray-500">
                Only those with the password can view this post
              </span>
              {postVisibility === "password" && (
                <div className="mt-3 w-full">
                  <input
                    type="text"
                    value={postPassword}
                    onChange={(e) => setPostPassword(e.target.value)}
                    placeholder="Use a secure password"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Sidebar Component
const EditorSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  postVisibility,
  setPostVisibility,
  postPassword,
  setPostPassword,
  visibilityButtonPosition,
  setVisibilityButtonPosition,
  publishButtonPosition,
  setPublishButtonPosition,
}) => {
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [featuredImageExpanded, setFeaturedImageExpanded] = useState(false);
  const [featuredIconExpanded, setFeaturedIconExpanded] = useState(false);
  const [visibilityOptionsOpen, setVisibilityOptionsOpen] = useState(false);
  const [publishScheduleOpen, setPublishScheduleOpen] = useState(false);

  const visibilityButtonRef = useRef(null);
  const publishButtonRef = useRef(null);

  const toggleSummaryExpanded = () => {
    setSummaryExpanded(!summaryExpanded);
  };

  const toggleFeaturedImageExpanded = () => {
    setFeaturedImageExpanded(!featuredImageExpanded);
  };

  const toggleFeaturedIconExpanded = () => {
    setFeaturedIconExpanded(!featuredIconExpanded);
  };

  const toggleVisibilityOptions = () => {
    if (!visibilityOptionsOpen) {
      const rect = visibilityButtonRef.current.getBoundingClientRect();
      setVisibilityButtonPosition({
        top: rect.top + window.scrollY,
        right: window.innerWidth - rect.right,
      });
    }
    setVisibilityOptionsOpen(!visibilityOptionsOpen);
  };

  const togglePublishSchedule = () => {
    if (!publishScheduleOpen) {
      const rect = publishButtonRef.current.getBoundingClientRect();
      setPublishButtonPosition({
        top: rect.top + window.scrollY,
        right: window.innerWidth - rect.right,
      });
    }
    setPublishScheduleOpen(!publishScheduleOpen);
  };

  return (
    <div
      className={`fixed top-16 right-0 bottom-0 w-72 bg-white border-l border-gray-200 shadow-md z-10 overflow-y-auto transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2 pb-1">
            <button className="text-[#1BB8AB] font-semibold border-b-2 border-[#1BB8AB] pb-1 mr-5">
              Page
            </button>
            <button className="text-gray-500 font-semibold pb-1">Block</button>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4 pb-4">
          <div className="border-b border-gray-100 pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleSummaryExpanded}
            >
              <h3 className="text-sm font-semibold text-gray-700">Summary</h3>
              {summaryExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {summaryExpanded && (
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Visibility</span>
                  <button
                    ref={visibilityButtonRef}
                    className="text-sm text-[#1BB8AB]"
                    onClick={toggleVisibilityOptions}
                  >
                    {postVisibility === "public"
                      ? "Public"
                      : postVisibility === "private"
                      ? "Private"
                      : "Password protected"}
                  </button>
                </div>
                {visibilityOptionsOpen && (
                  <VisibilityOptions
                    postVisibility={postVisibility}
                    setPostVisibility={setPostVisibility}
                    postPassword={postPassword}
                    setPostPassword={setPostPassword}
                    onClose={() => setVisibilityOptionsOpen(false)}
                    position={visibilityButtonPosition}
                  />
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Publish</span>
                  <button
                    ref={publishButtonRef}
                    className="text-sm text-[#1BB8AB]"
                    onClick={togglePublishSchedule}
                  >
                    Immediately
                  </button>
                </div>
                {publishScheduleOpen && (
                  <PublishSchedule
                    onClose={togglePublishSchedule}
                    position={publishButtonPosition}
                    onSchedule={(formattedDate, selectedDate) => {
                      console.log("Scheduled for:", formattedDate, selectedDate);
                    }}
                  />
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">URL</span>
                  <span className="text-sm text-[#1BB8AB] truncate max-w-32">
                    21st.quoruminteractive...
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Author</span>
                </div>
                <div className="flex items-center justify-between border border-gray-100 rounded-md p-2 mt-2">
                  <span className="text-sm text-gray-600 mr-2">admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
                <div className="mt-4">
                  <button className="w-full text-center py-2 text-gray-500 border border-gray-200 rounded-md hover:bg-gray-50">
                    Switch to draft
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleFeaturedImageExpanded}
            >
              <h3 className="text-sm font-semibold text-gray-700">
                Featured image
              </h3>
              {featuredImageExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {featuredImageExpanded && (
              <div className="mt-4">
                <div className="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center">
                  <div className="mb-2">
                    <Image className="h-6 w-6 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-700">
                    Set featured image
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleFeaturedIconExpanded}
            >
              <h3 className="text-sm font-semibold text-gray-700">
                Featured icon
              </h3>
              {featuredIconExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {featuredIconExpanded && (
              <div className="mt-4">
                <div className="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center">
                  <div className="mb-2">
                    <FolderOpen className="h-6 w-6 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-700">
                    Set featured icon
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;