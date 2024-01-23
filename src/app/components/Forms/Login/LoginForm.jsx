'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/helpers/zodSchema';

import Spinner from '../../Spinner/Spinner';
import { notifySuccess, notifyFailed } from '@/helpers/toaster';

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/currentUserSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(loginFormSchema) });

  const submittedData = async (data) => {
    setIsLoading((prev) => !prev);
    try {
      const res = await fetch('/api/users/login', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      } else {
        reset();
        const result = await res.json();
        dispatch(setCurrentUser(result.data));
        notifySuccess(result.message);
        router.push("/dashboard");
      };
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
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-sm"
            {...register('email')}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-sm"
            {...register('password')}
          />
          <div className='text-white'>
            {errors.email ? <p className="text-sm">{errors.email.message}</p> : ''}
            {errors.password ? <p className="text-sm">{errors.password.message}</p> : ''}
          </div>
        </div>
        <button
          className={`py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full ${isLoading && 'bg-slate-500 hover:bg-slate-500'} flex justify-center items-center`}
          disabled={isLoading}
        >{isLoading ? <Spinner/> : 'Login'}</button>
      </form>
      <div className="flex justify-center">
        <p className="text-sm text-white">Do not have an account? <Link href={'/register'} className="text-green-500 hover:text-green-600 underline">Register</Link> here.</p>
      </div>
    </div>
  )
};

export default LoginForm;