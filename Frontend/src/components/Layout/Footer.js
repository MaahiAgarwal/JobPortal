import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
  const [showOptions, setShowOptions] = useState(null);

  const toggleOptions = (platform) => {
    setShowOptions((prev) => (prev === platform ? null : platform));
  };

  return (
    <footer
      className={`py-6 px-10 transition-colors duration-300 ${
        isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-600'
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Brand Section */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-400">HireMe</h3>
          <p>Your gateway to exciting career opportunities across industries.</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            {['Find Jobs', 'Companies', 'All Jobs'].map((linkText, index) => (
              <li key={index}>
                <Link
                  to={`/${linkText.toLowerCase().replace(' ', '-')}`}
                  className={`transition-colors ${
                    isDarkMode
                      ? 'text-zinc-400 hover:text-blue-500'
                      : 'text-zinc-600 hover:text-blue-600'
                  }`}
                >
                  {linkText}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div>
          <h4 className="font-semibold mb-2">Connect With Us</h4>
          <div className="flex space-x-6">
            {[
              { platform: 'linkedin', icon: Linkedin, links: [
                  { name: "Subhradeep's LinkedIn", url: 'https://www.linkedin.com/in/subhradeep-basu-786aab209' },
                  { name: "Sayan's LinkedIn", url: 'https://www.linkedin.com/in/sayan-sen-38b198255' },
                ]
              },
              { platform: 'twitter', icon: Twitter, links: [
                  { name: "Subhradeep's Twitter", url: 'https://x.com/SubhradeepBasu5' },
                  { name: "Sayan's Twitter", url: 'https://x.com/Sayan_Sen007' },
                ]
              },
              { platform: 'instagram', icon: Instagram, links: [
                  { name: "Subhradeep's Instagram", url: 'https://www.instagram.com/subhradeepbasu12/' },
                  { name: "Sayan's Instagram", url: 'https://www.instagram.com/sayan_sen007' },
                ]
              },
            ].map(({ platform, icon: Icon, links }) => (
              <div className="relative" key={platform}>
                <button
                  onClick={() => toggleOptions(platform)}
                  className={`transition-colors ${
                    isDarkMode
                      ? 'text-zinc-400 hover:text-blue-500'
                      : 'text-zinc-600 hover:text-blue-600'
                  }`}
                >
                  <Icon size={24} />
                </button>
                {showOptions === platform && (
                  <div
                    className={`absolute mt-2 left-0 p-2 border rounded-lg shadow-lg z-10 ${
                      isDarkMode
                        ? 'bg-zinc-800 text-zinc-300 border-zinc-700 shadow-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-300 shadow-zinc-200'
                    }`}
                  >
                    {links.map(({ name, url }) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-2 py-1 hover:text-blue-500"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div
        className={`text-center mt-4 border-t pt-4 ${
          isDarkMode ? 'border-zinc-700' : 'border-zinc-300'
        }`}
      >
        <p>&copy; {new Date().getFullYear()} HireMe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
