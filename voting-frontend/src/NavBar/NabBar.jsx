import React from 'react'
import logo from '../assets/logo.png'
const NabBar = () => {

  const [isLogin, setIsLogin] = React.useState(false);
  return (

      <nav className='flex gap-30 justify-between items-center p-3 fixed top-0 w-full shadow bg-white z-50'>
        <div className='flex gap-3 items-center'>
        <a href="/"><img src={logo} alt="logo" className='w-16 rounded-full sm:w-12'/></a>
        <h1 className='text-2xl font-bold sm:text-lg'>Voting System</h1>
        </div>
        <ul className='flex gap-10 mx-10'>
            <li><a href="/">Home</a></li>
            <li><a href="/">Elections</a></li>
            <li><a href="/">Results</a></li>
            <li><a href="/">Profile</a></li>
            {!isLogin && <li><a href="/login">Log in</a></li> }
        </ul>
      </nav>
  )
}

export default NabBar
