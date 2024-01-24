'use client'

import React from 'react';

import { notifyFailed, notifySuccess } from '@/helpers/toaster';

import { useDispatch } from 'react-redux';
import { addNewFollower, deleteFollower } from '@/store/visitedUserSlice';
import { addNewFollowing, deleteFollowing } from '@/store/currentUserSlice';

const FollowButton = ({ currentUserId, details }) => {
  const dispatch = useDispatch();
  const isVisitedUserAlreadyFollowed = details?.followers?.find((user) => user?.user?._id === currentUserId);
  const handleFollowButton = async () => {
    try {
      const res = await fetch(`/api/users/followers`, {
        cache: 'no-cache',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId, visitedUserId: details?._id })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(addNewFollowing({ user: details }));
        dispatch(addNewFollower({ user: result.data }));
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };
  
  const handleUnfollowButton = async () => {
    try {
      const res = await fetch(`/api/users/followers`, {
        cache: 'no-cache',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId, visitedUserId: details?._id })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(deleteFollowing(details?._id));
        dispatch(deleteFollower(currentUserId));
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className={`px-4 py-1 font-medium rounded-full w-max ${isVisitedUserAlreadyFollowed ? 'bg-red-500 hover:bg-red-500 text-black' : 'bg-green-500 hover:bg-green-600 text-black'}`}
      onClick={isVisitedUserAlreadyFollowed ? handleUnfollowButton : handleFollowButton}
    >{isVisitedUserAlreadyFollowed ? 'Unfollow' : 'Follow'}</button>
  )
};

export default FollowButton;