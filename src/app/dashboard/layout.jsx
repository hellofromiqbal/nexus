import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen px-10 pb-14'>
      <div className='flex justify-center py-2'>
        <h1 className="text-4xl font-bold text-white"><span className="text-green-500">N</span>exus</h1>
      </div>
      <div className='flex'>
        <div className='basis-[25%] px-4 relative'>
          <div className='bg-gray-800 rounded-md shadow-md overflow-hidden sticky top-4'>
            <Navbar/>
          </div>
        </div>
        <div className='basis-[50%]'>
          {children}
        </div>
        <div className='basis-[25%] px-4 relative'>
          <div className='bg-gray-800 rounded-md shadow-md overflow-hidden sticky top-4'>
            <Navbar/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DashboardLayout;