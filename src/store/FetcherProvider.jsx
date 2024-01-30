/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentUser } from './currentUserSlice';
import { setCurrentPosts } from './currentPostsSlice';

export const FetcherProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/users/me', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => dispatch(setCurrentUser(data.data)))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    fetch('/api/posts/', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => dispatch(setCurrentPosts(data.data)))
      .catch((err) => console.log(err.message));
  }, []);

  return <div>{children}</div>;
};