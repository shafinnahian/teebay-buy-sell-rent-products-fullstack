import React from "react";
import LogoutButton from "./Logout";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col gap-3 w-max text-center h-screen fixed left-0 top-0 bottom-0 justify-center">
      <Link
        to="/my-product"
        className="text-white hover:scale-y-110 transition-transform duration-150 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        My Product
      </Link>

      <Link
        to="/add-product"
        className="text-white hover:scale-y-110 transition-transform duration-150 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Product
      </Link>

      <Link
        to="/all-product"
        className="text-white hover:scale-y-110 transition-transform duration-150 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        All Product
      </Link>

      <Link
        to="/history"
        className="text-white hover:scale-y-110 transition-transform duration-150 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        History
      </Link>

      <LogoutButton />
    </div>
  );
};

export default Navbar;
