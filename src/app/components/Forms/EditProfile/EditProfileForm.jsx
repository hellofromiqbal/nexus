'use client'

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileFormSchema } from '@/helpers/zodSchema';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCurrentUser } from '@/store/currentUserSlice';
import Spinner from '../../Spinner/Spinner';
import { notifyFailed, notifySuccess } from '@/helpers/toaster';

const EditProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(editProfileFormSchema) });
  const submittedData = async (data) => {
    setIsLoading((prev) => !prev);
    try {
      const res = await fetch(`/api/users/${currentUser?.username}/edit`, {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.error);
      } else {
        reset();
        const result = await res.json();
        dispatch(setCurrentUser(result.data));
        notifySuccess(result.message);
        window.location.href = `/dashboard/profile/${result.data.username}`;
      }
    } catch (error) {
      notifyFailed(error.message);
    };
    setIsLoading((prev) => !prev);
  };
  
  return (
    <div className='flex flex-col gap-2'>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submittedData)}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 bg-transparent text-white border rounded-sm"
            defaultValue={currentUser?.username?.replace(/@/, '')}
            {...register('username')}
          />
          <input
            type="text"
            placeholder="Fullname"
            className="px-4 py-2 bg-transparent text-white border rounded-sm"
            defaultValue={currentUser?.fullname}
            {...register('fullname')}
          />
          <textarea
            placeholder='Bio'
            className='px-4 py-2 h-24 bg-transparent text-white border rounded-sm resize-none'
            defaultValue={currentUser?.bio}
            {...register('bio')}
          ></textarea>
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 bg-transparent text-white border rounded-sm"
            defaultValue={currentUser?.location}
            {...register('location')}
          />
          <div className='text-white'>
            {errors.username ? <p className="text-sm">{errors.username.message}</p> : ''}
            {errors.fullname ? <p className="text-sm">{errors.fullname.message}</p> : ''}
            {errors.bio ? <p className="text-sm">{errors.bio.message}</p> : ''}
            {errors.location ? <p className="text-sm">{errors.location.message}</p> : ''}
          </div>
        </div>
        <button
          className={`py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full ${isLoading && 'bg-slate-500 hover:bg-slate-500'} flex justify-center items-center`}
          disabled={isLoading}
        >{isLoading ? <Spinner/> : 'Save'}</button>
      </form>
    </div>
  )
};

export default EditProfileForm;