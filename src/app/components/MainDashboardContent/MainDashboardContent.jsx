'use client'

import React from 'react';
import ContentList from '../ContentList/ContentList';

import { useSelector } from 'react-redux';
import { selectCurrentPosts } from '@/store/currentPostsSlice';

const MainDashboardContent = () => {
  const currentPosts = useSelector(selectCurrentPosts);

  return (
    <>
      <ContentList list={currentPosts}/>
    </>
  )
};

export default MainDashboardContent;