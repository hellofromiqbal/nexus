'use client'

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoExit } from "react-icons/io5";

const LogoutButton = ({ location = 'normal' }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout');
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        notifySuccess(result.message);
        router.push("/");
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className={`p-4 ${location === 'normal' ? 'hidden md:flex w-full' : 'rounded-md'} font-medium text-white hover:text-black hover:bg-green-500 items-center gap-4`}
      onClick={handleLogout}
    >
      <IoExit className='w-[25px] h-[25px]'/>
      {location === 'normal' ?
        <span>Logout</span>
        :
        ''
      }
    </button>
  )
};

export default LogoutButton;