import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const nav = useNavigate();
  const submit = async (e)=>{ e.preventDefault(); try{ const r = await API.post("/auth/login",{email,password}); localStorage.setItem("token", r.data.token); nav("/vote"); } catch(err){ alert(err?.response?.data?.msg||"Error"); } };
  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mt-2"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 mt-2"/>
      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  )
}
