import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        { email, password }
      )
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem('userId', user.id);
      localStorage.setItem('role',res.data.user.role)
      window.dispatchEvent(new Event('storage'))
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

      alert('Login Successful')
      console.log(res.data.user)
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed')

    }
  }

  return (
    <div className="flex justify-center items-center w-screen bg-gray-100 min-h-screen flex-col px-4 mt-8">
      {/* Header */}
      <div className="my-8 flex flex-col items-center text-center">
        <img src={logo} alt="Voting System Logo" className="w-16 rounded-full mt-6" />
        <h1 className="font-bold text-2xl sm:text-3xl">Sign in to your account</h1>
        <p className="text-gray-600 text-sm mt-2">
          Welcome back to the Voting System
        </p>
      </div>

      {/* Login Form */}
      <div className="flex flex-col bg-white p-6 sm:p-10 rounded-xl hover:shadow-xl shadow-lg w-full max-w-2xl mb-5">
        <h1 className="mb-4 text-xl sm:text-2xl font-bold">Login</h1>
        <hr />
        <div className="flex flex-col gap-4 mt-6">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="text"
            className="bg-slate-100 pl-3 h-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            value={email}
          />

          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            className="bg-slate-100 pl-3 h-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            value={password}
          />

          <button
            className="bg-blue-600 text-white p-3 rounded-xl mt-5 hover:bg-blue-700 transition-all"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center text-sm sm:text-base">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-700 hover:text-blue-900 font-bold"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
