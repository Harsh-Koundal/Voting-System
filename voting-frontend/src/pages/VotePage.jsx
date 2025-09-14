import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPeopleArrows, faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const VotePage = () => {
  const [user, setUser] = useState('User');
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections`);
        console.log(res.data)
        setElections(res.data || []);
        
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.name) setUser(userData.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const infoTemplate = (election) => [
    { label: `${election.candidates.length} Candidates`, icon: faPeopleArrows },
    { label: election.startsAt && election.endsAt ? `${new Date(election.startsAt).toLocaleDateString()} - ${new Date(election.endsAt).toLocaleDateString()}` : 'Dates not available', icon: faCalendar },
    { label: `${election.votesCast || 0} Votes Cast`, icon: faTag },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-screen p-4">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl hover:shadow-lg transition-shadow">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user}</h1>
        <p>Here are the current elections available for voting.</p>

        {/* Render Elections */}
        <div className="mt-6 flex flex-col gap-6">
          {elections.length === 0 && <p>No elections available.</p>}

          {elections.map((election) => (
            <div key={election._id} className="border pt-4 rounded-lg p-4 w-full flex flex-col gap-4">
              <div className="flex justify-between w-full items-center">
                <h1 className="text-xl font-semibold">{election.name}</h1>
                <p className={`flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-lg ${election.isOpen ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  <FontAwesomeIcon icon={faClock} /> {election.isOpen ? 'Open' : 'Closed'}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600">{election.description || 'No description available.'}</p>

              {/* Info Section */}
              <div className="mt-4 flex flex-col">
                {infoTemplate(election).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3">
                    <FontAwesomeIcon icon={item.icon} className="text-blue-500" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Vote Button */}
              <div className="flex justify-center mt-6 px-10">
                <button className="w-full py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xl">
                  Vote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotePage;
