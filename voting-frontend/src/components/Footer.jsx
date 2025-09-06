import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub,faInstagram } from '@fortawesome/free-brands-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core'

const Footer = () => {
  const socialLinks = [
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/harsh-koundal-0a7485369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
      icon: faGithub,
      url: 'https://github.com/Harsh-Koundal'
    },
    {
        icon: faInstagram,
        url: 'https://www.instagram.com/_a_nk_u__009_?igsh=MW1jdzczM2gzYmlrcA=='
    }
  ]

  return (
    <footer className="bg-gray-100">
      <hr />
      <div className="flex flex-col justify-center items-center gap-6 py-5">
        <h1 className="text-sm text-gray-600">
          © 2025 Voting System. All rights reserved by <span className="font-bold">CodeRage</span>.
        </h1>

        <div className="flex gap-6">
          {socialLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={link.icon} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
