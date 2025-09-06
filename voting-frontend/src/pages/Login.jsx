import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const navigate = useNavigate()
  const handelLogin = async()=>{
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login',{email,pass})
      const {token,user} =res.data;
      localStorage.setItem('token',token)
      alert('Login Successful')
      navigate('/Home')
    }catch(err){
      alert(err.response.data.msg ||'Login Failed')
    }
  }

  return (
    <div className='flex justify-center items-center w-screen bg-gray-100 min-h-screen'>
      <div className='flex flex-col bg-white p-10 rounded shadow-lg w-8/12'>
        <h1 className='mb-4 text-2xl font-bold'>Login</h1>
        <hr />
        <div className='flex flex-col gap-4 mt-10'>
        <label htmlFor="email">email</label>
        <input type="text" className='bg-slate-100 pl-3 h-12 rounded-xl ' onChange={e=>setEmail(e.target.value)}/>
        <label htmlFor="pass">Password</label>
        <input type="text" className='bg-slate-100 pl-3 h-12 rounded-xl' onChange={e=>setPass(e.target.value)}/>
        <button className='bg-blue-600 text-white p-2 rounded mt-5 hover:bg-blue-700 transition-all' onClick={handelLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
