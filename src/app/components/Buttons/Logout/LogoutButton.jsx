'use client'

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoExit } from "react-icons/io5";

const LogoutButton = ({ location = 'normal' }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', { cache: 'no-store' });
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
      className={`p-4 ${location === 'normal' ? 'hidden md:flex w-full hover:text-black hover:bg-green-500' : 'rounded-md'} font-medium text-white items-center gap-4`}
      onClick={handleLogout}
    >
      <IoExit className={location === 'normal' ? 'w-[25px] h-[25px]' : 'w-[35px] h-[35px]'}/>
      {location === 'normal' ?
        <span>Logout</span>
        :
        ''
      }
    </button>
  )
};

export default LogoutButton;