'use client'

import React from 'react';

import PostList from '../PostList/PostList';

import { useSelector } from 'react-redux';
import { selectCurrentPosts } from '@/store/currentPostsSlice';

const MainDashboardContent = () => {
  const currentPosts = useSelector(selectCurrentPosts);

  return (
    <>
      <PostList list={currentPosts}/>
    </>
  )
};

export default MainDashboardContent;