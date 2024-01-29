'use client'

import React from 'react';
import Link from 'next/link';
import { FaRegComment } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';
import DeletePostButton from '../Buttons/DeletePost/DeletePostButton';
import LikePostButton from '../Buttons/LikePost/LikePostButton';
import { timePosted } from '@/helpers/moment';
import DeleteReplyButton from '../Buttons/DeleteReply/DeleteReplyButton';
import LikeReplyButton from '../Buttons/LikeReply/LikeReplyButton';

const ContentCard = ({ details, type, contentIn }) => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className='p-4 flex gap-4 border-t border-gray-700'>
      <div>
        <div className='w-[50px] h-[50px] bg-gray-200 rounded-full'></div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex items-center gap-1'>
          <Link href={`/dashboard/profile/${details?.author?.username}`} className={`text-white text-nowrap font-medium ${details?.author?.fullname?.length > 20 ? 'w-[120px] md:w-[30%]' : ''} overflow-hidden text-ellipsis`}>{details?.author?.fullname}</Link>
          <span className='text-white text-opacity-70'>·</span>
          <Link href={`/dashboard/profile/${details?.author?.username}`} className={`text-sm text-white text-opacity-70 ${details?.author?.username?.length > 12 ? 'w-[60px] md:w-[20%]' : ''} overflow-hidden text-ellipsis`}>{details?.author?.username}</Link>
          <span className='text-white text-opacity-70'>·</span>
          <p className='text-sm text-white text-nowrap text-opacity-70'>{timePosted(details?.createdAt)}</p>
        </div>
        <div>
          <p className='text-white text-opacity-70'>{details?.textContent}</p>
        </div>
        <div className='flex justify-end gap-8'>
          {type === 'post' ?
            <>
              <LikePostButton details={details}/>
              <Link href={`/dashboard/posts/${details?._id}`} className='flex justify-end gap-2'>
                <FaRegComment className='text-white w-[18px] h-[18px]'/>
                <small className='text-white'>{details?.replies?.length}</small>
              </Link>
              {details?.author?.username === currentUser?.username ?
                <DeletePostButton id={details?._id} currentUserId={currentUser?._id}/>
                :
                ''
              }
            </>
            :
            <>
              <LikeReplyButton details={details} contentIn={contentIn}/>
              <Link href={`/dashboard/replies/${details?._id}`} className='flex justify-end gap-2'>
                <FaRegComment className='text-white w-[18px] h-[18px]'/>
                <small className='text-white'>{details?.replies?.length}</small>
              </Link>
              <DeleteReplyButton id={details?._id} currentUserId={currentUser?._id} contentIn={contentIn}/>
            </>
          }
          
        </div>
      </div>
    </div>
  )
};

export default ContentCard;