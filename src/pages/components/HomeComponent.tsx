import React from 'react';
import Image from 'next/image';

const HomeComponent: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <Image
          src="/favicon.ico"
          alt="Activity Finder Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-6xl font-bold">Activity Finder</h1>
        <p className="text-xl mt-4">Discover the best activities around you</p>
      </div>
    </div>
  );
};

export default HomeComponent;
