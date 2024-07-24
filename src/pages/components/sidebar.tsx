import React from 'react';
import Image from 'next/image';
import { CgAddR } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="w-16 fixed h-full left-0 bg-white shadow-md">
      <div>
        <Image
          className="mx-auto my-2 mb-4"
          src="/favicon.ico"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>
      <CgAddR className='text-4xl mx-auto my-4' />

    </div>
  );
};

export default Sidebar;
