/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import PostList from '../PostList/PostList';
import PostCard from '../PostCard/PostCard';
import CreateReplyForm from '../Forms/CreateReply/CreateReplyForm';

import { useSelector, useDispatch } from 'react-redux';
import { selectVisitedPost, setVisitedPost } from '@/store/visitedPostSlice';

const MainPostDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = decodeURIComponent(params.id);
  const visitedPost = useSelector(selectVisitedPost);
  
  useEffect(() => {
    fetch(`/api/posts/${id}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        dispatch(setVisitedPost(data.data));
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  return (
    <>
      <div>
        <PostCard details={visitedPost}/>
      </div>
      <div className='px-4 pb-4'>
        <CreateReplyForm/>
      </div>
      <div>
        <PostList list={visitedPost?.replies}/>
      </div>
    </>
  )
};

export default MainPostDetail;