import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { CgAddR } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { FaMap, FaHome } from "react-icons/fa";
import HomeComponent from './HomeComponent';

// Dynamically import MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [addWaypointMode, setAddWaypointMode] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'add') {
      setAddWaypointMode(true);
    } else {
      setAddWaypointMode(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="sidebar w-16 fixed h-full left-0 bg-gray-900 shadow-lg flex flex-col items-center py-4">
        <div className="mb-6">
          <Image
            className="mx-auto"
            src="/favicon.ico"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
        <nav className="flex flex-col space-y-8 mt-4">
          <div className="relative group">
            <a onClick={() => handleTabClick('home')} className="text-white hover:text-gray-400 cursor-pointer">
              <FaHome className='text-4xl' />
            </a>
            <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Home
            </span>
          </div>
          <div className="relative group">
            <a onClick={() => handleTabClick('map')} className="text-white hover:text-gray-400 cursor-pointer">
              <FaMap className='text-4xl' />
            </a>
            <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Map
            </span>
          </div>
          <div className="relative group">
            <a onClick={() => handleTabClick('notifications')} className="text-white hover:text-gray-400 cursor-pointer">
              <IoIosNotifications className='text-4xl' />
            </a>
            <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Notifications
            </span>
          </div>
          <div className="relative group">
            <a onClick={() => handleTabClick('add')} className="text-white hover:text-gray-400 cursor-pointer">
              <CgAddR className='text-4xl' />
            </a>
            <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Add
            </span>
          </div>
        </nav>
      </div>

      <div className="ml-16 flex-grow">
        {activeTab === 'home' && <HomeComponent />}
        {activeTab === 'map' && <MapComponent addWaypointMode={false} />}
        {activeTab === 'notifications' && <div className=''>Notifications Content</div>}
        {activeTab === 'add' && <MapComponent addWaypointMode={true} />}
      </div>
    </div>
  );
};

export default Sidebar;
