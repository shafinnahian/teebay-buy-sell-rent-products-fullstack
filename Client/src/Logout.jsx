import React from "react";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("Name");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white hover:scale-y-110 transition-transform duration-150 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      style={{ float: "right" }} // Style to float the button to the right
    >
      Logout
    </button>
  );
};

export default LogoutButton;