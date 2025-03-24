import React from "react";
import AuthHeader from "../../components/AuthHeader";

const ForgotPassword = () => {
  return (
    <div className="">
      <AuthHeader />

      <div className=" m-auto flex justify-center items-center h-[80vh]">
        <div className=" w-[515px]">
          <div className="space-y-2">
            <h3 className="text-center font-bold text-[#36394A] text-3xl">
              Forgot Password
            </h3>
            <p className="text-center text-md text-[#181A20CC]">
              Enter your email address. We will send an OTP <br /> code for
              verification in the next step.
            </p>
          </div>

          <form className="  mt-5">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[#C8C8C8] text-[#A4A4A4]  outline-none p-3 rounded-xl mb-3"
              />
            </div>

            <div className="">
              <input
                type="submit"
                value="Send code"
                className="w-full font-medium cursor-pointer bg-[#1BB8AB] p-3 rounded-xl text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
