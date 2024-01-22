'use client'

import React from 'react';

const CreatePostForm = () => {
  return (
    <form className='flex flex-col gap-4 w-full'>
      <textarea
        placeholder={`What's happening?!`}
        className='px-4 py-2 h-24 rounded-md resize-none bg-transparent border text-white'
      ></textarea>
      <button className="py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full">Post</button>
    </form>
  )
};

export default CreatePostForm;