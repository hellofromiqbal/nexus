'use client'

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';

const DeletePostButton = ({ id, currentUserId }) => {
  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        cache: 'no-cache',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId })
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
      onClick={handleDeletePost}
    >
      <FaRegTrashCan className='text-white w-[18px] h-[18px]'/>
    </button>
  )
};

export default DeletePostButton;