'use client'

import React from 'react';
import CreatePostForm from '../components/Forms/CreatePost/CreatePostForm';
import PostList from '../components/PostList/PostList';

import { useSelector } from 'react-redux';
import { selectCurrentPosts } from '@/store/currentPostsSlice';

const DashboardPage = () => {
  const currentPosts = useSelector(selectCurrentPosts);
  
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4'>
        <CreatePostForm/>
      </div>
      <div>
        <PostList list={currentPosts}/>
      </div>
    </div>
  )
};

export default DashboardPage;