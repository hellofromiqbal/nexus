/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileButtons from '../ProfileButtons/ProfileButtons';
import PostList from '../PostList/PostList';
import { useParams } from 'next/navigation';

const MainProfile = () => {
  const params = useParams();
  const username = decodeURIComponent(params.username);
  const [showPosts, setShowPosts] = useState('posts');
  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err.message));
  }, []);
  
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