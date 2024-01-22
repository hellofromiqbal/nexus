'use client'

import React from 'react';
import Link from 'next/link';

const RegisterForm = () => {
  return (
    <div className='flex flex-col gap-2'>
      <form
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Fullname"
            className="px-4 py-2 rounded-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-sm"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="px-4 py-2 rounded-sm"
          />
          <div className='text-white'>
            <p className="text-sm">Invalid email/password</p>
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