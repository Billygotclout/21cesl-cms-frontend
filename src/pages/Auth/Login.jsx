import React, { useState } from "react";
import AuthHeader from "../../components/AuthHeader";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="">
      <AuthHeader />

      <div className=" m-auto flex justify-center items-center h-[80vh]">
        <div className="shadow-md  shadow-[#33333314]  rounded-[20px]  w-[530px]">
          <h3 className="text-center border-b  pt-5 border-b-[#ECECEC] py-3 text-[#5A5A5A] text-lg font-medium">
            Log in to your account
          </h3>
          <form className="p-3  mt-5">
            <h3 className="font-bold text-[#36394A] text-2xl mb-5">
              Welcome Back
            </h3>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[#C8C8C8] text-[#A4A4A4]  outline-none p-3 rounded-xl mb-3"
              />
            </div>
            <div className="relative pt-3 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full  border border-[#C8C8C8] text-[#A4A4A4]  outline-none p-3 rounded-xl mb-3"
              />
              <span
                className="absolute right-3 top-6 cursor-pointer text-[#A4A4A4]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-[#36394A]" />
                ) : (
                  <Eye className="text-[#36394A]" />
                )}
              </span>
            </div>
            <div className="flex justify-end pb-2">
              <a href="#" className="text-[#36394A] font-medium text-sm ">
                Forgot Password?
              </a>
            </div>
            <div className="py-5">
              <input
                type="submit"
                value="Log In"
                className="w-full font-medium cursor-pointer bg-[#1BB8AB] p-3 rounded-xl text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
