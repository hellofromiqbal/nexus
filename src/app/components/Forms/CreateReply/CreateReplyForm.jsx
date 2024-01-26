'use client'

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReplyFormSchema } from '@/helpers/zodSchema';
import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import { useParams } from 'next/navigation';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';
import Spinner from '../../Spinner/Spinner';
import { addNewPostOnVisitedPost } from '@/store/visitedPostSlice';
import { addNewReplyOnPostInCurrentPosts } from '@/store/currentPostsSlice';

const CreateReplyForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({ resolver: zodResolver(createReplyFormSchema) });
  
  const submittedData = async (data) => {
    if(data.textContent.length < 1) return;
    setIsLoading((prev) => !prev);
    try {
      const res = await fetch(`/api/posts/${id}/replies/`, {
        cache: 'no-cache',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: currentUser?._id, ...data })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(addNewPostOnVisitedPost({ ...result.data, author: currentUser }));
        dispatch(addNewReplyOnPostInCurrentPosts({ id, replyId: result.data._id }));
        reset();
        notifySuccess(result.message);
      };
    } catch (error) {
      notifyFailed(error.message);
    };
    setIsLoading((prev) => !prev);
  };

  return (
    <form
      className='flex flex-col gap-4 w-full'
      onSubmit={handleSubmit(submittedData)}
    >
      <textarea
        placeholder={`Reply`}
        className='px-4 py-2 h-24 rounded-md resize-none bg-transparent border text-white'
        {...register('textContent')}
      ></textarea>
      <button
        className={`py-2 text-black font-semibold rounded-full ${isLoading ? 'bg-gray-500 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'} flex justify-center items-center`}
        disabled={isLoading}
      >
        {isLoading ? <Spinner/> : 'Reply'}
      </button>
    </form>
  )
};

export default CreateReplyForm;