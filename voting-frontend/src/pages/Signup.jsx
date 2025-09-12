import axios from 'axios';
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData
      );
      console.log("data:", res.data);
      alert(res.data.message);
      navigate('/login')
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen bg-gray-100 min-h-screen flex-col px-4">
      {/* Header */}
      <div className="my-8 flex flex-col items-center text-center mt-20">
        <img src={logo} alt="Voting System Logo" className="w-16 rounded-full mt-6" />
        <h1 className="font-bold text-2xl sm:text-3xl">Create your account</h1>
        <p className="text-gray-600 text-sm mt-2">Join the Voting System today</p>
      </div>

      {/* Signup Form */}
      <div className="flex flex-col bg-white p-6 sm:p-10 rounded-xl hover:shadow-xl shadow-lg w-full max-w-2xl mb-6 ">
        <h1 className="mb-4 text-xl sm:text-2xl font-bold">Sign Up</h1>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-slate-100 pl-3 h-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            placeholder="Enter your name"
            value={formData.name}
          />

          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-slate-100 pl-3 h-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            placeholder="Enter your email"
            value={formData.email}
          />

          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="bg-slate-100 pl-3 h-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            placeholder="Enter your password"
            value={formData.password}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-xl mt-5 hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
