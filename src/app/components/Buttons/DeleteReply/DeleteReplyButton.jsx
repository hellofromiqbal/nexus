'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaRegTrashCan } from "react-icons/fa6";

import { useDispatch } from 'react-redux';
import { deletePostFromCurrentPosts } from '@/store/currentPostsSlice';

import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { deleteVisitedUserPost } from '@/store/visitedUserSlice';

const DeleteReplyButton = ({ id, currentUserId }) => {
  const dispatch = useDispatch();
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
        dispatch(deletePostFromCurrentPosts(id));
        dispatch(deleteVisitedUserPost(id));
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

export default DeleteReplyButton;