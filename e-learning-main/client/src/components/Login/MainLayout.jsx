// MainLayout.js
import React from "react";
import backgroundImage from "../Assets/bg.jpeg";

function MainLayout({ children }) {
  return (
    <div
      className="text-white h-screen flex justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}

export default MainLayout;
