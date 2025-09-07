import { useState, useEffect } from "react";
import API from "../api";

export default function Admin() {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [candidates, setCandidates] = useState([]);
  const token = localStorage.getItem("token");

  const loadCandidates = async () => {
    const r = await API.get("/candidates");
    setCandidates(r.data.data);
  };

  useEffect(() => {
    loadCandidates();  // no async return problem
  }, []);

  const add = async () => {
    try {
      await API.post(
        "/admin/candidates",
        { name, party },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Created");
      loadCandidates();
    } catch (e) {
      alert(e?.response?.data?.msg || "Error");
    }
  };

  const toggleElection = async (open) => {
    try {
      await API.put(
        "/admin/election",
        { isOpen: open },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Updated election");
    } catch (e) {
      alert("Error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <div className="mt-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Candidate name"
          className="p-2 border mr-2"
        />
        <input
          value={party}
          onChange={(e) => setParty(e.target.value)}
          placeholder="Party"
          className="p-2 border mr-2"
        />
        <button
          onClick={add}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => toggleElection(true)}
          className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
        >
          Open Election
        </button>
        <button
          onClick={() => toggleElection(false)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Close Election
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Candidates</h3>
        <ul>
          {candidates.map((c) => (
            <li key={c._id}>
              {c.name} — {c.party} — votes: {c.votes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
