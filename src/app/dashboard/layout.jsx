import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen md:px-4 lg:px-10 pb-4 lg:pb-14'>
      <div className='flex justify-center py-2'>
        <h1 className="text-4xl font-bold text-white"><span className="text-green-500">N</span>exus</h1>
      </div>
      <div className='flex gap-4'>
        <div className='hidden md:block md:basis-[25%] lg:basis-[25%] relative'>
          <div className='bg-gray-800 rounded-md shadow-md overflow-hidden sticky top-4'>
            <Navbar/>
          </div>
        </div>
        <div className='basis-full md:basis-[75%] lg:basis-[50%]'>
          {children}
        </div>
        <div className='hidden lg:block lg:basis-[25%] relative'>
          <div className='bg-gray-800 rounded-md shadow-md overflow-hidden sticky top-4'>
            <Navbar/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DashboardLayout;