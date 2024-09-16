import React from 'react';
import Image from 'next/image';

const HomeComponent: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/mainimg.webp)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        
        <h1 className="text-6xl class-fill font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Activity Web Finder
        </h1>
        <p className="text-xl mt-4">Discover the best activities around you</p>
      </div>
    </div>
  );
};

export default HomeComponent;
