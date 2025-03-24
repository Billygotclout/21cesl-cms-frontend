import React from "react";
import logo from "/assets/logo.svg";

const AuthHeader = () => {
  return (
    <div className="p-5 shadow-md shadow-[#4E4E4E14]">
      <img src={logo} alt="logo" className="ml-20" />
    </div>
  );
};

export default AuthHeader;
