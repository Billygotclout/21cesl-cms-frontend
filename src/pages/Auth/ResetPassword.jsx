import React, { useState } from "react";
import AuthHeader from "../../components/AuthHeader";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="">
      <AuthHeader />

      <div className=" m-auto flex justify-center items-center h-[80vh]">
        <div className=" w-[515px]">
          <div className="space-y-2">
            <h3 className="text-center font-bold text-[#36394A] text-3xl">
              Create New Password
            </h3>
            <p className="text-center text-md text-[#181A20CC]">
              Enter your new password. If you forget it, then you <br /> have to
              do forgot password.
            </p>
          </div>

          <form className="  mt-5">
            <div className="relative pt-3 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full  border border-[#C8C8C8] placeholder-[#A4A4A4]  outline-none p-3 rounded-xl mb-3"
              />
              <span
                className="absolute right-3 top-7 cursor-pointer text-[#A4A4A4]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-[#36394A]" />
                ) : (
                  <Eye size={20} className="text-[#36394A]" />
                )}
              </span>
            </div>
            <div className="relative pt-3 ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full  border border-[#C8C8C8] placeholder-[#A4A4A4]  outline-none p-3 rounded-xl mb-3"
              />
              <span
                className="absolute right-3 top-7 cursor-pointer text-[#A4A4A4]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-[#36394A] text-sm " />
                ) : (
                  <Eye size={20} className="text-[#36394A]" />
                )}
              </span>
            </div>
            <div className="">
              <input
                type="submit"
                value="Continue"
                className="w-full font-medium cursor-pointer bg-[#1BB8AB] p-3 rounded-xl text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
