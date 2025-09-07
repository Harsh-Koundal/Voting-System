import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Home(){
  const [candidates, setCandidates] = useState([]);
  useEffect(()=> {
    API.get("/candidates").then(r => setCandidates(r.data.data)).catch(()=>{});
  },[]);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Voting App</h1>
      <p>
        <Link to="/vote" className="text-blue-600">Go to Vote</Link> • <Link to="/results" className="text-blue-600">Results</Link> • <Link to="/admin" className="text-blue-600">Admin</Link>
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map(c => (
          <div key={c._id} className="border p-4 rounded">
            <h3 className="font-semibold">{c.name}</h3>
            <p>{c.party}</p>
            <p>Votes: {c.votes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
