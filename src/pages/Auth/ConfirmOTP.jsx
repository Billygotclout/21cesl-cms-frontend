import React, { useState, useRef } from "react";
import AuthHeader from "../../components/AuthHeader";

const ConfirmOTP = () => {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="">
      <AuthHeader />

      <div className="m-auto flex justify-center items-center h-[80vh]">
        <div className="w-[515px]">
          <div className="space-y-2">
            <h3 className="text-center font-bold text-[#36394A] text-3xl">
              You’ve got mail
            </h3>
            <p className="text-center text-md text-[#181A20CC]">
              We have sent the OTP verification code to your email address.
              <br />
              Check your email and enter the code below.
            </p>
          </div>

          <form className="mt-5">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-20 h-20 text-center text-xl border border-[#EFEFEF] rounded-xl focus:outline-none "
                />
              ))}
            </div>
            <div className="py-3 flex flex-col justify-center">
              <h3 className="text-[#36394A] text-md text-center">
                Didn't receive email?
              </h3>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={timer > 0}
                className={`text-center font-medium ${
                  timer > 0 ? "" : " cursor-pointer text-[#1BB8AB]"
                }`}
              >
                {timer > 0 ? (
                  <span className="font-normal">
                    You can resend in{" "}
                    <span className="text-[#1BB8AB] ">{timer}</span> s
                  </span>
                ) : (
                  "Resend code"
                )}
              </button>
            </div>
            <input
              type="submit"
              value="Verify"
              className="w-full mt-4 font-medium cursor-pointer bg-[#1BB8AB] p-3 rounded-xl text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOTP;
