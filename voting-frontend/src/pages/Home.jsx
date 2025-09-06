import React from 'react'
import heroImg from '../assets/hero.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faChartLine, faGlobe, faBolt } from '@fortawesome/free-solid-svg-icons'


const Home = () => {
  const features = [
    {
      title: "Secure Voting",
      description: "Your vote is encrypted and protected with top-level security.",
      icon: faLock
    },
    {
      title: "Transparent Results",
      description: "See real-time voting results with complete transparency.",
      icon: faChartLine
    },
    {
      title: "Accessible Anywhere",
      description: "Vote from anywhere in the world using your device.",
      icon: faGlobe
    },
    {
      title: "Fast & Reliable",
      description: "Lightning fast system ensuring smooth voting experience.",
      icon: faBolt
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

      {/* Features Section */}
      <div className="my-20 px-6 md:px-20 ">
        <h1 className="text-3xl font-bold text-center">Features</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex shadow-lg p-6 rounded-xl flex-col items-center gap-4 bg-white hover:shadow-xl transition-all"
            >
              <FontAwesomeIcon icon={f.icon} className="text-4xl text-blue-600" />
              <h2 className="text-xl font-semibold">{f.title}</h2>
              <p className="text-gray-600 text-center">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home
