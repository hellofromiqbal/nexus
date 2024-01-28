'use client'

import React from 'react';

import { useParams } from 'next/navigation';
import { FaRegTrashCan } from "react-icons/fa6";

import { useDispatch } from 'react-redux';
import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { deleteReplyOnVisitedPost } from '@/store/visitedPostSlice';
import { deleteReplyOnPostInCurrentPosts } from '@/store/currentPostsSlice';


const DeleteReplyButton = ({ id, contentIn }) => {
  const params = useParams();
  console.log(params);
  console.log(id);
  const dispatch = useDispatch();
  const handleDeleteReply = async () => {
    try {
      const url = contentIn === 'post' ? '/api/replies/delete/postReply' : '/api/replies/delete/replyReply';
      const res = await fetch(url, {
        cache: 'no-cache',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentRefId: params.id, contentId: id })
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        if(contentIn === 'post') {
          dispatch(deleteReplyOnVisitedPost({ contentId: id }));
          dispatch(deleteReplyOnPostInCurrentPosts({ id: params.id, replyId: id }));
        };
        notifySuccess(result.message);
      }
    } catch (error) {
      notifyFailed(error.message);
    };
  };

  return (
    <button
      className='flex gap-2'
      onClick={handleDeleteReply}
    >
      <FaRegTrashCan className='text-white w-[18px] h-[18px]'/>
    </button>
  )
};

export default DeleteReplyButton;