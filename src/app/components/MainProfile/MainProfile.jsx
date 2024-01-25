/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileButtons from '../ProfileButtons/ProfileButtons';
import PostList from '../PostList/PostList';

import { useSelector, useDispatch } from 'react-redux';
import { selectVisitedUser, setVisitedUser } from '@/store/visitedUserSlice';

const MainProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const username = decodeURIComponent(params.username);
  const [showPosts, setShowPosts] = useState('posts');
  const currentVisitedUser = useSelector(selectVisitedUser);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => dispatch(setVisitedUser(data.data)))
      .catch((err) => console.log(err.message));
  }, []);
  
  return (
    <>
      <div>
        <ProfileDetails details={currentVisitedUser}/>
      </div>
      <div className='flex justify-evenly border-y border-slate-700'>
        <ProfileButtons
          contentFocus={showPosts}
          handleContentFocus={(type) => setShowPosts((prev) => prev = type)}
        />
      </div>
      <div>
        {showPosts === 'posts' ?
          <PostList list={currentVisitedUser?.posts}/>
          :
          <PostList list={currentVisitedUser?.likedPosts?.map((item) => item.post)}/>
        }
      </div>
    </>
  )
};

export default MainProfile;