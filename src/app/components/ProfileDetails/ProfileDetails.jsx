'use client'

import React from 'react';
import Link from 'next/link';

const ProfileDetails = () => {
  return (
    <div className='flex flex-col'>
      <div className='h-[200px] bg-black relative'>
        <div className='w-[150px] h-[150px] absolute right-10 -bottom-[75px] bg-red-50 rounded-full border-4 border-black'></div>
      </div>
      <div className='flex flex-col p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <h2 className='text-xl text-white font-semibold'>Pedro Machado</h2>
            <p className='text-white text-sm text-opacity-70'>@pedromachado</p>
          </div>
          <p className='text-white'>Hello there!</p>
          <div className='flex gap-4'>
            <p className='text-sm text-white text-opacity-70'>Somewhere</p>
            <p className='text-sm text-white text-opacity-70'>Joined June 2009</p>
          </div>
          <div className='flex gap-4'>
            <Link href={"/dashboard"} className='flex justify-end gap-1'>
              <p className='text-sm text-white font-semibold'>0</p>
              <p className='text-sm text-white text-opacity-70'>Following</p>
            </Link>
            <Link href={"/dashboard"} className='flex justify-end gap-1'>
              <p className='text-sm text-white font-semibold'>0</p>
              <p className='text-sm text-white text-opacity-70'>Followers</p>
            </Link>
          </div>
        </div>
        <div className='flex flex-col pt-4'>
          {/* <button className="px-4 py-1 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full w-max">Follow</button> */}
          <Link href={`/dashboard/profile/1/edit`} className="px-4 py-1 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full w-max">Edit</Link>
        </div>
      </div>
    </div>
  )
};

export default ProfileDetails;