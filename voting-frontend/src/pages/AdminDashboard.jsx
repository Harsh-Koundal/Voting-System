import React, { useState, useEffect } from "react";
import { BarChart2, Calendar, Users, Activity, Vote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [elections, setElections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [user, setUser] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    candidates: [],
    status: "open",
    startsAt: "",
    endsAt: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const handelEditUser = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    setCurrentId(user._id);
    setShowUserForm(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections`);
        setElections(res.data || []);
        // console.log(res.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUser(res.data)
        console.log("1", res.data)
      } catch (error) {
        console.error("error:", error)
      }
    }
    fetchData()
  }, [])

  const info = [
    { title: "Total Elections", icon: Calendar, total: elections.length },
    { title: "Active Elections", icon: Activity, total: elections.filter((e) => e.isOpen).length },
    { title: "Total Votes", icon: Vote, total: elections.reduce((sum, e) => sum + (e.votesCast || 0), 0) },
  ];

  const recentElection = elections.map((election) => ({
    title: election.name,
    candidates: `${election.candidates?.length || 0} candidates`,
    totalV: `${election.votesCast || 0} votes`,
    status: election.isOpen ? "open" : "closed",
    period: `${new Date(election.startsAt).toLocaleDateString()} - ${new Date(election.endsAt).toLocaleDateString()}`,
  }));


  const handleCreate = async () => {
    try {
      const payload = {
        ...formData,
        candidates: formData.candidates.map((c) => c.trim()),
        isOpen: formData.status === "open",
      };
      delete payload.status;

      if (isEditing) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/elections/${currentId}`, payload);
        setElections((prev) => prev.map((e) => (e._id === currentId ? res.data : e)));
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/elections`, payload);
        setElections((prev) => [...prev, res.data]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/elections/${id}`);
      setElections((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
      setUser((prev) => prev.filter((e) => e._id !== id))
    } catch (error) {
      console.error("error", error)
    }
  }

  const handleEdit = (election) => {
    setFormData({
      name: election.name,
      description: election.description || "",
      candidates: election.candidates || [],
      status: election.isOpen ? "open" : "closed",
      startsAt: election.startsAt ? election.startsAt.slice(0, 16) : "",
      endsAt: election.endsAt ? election.endsAt.slice(0, 16) : "",
    });
    setIsEditing(true);
    setCurrentId(election._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      candidates: [],
      status: "open",
      startsAt: "",
      endsAt: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleChange = (e, index) => {
    if (e.target.name === "candidates" && typeof index === "number") {
      const updated = [...formData.candidates];
      updated[index] = e.target.value;
      setFormData({ ...formData, candidates: updated });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addCandidate = () => {
    setFormData({ ...formData, candidates: [...formData.candidates, ""] });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="flex flex-col w-full">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {info.map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full">
                  <item.icon size={32} className="text-blue-500 mb-2" />
                  <p className="font-semibold text-gray-700 text-center">{item.title}</p>
                  <p className="text-xl font-bold">{item.total}</p>
                </div>
              ))}
            </div>

            {/* Recent Elections */}
            <div className="flex flex-col shadow-md rounded-md p-5 mt-6 w-full">
              <h2 className="text-xl font-bold">Recent Elections</h2>
              <p className="text-gray-500 text-sm">Latest election activity and status</p>

              {recentElection.map((items, i) => (
                <div key={i} className="border rounded-md p-4 mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <h2 className="font-semibold text-lg">{items.title}</h2>
                    <p className="text-gray-500 text-sm">{items.candidates}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-medium text-sm ${items.status === "open"
                        ? "bg-green-400"
                        : items.status === "closed"
                          ? "bg-red-500"
                          : "bg-indigo-400"
                        }`}
                    >
                      {items.status}
                    </span>
                    <p className="font-semibold text-sm">{items.totalV}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "elections":
        return (
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h1 className="text-xl font-bold">Manage Elections</h1>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => setShowForm(!showForm)}
              >
                + Create Election
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <div className="mb-6 border p-4 rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">{isEditing ? "Edit Election" : "New Election"}</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Election Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mb-3 p-2 border rounded"
                />

                <textarea
                  name="description"
                  placeholder="Election Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mb-3 p-2 border rounded"
                />

                {/* Candidates */}
                <h3 className="font-medium mb-2">Candidates</h3>
                {formData.candidates.map((candidate, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Candidate ${index + 1}`}
                    value={candidate}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full mb-2 p-2 border rounded"
                    name="candidates"
                  />
                ))}
                <button
                  type="button"
                  onClick={addCandidate}
                  className="px-3 py-1 bg-gray-300 rounded-md text-sm mb-3"
                >
                  + Add Candidate
                </button>

                {/* Status */}
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full mb-3 p-2 border rounded"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="datetime-local"
                    name="startsAt"
                    value={formData.startsAt}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="datetime-local"
                    name="endsAt"
                    value={formData.endsAt}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                </div>

                <button
                  onClick={handleCreate}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b">Election</th>
                    <th className="px-4 py-2 border-b">Candidates</th>
                    <th className="px-4 py-2 border-b">Votes</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Period</th>
                    <th className="px-4 py-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {elections.map((election) => (
                    <tr key={election._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{election.name}</td>
                      <td className="px-4 py-2 border-b">{election.candidates.length}</td>
                      <td className="px-4 py-2 border-b">{election.votesCast || 0}</td>
                      <td className="px-4 py-2 border-b">
                        <span
                          className={`px-3 py-1 text-xs rounded-full text-white ${election.isOpen ? "bg-green-500" : "bg-red-500"
                            }`}
                        >
                          {election.isOpen ? "open" : "closed"}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b text-gray-500 italic text-wrap">
                        {new Date(election.startsAt).toLocaleDateString()} -{" "}
                        {new Date(election.endsAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border-b flex gap-2">
                        <button
                          className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm hover:bg-yellow-500"
                          onClick={() => handleEdit(election)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                          onClick={() => handleDelete(election._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "users":
        return (
          <div>
            <h1>Manage Users</h1>
            <div className="overflow-x-auto">
              {showUserForm && editingUser && (
                <div className="mb-6 border p-4 rounded-lg bg-gray-50">
                  <h2 className="text-lg font-semibold mb-3">Edit User</h2>

                  <input
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="w-full mb-3 p-2 border rounded"
                  />

                  <select
                    name="role"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="w-full mb-3 p-2 border rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button
                    onClick={async () => {
                      try {
                        const res = await axios.put(
                          `${import.meta.env.VITE_API_URL}/users/${editingUser._id}`,
                          editingUser
                        );
                        setUser((prev) =>
                          prev.map((u) => (u._id === editingUser._id ? res.data : u))
                        );
                        setShowUserForm(false);
                        setEditingUser(null);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              <table className="min-w-full border border-gray-200 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">User</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Role</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((user, i) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{user.name}</td>
                      <td className="border-b">
                        <span
                          className={`px-3 py-1 rounded-full ${user.role === "admin"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b flex gap-2">
                        <button className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm hover:bg-yellow-500" onClick={() => handelEditUser(user)}>
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600" onClick={() => handleDeleteUser(user._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4 mt-24">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Create and manage elections, candidates, and participants.</p>

        {/* Tabs */}
        <div className="bg-gray-200 flex flex-wrap sm:flex-nowrap gap-3 p-3 px-5 rounded-lg shadow-md m-4 justify-center sm:justify-between items-center w-full">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base ${activeTab === "overview" ? "bg-white shadow font-semibold" : ""
              }`}
          >
            <BarChart2 size={18} /> Overview
          </button>
          <button
            onClick={() => setActiveTab("elections")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base ${activeTab === "elections" ? "bg-white shadow font-semibold" : ""
              }`}
          >
            <Calendar size={18} /> Elections
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base ${activeTab === "users" ? "bg-white shadow font-semibold" : ""
              }`}
          >
            <Users size={18} /> Users
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white m-2 sm:m-4 p-4 sm:p-6 rounded-lg shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
