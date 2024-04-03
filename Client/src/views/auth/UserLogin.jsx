import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserLogin = () => {
  const URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${URL}/user/loginUser`, data);
      console.log(response);
      if (response.status === 200) {
        const {token, admin} = response.data;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userID', admin.AdminID);
        localStorage.setItem('Name', admin.Name);

        console.log(token, admin.AdminID, admin.Name);
        
        toast.success("Login Successful!");
        setTimeout(() => {
            window.location.href = "/add-product";
            }, 500);
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Teebay
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form onSubmit={handleUserLogin} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <a href="/user/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
              </p>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
