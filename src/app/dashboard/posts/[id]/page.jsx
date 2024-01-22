'use client'

import React from 'react';
import Link from 'next/link';
import PostCard from '@/app/components/PostCard/PostCard';
import CreateReplyForm from '@/app/components/Forms/CreateReply/CreateReplyForm';
import BackButton from '@/app/components/Buttons/Back/BackButton';

const PostDetailPage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4 flex'>
        <BackButton/>
      </div>
      <div>
        <PostCard/>
      </div>
      <div className='px-4 pb-4'>
        <CreateReplyForm/>
      </div>
      <div>
        <PostCard/>
        <PostCard/>
        <PostCard/>
      </div>
    </div>
  )
};

export default PostDetailPage;