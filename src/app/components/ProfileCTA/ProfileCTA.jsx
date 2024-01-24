'use client'

import React from 'react';
import Link from 'next/link';
import FollowButton from '../Buttons/Follow/FollowButton';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';

const ProfileCTA = ({ details }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {details?._id === currentUser?._id ?
        <Link href={`/dashboard/profile/1/edit`} className="px-4 py-1 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full w-max">Edit</Link>
        :
        <FollowButton currentUserId={currentUser?._id} details={details}/>
      }
    </>
  )
};

export default ProfileCTA;