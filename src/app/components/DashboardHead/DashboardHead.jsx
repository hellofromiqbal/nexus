'use client'

import React from 'react';
import LogoutButton from '../Buttons/Logout/LogoutButton';
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';

const DashboardHead = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className='flex bg-gray-800 md:bg-transparent border-gray-700 shadow-md md:shadow-none justify-between md:justify-center items-center md:py-2 z-10'>
      <div className='md:hidden'>
        <Link href={`/dashboard/profile/${currentUser?.username}`} className={`p-4 text-white font-medium flex items-center gap-4`}>
          <FaUserCircle className='w-[35px] h-[35px]'/>
        </Link>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-white"><span className="text-green-500">N</span>exus</h1>
      </div>
      <div className='md:hidden'>
        <LogoutButton location='head'/>
      </div>
    </div>
  )
};

export default DashboardHead;