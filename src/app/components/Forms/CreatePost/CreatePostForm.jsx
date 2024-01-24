'use client'

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostFormSchema } from '@/helpers/zodSchema';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';
import { notifyFailed, notifySuccess } from '@/helpers/toaster';
import Spinner from '../../Spinner/Spinner';
import { addNewPost, selectCurrentPosts } from '@/store/currentPostsSlice';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({ resolver: zodResolver(createPostFormSchema) });

  const submittedData = async (data) => {
    if(data.textContent.length < 1) return;
    setIsLoading((prev) => !prev);
    try {
      const res = await fetch('/api/posts/create', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: currentUser?._id, ...data })
      });

      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        const result = await res.json();
        dispatch(addNewPost({...result.data, author: currentUser}));
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
        placeholder={`What's happening?!`}
        className='px-4 py-2 h-24 rounded-md resize-none bg-transparent border text-white'
        {...register('textContent')}
      ></textarea>
      <button
        className={`py-2 text-black font-semibold rounded-full ${isLoading ? 'bg-gray-500 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'} flex justify-center items-center`}
        disabled={isLoading}
      >
        {isLoading ? <Spinner/> : 'Post'}
      </button>
    </form>
  )
};

export default CreatePostForm;