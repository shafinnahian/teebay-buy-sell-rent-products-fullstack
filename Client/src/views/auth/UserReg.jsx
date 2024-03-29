import React, { useState } from "react";
// import { apiURL } from "../../ApiUrlAndToken";
import axios from "axios";
import { toast } from "react-toastify";

const UserReg = () => {
    // console.log(apiURL)

    const URL = import.meta.env.RREACT_APP_API_BASE_URL || 'http://localhost:4000';
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const UserReg = async (e) => {
        e.preventDefault();
        try {
        const data = {
            name: name,
            email: email,
            password: password,
        };
        const response = await axios.post(`${URL}/user/registerUser`, data);
        // console.log(response.status);
        if (response.status === 201) {
            toast.success("Admin Registration Done Successfully!!!");
            setTimeout(() => {
            window.location.href = "/";
            }, 500);
        } else if (response.status === 409) {
            toast.error("Admin Already exists");
        }
        } catch (error) {
        toast.error("Admin already exists");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <form onSubmit={UserReg} className="space-y-4">
            <h1 className="text-2xl font-semibold">User Registration</h1>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
            type="submit"
            disabled={!name || !email || !password}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${!name || !email || !password ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
            Register
            </button>
        </form>
        </div>
    );
};

export default UserReg;