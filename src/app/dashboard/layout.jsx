import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import DashboardHead from '../components/DashboardHead/DashboardHead';
import TrendingList from '../components/TrendingList/TrendingList';
import { FetcherProvider } from '@/store/FetcherProvider';

const DashboardLayout = ({ children }) => {
  return (
    <FetcherProvider>
      <div className='flex flex-col min-h-screen md:px-4 lg:px-10 pb-14 lg:pb-14'>
        <DashboardHead/>
        <div className='flex md:gap-4'>
          <div className='md:block md:basis-[25%] lg:basis-[25%] relative'>
            <div className='bg-gray-800 md:rounded-md shadow-md overflow-hidden h-max fixed md:sticky bottom-0 left-0 right-0 md:top-4'>
              {/* <Navbar/> */}
            </div>
          </div>
          <div className='basis-full md:basis-[75%] lg:basis-[50%]'>
            {children}
          </div>
          <div className='hidden lg:block lg:basis-[25%] relative'>
            <div className='bg-gray-800 rounded-md shadow-md overflow-hidden sticky top-4'>
              <TrendingList/>
            </div>
          </div>
        </div>
      </div>
    </FetcherProvider>
  )
};

export default DashboardLayout;