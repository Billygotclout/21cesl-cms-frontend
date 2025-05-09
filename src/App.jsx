import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ConfirmOTP from "./pages/Auth/ConfirmOTP";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ServicesLayout from "./pages/ServicesLayout";
import AllServices from "./pages/Auth/services/all";
import PublishedServices from "./pages/Auth/services/published";
import AddServices from "./pages/Auth/services/add";
import AllWebinars from "./pages/Auth/webinars/all";
import WebinarLayout from "./pages/WebinarLayout";
import PublishedWebinars from "./pages/Auth/webinars/Published";
import AllUsers from "./pages/Auth/Users/all";
import UserLayout from "./pages/UserLayout";
import AddUsers from "./pages/Auth/Users/add";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOTP />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<ServicesLayout />}>
          <Route index element={<AllServices />} />
          <Route path="all" element={<AllServices />} />
          <Route path="published" element={<PublishedServices />} />
        </Route>
        <Route path="/services/add" element={<AddServices />} />
        <Route path="/webinars" element={<WebinarLayout />}>
          <Route index element={<AllWebinars />} />
          <Route path="all" element={<AllWebinars />} />
          <Route path="published" element={<PublishedWebinars />} />
        </Route>
        <Route path= "/users" element={<UserLayout />}>
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/all" element={<AllUsers />} />
          <Route path="all" element={<AllUsers />} />
          <Route path="/users/add" element={<AddUsers />} />
         </Route>
      </Routes>
    </>
  );
}

export default App;
