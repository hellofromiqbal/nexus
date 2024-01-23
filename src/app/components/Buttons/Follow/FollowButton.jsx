'use client'

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import React from 'react';

const FollowButton = ({ currentUserId, details }) => {
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
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className="px-4 py-1 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full w-max"
      onClick={isVisitedUserAlreadyFollowed ? handleUnfollowButton : handleFollowButton}
    >{isVisitedUserAlreadyFollowed ? 'Unfollow' : 'Follow'}</button>
  )
};

export default FollowButton;