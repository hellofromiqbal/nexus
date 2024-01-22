'use client'

import React, { useState } from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileButtons from '../ProfileButtons/ProfileButtons';
import PostList from '../PostList/PostList';

const MainProfile = () => {
  const [showPosts, setShowPosts] = useState('posts');
  return (
    <>
      <div>
        <ProfileDetails/>
      </div>
      <div className='flex justify-evenly border-y border-slate-700'>
        <ProfileButtons
          contentFocus={showPosts}
          handleContentFocus={(type) => setShowPosts((prev) => prev = type)}
        />
      </div>
      <div>
        {showPosts === 'posts' ?
          <PostList/>
          :
          <PostList/>
        }
      </div>
    </>
  )
};

export default MainProfile;