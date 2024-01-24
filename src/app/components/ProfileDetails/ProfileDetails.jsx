'use client'

import React from 'react';
import Link from 'next/link';

import { timeJoined } from '@/helpers/moment';
import ProfileCTA from '../ProfileCTA/ProfileCTA';

const ProfileDetails = ({ details }) => {
  return (
    <div className='flex flex-col'>
      <div className='h-[200px] bg-black relative'>
        <div className='w-[150px] h-[150px] absolute right-10 -bottom-[75px] bg-red-50 rounded-full border-4 border-black'></div>
      </div>
      <div className='flex flex-col p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <h2 className='text-xl text-white font-semibold'>{details?.fullname}</h2>
            <p className='text-white text-sm text-opacity-70'>{details?.username}</p>
          </div>
          <p className='text-white'>{details?.bio}</p>
          <div className='flex gap-4'>
            <p className='text-sm text-white text-opacity-70'>{details?.location}</p>
            <p className='text-sm text-white text-opacity-70'>Joined {timeJoined(details?.createdAt)}</p>
          </div>
          <div className='flex gap-4'>
            <Link href={"/dashboard"} className='flex justify-end gap-1'>
              <p className='text-sm text-white font-semibold'>{details?.following?.length}</p>
              <p className='text-sm text-white text-opacity-70'>Following</p>
            </Link>
            <Link href={"/dashboard"} className='flex justify-end gap-1'>
              <p className='text-sm text-white font-semibold'>{details?.followers?.length}</p>
              <p className='text-sm text-white text-opacity-70'>Followers</p>
            </Link>
          </div>
        </div>
        <div className='flex flex-col pt-4'>
          <ProfileCTA details={details}/>
        </div>
      </div>
    </div>
  )
};

export default ProfileDetails;