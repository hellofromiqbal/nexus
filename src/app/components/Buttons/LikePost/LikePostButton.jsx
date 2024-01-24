'use client'

import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import { useDispatch } from 'react-redux';

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { likePost, unlikePost } from '@/store/currentPostsSlice';

const LikePostButton = ({ currentUserId, details }) => {
  const dispatch = useDispatch();
  const isPostAlreadyLiked = details?.likes?.find((userId) => userId === currentUserId);

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
        dispatch(likePost({ id: details?._id, currentUserId }));
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  const handleUnlikeButton = async () => {
    try {
      const res = await fetch(`/api/posts/likes/`, {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId, postId: details?._id })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(unlikePost({ id: details?._id, currentUserId }));
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className='flex gap-2'
      onClick={isPostAlreadyLiked ? handleUnlikeButton : handleLikeButton}
    >
      {isPostAlreadyLiked ?
        <FaHeart className='text-white w-[18px] h-[18px]'/>
        :
        <FaRegHeart className='text-white w-[18px] h-[18px]'/>
      }
      <small className='text-white'>{details?.likes?.length}</small>
    </button>
  )
};

export default LikePostButton;