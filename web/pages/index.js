// pages/index.js
import React from 'react';
import { FaTemperatureHigh, FaTint, FaArrowRight, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ThinkBig: IoT Blockchain System</h1>
        <p className="text-lg mb-8">
          Capturing and processing temperature and humidity data on the blockchain.
        </p>
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex items-center">
            <FaTemperatureHigh className="text-2xl mr-2" />
            <span>Temperature</span>
          </div>
          <div className="flex items-center">
            <FaTint className="text-2xl mr-2" />
            <span>Humidity</span>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full flex items-center">
            <Link href="/table">
              <span className="flex items-center">
                Get Started <FaArrowRight className="ml-2" />
              </span>
            </Link>
          </button>
          <a href="https://github.com/usmhic/thinkbig" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full flex items-center">
            <FaGithub className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
