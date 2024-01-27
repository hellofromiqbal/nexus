'use client'

import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import { useSelector, useDispatch } from 'react-redux';

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { selectCurrentUser } from '@/store/currentUserSlice';
import { addNewLikeOnReplyInVisitedPost, deleteLikeOnReplyInVisitedPost } from '@/store/visitedPostSlice';

const LikeReplyButton = ({ details }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isReplyAlreadyLiked = details?.likes?.find((like) => like?.author?._id === currentUser?._id);

  const handleLikeButton = async () => {
    try {
      const res = await fetch(`/api/replies/like/`, {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyId: details?._id, currentUserId: currentUser?._id })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(addNewLikeOnReplyInVisitedPost({ replyId: details?._id, currentUser: currentUser }));
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  const handleUnlikeButton = async () => {
    try {
      const res = await fetch(`/api/replies/unlike/`, {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyId: details?._id, currentUserId: currentUser?._id })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(deleteLikeOnReplyInVisitedPost({ replyId: details?._id, currentUserId: currentUser?._id }));
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className='flex gap-2'
      onClick={isReplyAlreadyLiked ? handleUnlikeButton : handleLikeButton}
    >
      {isReplyAlreadyLiked ?
        <FaHeart className='text-white w-[18px] h-[18px]'/>
        :
        <FaRegHeart className='text-white w-[18px] h-[18px]'/>
      }
      <small className='text-white'>{details?.likes?.length}</small>
    </button>
  )
};

export default LikeReplyButton;