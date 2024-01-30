'use client'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentUser } from './currentUserSlice';
import { setCurrentPosts } from './currentPostsSlice';

export const FetcherProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => dispatch(setCurrentUser(data.data)))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    fetch('/api/posts/')
      .then((res) => res.json())
      .then((data) => dispatch(setCurrentPosts(data.data)))
      .catch((err) => console.log(err.message));
  }, []);

  return <div>{children}</div>;
};