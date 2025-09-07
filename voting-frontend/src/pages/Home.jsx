import React from 'react'
import heroImg from '../assets/hero.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faChartLine, faGlobe, faBolt } from '@fortawesome/free-solid-svg-icons'


const Home = () => {
  const features = [
    {
      title: "Secure & Private",
      description: "End-to-end encryption ensures your vote remains private and secure from any tampering.",
      icon: faLock
    },
    {
      title: "Easy to Use",
      description: "Intuitive interface designed for voters of all technical backgrounds and ages.",
      icon: faBolt
    },
    {
      title: "Real-time Results",
      description: "View live election results and comprehensive analytics as votes are counted.",
      icon: faChartLine
    },
    {
      title: "Transparent Process",
      description: "Full audit trail and transparency features ensure election integrity and trust.",
      icon: faGlobe
    },
  ]

  return (

    <div className="relative w-full min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-[60vh] w-full relative">
        <img src={heroImg} alt="Hero" className="h-full w-full object-cover" />

        {/* Overlay Text */}
        <div className="absolute top-1/3 w-full flex flex-col items-center gap-5 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Your Vote, Your Voice</h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            Vote securely in online elections powered by <span className="font-semibold text-blue-300">CodeRage Technologies</span>
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all" onClick={() => window.location.href = '/register'}>
            Get Started
          </button>
        </div>
      </div>

      <div>
        <div className='text-center mt-20 px-6 md:px-20'>
        <h1 className='font-bold text-3xl'>Why Choose Our Voting System</h1>
        <p className='text-gray-500 mt-5'>Built with modern technology and security best practices to ensure your democratic process is fair, transparent, and accessible.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 px-5">
          {features.map((f, i) => (
            <div
              key={i}
              className=" flex flex-col justify-center items-center"
            >
              <FontAwesomeIcon icon={f.icon} className="text-4xl text-blue-600" />
              <h2 className="text-xl font-semibold">{f.title}</h2>
              <p className="text-gray-600 text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-gray-200 flex flex-col justify-center items-center gap-6 py-5 mt-20'>
        <div className='text-center px-6 md:px-20 mb-10'></div>
        <h1 className='font-bold text-3xl'>Ready to Get Started?</h1>
        <p className='text-gray-500 mt-5 '>Join thousands of organizations and institutions that trust our platform for their democratic processes.</p>
        <div className='flex gap-5 flex-wrap justify-center mt-5'>
          <a href="/login"><button className='bg-blue-600 text-white rounded-md p-2'>Create Account</button></a>
          <button className='bg-white rounded-md p-2'>View Sample Results</button>
        </div>
        </div>
      </div>
  )
}

export default Home
