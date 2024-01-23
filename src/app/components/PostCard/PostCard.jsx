'use client'

import React from 'react';
import Link from 'next/link';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaComment,
  FaRegTrashCan,
  FaTrash
} from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';
import DeletePostButton from '../Buttons/DeletePost/DeletePostButton';

const PostCard = ({ details }) => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className='p-4 flex gap-4'>
      <div>
        <div className='w-[50px] h-[50px] bg-black rounded-full'></div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex items-center gap-2'>
          <Link href={`/dashboard/profile/${details?.author?.username}`} className='text-white'>{details?.author?.fullname}</Link>
          <Link href={`/dashboard/profile/${details?.author?.username}`} className='text-sm text-white text-opacity-70'>{details?.author?.username}</Link>
          <p className='text-sm text-white text-opacity-70'>12/28/2023 - 3:00 PM</p>
        </div>
        <div>
          <p className='text-white text-opacity-70'>{details?.textContent}</p>
        </div>
        <div className='flex justify-end gap-8'>
          <button className='flex gap-2'>
            <FaRegHeart className='text-white w-[18px] h-[18px]'/>
            <small className='text-white'>{details?.likes?.length}</small>
          </button>
          <Link href={"/dashboard/posts/1"} className='flex justify-end gap-2'>
            <FaRegComment className='text-white w-[18px] h-[18px]'/>
            <small className='text-white'>{details?.replies?.length}</small>
          </Link>
          {details?.author?.username === currentUser?.username ?
            <DeletePostButton id={details?._id} currentUserId={currentUser?._id}/>
            :
            ''
          }
        </div>
      </div>
    </div>
  )
};

export default PostCard;