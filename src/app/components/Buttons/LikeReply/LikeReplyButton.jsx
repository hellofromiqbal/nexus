'use client'

import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import { useSelector, useDispatch } from 'react-redux';

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { likePost, unlikePost } from '@/store/currentPostsSlice';
import { selectCurrentUser } from '@/store/currentUserSlice';
import { addLikeOnVisitedPost, deleteLikeOnVisitedPost } from '@/store/visitedPostSlice';
import { addLikeToVisitedUserPost, deleteLikeFromVisitedUserPost } from '@/store/visitedUserSlice';

const LikeReplyButton = ({ details }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const isPostAlreadyLiked = details?.likes?.find((like) => like?.author?._id === currentUser?._id);

  const handleLikeButton = async () => {
    try {
      const res = await fetch(`/api/posts/likes/`, {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId: currentUser?._id, postId: details?._id })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(likePost({ id: details?._id, currentUser }));
        dispatch(addLikeOnVisitedPost(currentUser));
        dispatch(addLikeToVisitedUserPost({ id: details?._id, currentUser }));
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
        body: JSON.stringify({ currentUserId: currentUser?._id, postId: details?._id })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(unlikePost({ id: details?._id, currentUserId: currentUser?._id }));
        dispatch(deleteLikeOnVisitedPost({ currentUserId: currentUser?._id }))
        dispatch(deleteLikeFromVisitedUserPost({ id: details?._id, currentUserId: currentUser?._id }))
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

export default LikeReplyButton;