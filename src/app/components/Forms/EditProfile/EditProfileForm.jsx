'use client'

import React from 'react';
import Link from 'next/link';

const EditProfileForm = () => {
  return (
    <div className='flex flex-col gap-2'>
      <form
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 bg-transparent text-white border rounded-sm"
          />
          <input
            type="text"
            placeholder="Fullname"
            className="px-4 py-2 bg-transparent text-white border rounded-sm"
          />
          <textarea
            placeholder='Bio'
            className='px-4 py-2 h-24 bg-transparent text-white border rounded-sm resize-none'
          ></textarea>
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 bg-transparent text-white border rounded-sm"
          />
          <div className='text-white'>
            <p className="text-sm">Invalid email/password</p>
          </div>
        </div>
        <button className="py-2 bg-green-500 hover:bg-green-600 text-black font-medium rounded-full">Save</button>
      </form>
    </div>
  )
};

export default EditProfileForm;