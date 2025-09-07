import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPeopleArrows, faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';

const VotePage = () => {
  const [user] = React.useState('Harsh');
  const [elections] = React.useState(null);
  const [isOpen] = React.useState('Open');
  const [description] = React.useState(
    'Election for the college student body president position.'
  );

  const info = [
    { label: '5 Candidates', icon: faPeopleArrows },
    { label: 'Dec 10, 2024 - Dec 15, 2024', icon: faCalendar },
    { label: '1500 Votes Cast', icon: faTag },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-screen p-4">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl hover:shadow-lg transition-shadow">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user}</h1>
        <p>Here are the current elections available for voting.</p>

        {/* Election Header */}
        <div className="mt-6 border pt-4 rounded-lg p-4 w-full flex flex-col gap-4">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-xl font-semibold">
              {elections || 'College President 2025'}
            </h1>
            <p className="flex items-center gap-2 bg-green-200 text-green-800 rounded-lg px-2 py-1 text-sm font-medium">
              <FontAwesomeIcon icon={faClock} /> {isOpen}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600">{description}</p>

          {/* Info Section */}
          <div className="mt-4 flex flex-col">
            {info.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 "
              >
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
      </div>
    </div>
  );
};

export default VotePage;
