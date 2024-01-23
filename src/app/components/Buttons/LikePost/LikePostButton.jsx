import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const LikePostButton = ({ currentUserId, details }) => {
  const params = useParams();
  const handleLikeButton = async () => {
    try {
      const res = await fetch(`/api/posts/likes/`, {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId, postId: details?._id })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className='flex gap-2'
      onClick={handleLikeButton}
    >
      <FaRegHeart className='text-white w-[18px] h-[18px]'/>
      <small className='text-white'>{details?.likes?.length}</small>
    </button>
  )
};

export default LikePostButton;