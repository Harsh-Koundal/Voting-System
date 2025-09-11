import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'


const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()
  const handelLogin = async()=>{
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,{email,password})
      const {token,user} =res.data;
      localStorage.setItem('token',token)
      window.dispatchEvent(new Event("storage"));
      alert('Login Successful')
      console.log(res.data)
      navigate('/')
    }catch(err){
      alert(err.response.data.msg ||'Login Failed')
    }
  }

  return (
    <div className='flex justify-center items-center w-screen bg-gray-100 min-h-screen flex-col'>
      <div className='my-10 flex flex-col items-center '>
        <img src={logo} alt=""className='w-16 rounded-full mt-10' />
        <h1 className='font-bold text-3xl'>Sign in to your account</h1>
        <p className='text-gray-600 text-sm mt-2'>Welcome back to the Voting System</p>
      </div>
      <div className='flex flex-col bg-white p-10 rounded-xl hover:shadow-xl shadow-lg w-8/12'>
        <h1 className='mb-4 text-2xl font-bold'>Login</h1>
        <hr />
        <div className='flex flex-col gap-4 mt-10'>
        <label htmlFor="email"><b>Email</b></label>
        <input type="text" className='bg-slate-100 pl-3 h-12 rounded-xl ' onChange={e=>setEmail(e.target.value)} placeholder='Enter your email'/>
        <label htmlFor="pass"><b>Password</b></label>
        <input type="password" className='bg-slate-100 pl-3 h-12 rounded-xl' onChange={e=>setPassword(e.target.value)} placeholder='Enter your password'/>
        <button className='bg-blue-600 text-white p-2 rounded-xl mt-5 hover:bg-blue-700 transition-all' onClick={handelLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
