import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Results = () => {
  const candidates = [
    { name: 'Alice Johnson', votes: 650 },
    { name: 'Bob Smith', votes: 450 },
    { name: 'Charlie Brown', votes: 300 },
    { name: 'Diana Prince', votes: 100 },
  ];

  const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0);

  const infoCards = [
    { title: 'Total Votes', value: totalVotes, icon: faVoteYea },
    { title: 'Total Candidates', value: candidates.length, icon: faUsers },
    {
      title: 'Winner',
      value: candidates.reduce((a, b) => (a.votes > b.votes ? a : b)).name,
      icon: faTrophy,
    },
  ];

  // Different colors for variety
  const colors = ["#22c55e", "#3b82f6", "#9333ea", "#f59e0b"];

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col justify-center items-center pt-20 px-4">
      <div className="bg-white p-6 md:px-20 mt-12 rounded-lg shadow-md w-full max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl">Election Results</h1>
          <p className="text-sm text-gray-500">
            View detailed results and analytics for completed elections.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-sm"
            >
              <FontAwesomeIcon
                icon={card.icon}
                className="text-3xl text-blue-600 mb-2"
              />
              <h2 className="text-lg font-semibold">{card.value}</h2>
              <p className="text-sm text-gray-500">{card.title}</p>
            </div>
          ))}
        </div>
        </div>

        {/* Vote Distribution */}
        <div className="bg-white p-6 md:px-20 mt-12 rounded-lg shadow-md w-full max-w-4xl mb-5">
          <h2 className="text-xl font-semibold mb-4">Vote Distribution</h2>
          <p className="text-sm text-gray-500 mb-6">
            The chart below represents the distribution of votes among candidates.
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={candidates} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votes">
                {candidates.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Candidate Results */}
        <div className="bg-white p-6 md:px-20 mt-12 rounded-lg shadow-md w-full max-w-4xl mb-5">
          <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
          <p className="text-sm text-gray-500 mb-6">
            Complete breakdown of all candidates and their performance
          </p>
          {candidates.map((candidate, idx) => {
            const percentage = ((candidate.votes / totalVotes) * 100).toFixed(1);
            return (
              <div key={idx} className="border p-3 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{candidate.name}</span>
                  <span className="text-sm text-gray-500">
                    {candidate.votes} votes ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                  <div
                    className="h-4 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: colors[idx % colors.length],
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default Results;
