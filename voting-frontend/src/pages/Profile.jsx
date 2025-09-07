import React from 'react'

const Profile = () => {
  const [user, setUser] = React.useState({
    name: 'Harsh Koundal',
    email: 'harsh.koundal@example.com',
    role: 'Voter'
  })

  return (
    <div className="w-screen min-h-screen pt-20 flex flex-col justify-start items-center px-6 bg-gray-200">
      
      {/* Header */}
      <div className='w-9/12 flex flex-col justify-center items-center bg-white px-6 rounded-md shadow-md mt-12'>
      <div className="max-w-4xl w-full flex flex-col justify-start items-start">
        <h1 className="text-3xl font-bold mt-10">My Profile</h1>
        <p className="text-gray-600">
          Manage your account information and view your voting history.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl w-full flex flex-col justify-center items-center mt-10 gap-5 border p-6 rounded-md shadow-md bg-white">
        
        {/* Avatar */}
        <div className="rounded-full bg-purple-500 p-8 h-20 w-20 text-white font-bold text-3xl flex justify-center items-center">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="px-3 py-1 bg-gray-200 rounded-full text-sm">{user.role}</p>
      </div>

      {/* Voting History Section */}
      <div className="max-w-4xl w-full m-10">
        <h2 className="text-2xl font-bold mb-4">Voting History</h2>
        <p className="text-gray-600">No voting history available yet.</p>
      </div>
</div>
    </div>
  )
}

export default Profile
