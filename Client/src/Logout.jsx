import React from "react";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const handleLogout = () => {
    toast.success("Logout Successful!");
    setTimeout(() => {
      window.location.href = "/"; // Redirect to homepage after logout
    }, 500);
  };

  return (
    <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none">
      Logout
    </button>
  );
};

export default LogoutButton;