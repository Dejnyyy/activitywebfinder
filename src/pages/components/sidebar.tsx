import React from 'react';
import Image from 'next/image';
import { CgAddR } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { FaMap } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-16 fixed h-full left-0 bg-gray-900 shadow-lg flex flex-col items-center py-4">
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
          <a href="#" className="text-white hover:text-gray-400">
            <FaHome className='text-4xl' />
          </a>
          <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </div>
        <div className="relative group">
          <a href="#" className="text-white hover:text-gray-400">
            <FaMap className='text-4xl' />
          </a>
          <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Map
          </span>
        </div>
        <div className="relative group">
          <a href="#" className="text-white hover:text-gray-400">
            <IoIosNotifications className='text-4xl' />
          </a>
          <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Notifications
          </span>
        </div>
        <div className="relative group">
          <a href="#" className="text-white hover:text-gray-400">
            <CgAddR className='text-4xl' />
          </a>
          <span className="absolute left-16 top-1/2 transform -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Add
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
