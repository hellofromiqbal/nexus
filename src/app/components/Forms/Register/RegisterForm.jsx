'use client'

import React, { useState } from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '@/helpers/zodSchema';

const RegisterForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(registerFormSchema) });

  const submittedData = async (data) => {
    try {
      const res = await fetch('/api/users/register', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(!res.ok) {
        const result = await res.json();
        throw new Error(result.error);
      } else {
        reset();
        console.log('New account has been created!');
      }
    } catch (error) {
      console.log(error.message);
    };
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
            placeholder="Fullname"
            className="px-4 py-2 rounded-sm"
            {...register('fullname')}
          />
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
          <input
            type="password"
            placeholder="Confirm password"
            className="px-4 py-2 rounded-sm"
            {...register('confirmPassword')}
          />
          <div className='text-white'>
            {errors.fullname ? <p className="text-sm">{errors.fullname.message}</p> : ''}
            {errors.email ? <p className="text-sm">{errors.email.message}</p> : ''}
            {errors.password ? <p className="text-sm">{errors.password.message}</p> : ''}
            {errors.confirmPassword ? <p className="text-sm">{errors.confirmPassword.message}</p> : ''}
          </div>
        </div>
        <button className="py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">Register</button>
      </form>
      <div className="flex justify-center">
        <p className="text-sm text-white">Already have an account? <Link href={'/'} className="text-green-500 hover:text-green-600 underline">Login</Link> here.</p>
      </div>
    </div>
  )
};

export default RegisterForm;