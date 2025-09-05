import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function VotePage(){
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    API.get("/candidates").then(r => setCandidates(r.data.data)).catch(()=>{});
  },[]);

  const cast = async () => {
    const token = localStorage.getItem("token");
    if(!token){ nav("/login"); return; }
    try{
      await API.post("/vote", { candidateId: selected }, { headers: { Authorization: `Bearer ${token}` }});
      alert("Vote cast successfully");
      nav("/results");
    }catch(err){ alert(err?.response?.data?.msg || "Error"); }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cast your vote</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {candidates.map(c => (
          <div key={c._id} className={`p-4 border rounded ${selected===c._id ? "border-blue-600":""}`}>
            <h3 className="font-semibold">{c.name}</h3>
            <p>{c.party}</p>
            <button onClick={()=>setSelected(c._id)} className="mt-2 bg-gray-100 px-3 py-1 rounded">Select</button>
          </div>
        ))}
      </div>
      <button onClick={cast} disabled={!selected} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">Vote</button>
    </div>
  )
}
