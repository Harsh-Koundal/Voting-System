import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect } from 'react';
const NavBar = () => {
  const [isLogin, setIsLogin] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [role , setRole] = useState('user')
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if (user) {
      setRole(user.role)
    }
  }, [user]) 
  // console.log(role)

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token')
      setIsLogin(!!token)
    }
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin)
    }
  }, [])
  const handelLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLogin(false)
    window.location.href = '/'
  }

  return (
    <nav className="flex justify-between items-center p-3 fixed top-0 w-full shadow bg-white z-50">
      {/* Logo */}
      <div className="flex gap-3 items-center">
        <a href="/" className='flex
        gap-3 items-center'>
          <img src={logo} alt="logo" className="w-16 rounded-full sm:w-12" /><h1 className="text-2xl font-bold sm:text-lg">Voting System</h1>
        </a>

      </div>

      {/* Hamburger Icon */}
      <div className="sm:hidden">
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Menu */}
      <ul
        className={`
          flex flex-col sm:flex-row sm:gap-10 gap-5
          absolute sm:static top-16 right-3 bg-white p-6 rounded shadow-lg sm:shadow-none
          overflow-hidden transition-all duration-300
          ${menuOpen ? 'block' : 'hidden'} sm:flex
        `}
      >
        <li><a href="/">Home</a></li>
        <li><a href="/vote">Elections</a></li>
        <li><a href="/results">Results</a></li>
        <li>
          <a href={role !== "admin" ? "/profile" : "/admin-dashboard"}>
            {role !== "admin" ? "Profile" : "Admin Dashboard"}
          </a>
        </li>

        {!isLogin ? (<li><a href="/login">Sign in</a></li>
        ) : (
          <li>
            <button onClick={handelLogout} className='text-red-600 font-semibold hover:underline'>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
