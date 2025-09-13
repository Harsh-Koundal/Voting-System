import React, { useState } from "react";
import { BarChart2, Calendar, Users, Activity, Vote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const info = [
        { title: "Total Elections", icon: Calendar, total: 2 },
        { title: "Active Elections", icon: Activity, total: 1 },
        { title: "Total Votes", icon: Vote, total: 202 },
    ];

    const recentElection = [
        {
            title: "College President 2025",
            candidates: `${3} candidates`,
            totalV: `${300} votes`,
            status: "open",
            period: "12/31/2024 - 1/14/2025"
        },
        {
            title: "Student Council Representative",
            candidates: `${2} candidates`,
            totalV: `${0} votes`,
            status: "upcoming",
            period: "1/31/2025 - 2/9/2025"
        },
    ];
    const users = [
        { id: 1, name: "John Doe", role: "admin" },
        { id: 2, name: "Alice Johnson", role: "user" },
        { id: 3, name: "Bob Smith", role: "user" },
        { id: 4, name: "Charlie Brown", role: "user" },
        { id: 5, name: "Diana Prince", role: "user" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="flex flex-col w-full">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {info.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full"
                                >
                                    <item.icon size={32} className="text-blue-500 mb-2" />
                                    <p className="font-semibold text-gray-700 text-center">
                                        {item.title}
                                    </p>
                                    <p className="text-xl font-bold">{item.total}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Elections */}
                        <div className="flex flex-col shadow-md rounded-md p-5 mt-6 w-full">
                            <h2 className="text-xl font-bold">Recent Elections</h2>
                            <p className="text-gray-500 text-sm">
                                Latest election activity and status
                            </p>

                            {recentElection.map((items, i) => (
                                <div
                                    key={i}
                                    className="border rounded-md p-4 mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                                >
                                    {/* Left side */}
                                    <div>
                                        <h2 className="font-semibold text-lg">{items.title}</h2>
                                        <p className="text-gray-500 text-sm">{items.candidates}</p>
                                    </div>

                                    {/* Right side */}
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
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                + Create Election
                            </button>
                        </div>


                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Election
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Candidates
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Votes
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Period
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentElection.map((election, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">{election.title}</td>
                                            <td className="px-4 py-2 border-b">{election.candidates}</td>
                                            <td className="px-4 py-2 border-b">{election.totalV}</td>
                                            <td className="px-4 py-2 border-b">
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full text-white ${election.status === "open"
                                                        ? "bg-green-500"
                                                        : election.status === "closed"
                                                            ? "bg-red-500"
                                                            : "bg-indigo-500"
                                                        }`}
                                                >
                                                    {election.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border-b text-gray-500 italic text-wrap">{election.period}</td>
                                            <td className="px-4 py-2 border-b flex gap-2">
                                                <button className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm hover:bg-yellow-500">
                                                    Edit
                                                </button>
                                                <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                )
            case "users":
                return (
                    <div>
                        <h1>Manage Users</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Role
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">{user.name}</td>
                                            <td className="border-b">
                                                <span
                                                    className={`px-3 py-1 rounded-full ${user.role === "admin" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border-b flex gap-2">
                                                <button className="px-3 py-1 bg-yellow-400 text-white rounded-md text-sm hover:bg-yellow-500">
                                                    Edit
                                                </button>
                                                <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4 mt-24">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-5xl">
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Create and manage elections, candidates, and participants.
                </p>

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
