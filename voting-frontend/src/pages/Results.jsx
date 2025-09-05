import { useEffect, useState } from "react";
import API from "../api";

export default function Results(){
  const [data, setData] = useState({ candidates: [], totalVotes: 0 });
  useEffect(()=> {
    API.get("/results").then(r => setData(r.data.data)).catch(()=>{});
  },[]);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Results</h2>
      <p>Total votes: {data.totalVotes}</p>
      <div className="mt-4">
        {data.candidates.map(c => (
          <div key={c._id} className="border p-3 rounded mb-2">
            <h3 className="font-semibold">{c.name} ({c.party})</h3>
            <p>Votes: {c.votes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
