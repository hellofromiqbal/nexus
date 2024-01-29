/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  IoHome,
  IoSearch,
  IoNotifications,
  IoMail,
} from "react-icons/io5";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import LogoutButton from '../Buttons/Logout/LogoutButton';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from '@/store/currentUserSlice';
import { setCurrentPosts } from '@/store/currentPostsSlice';
import staticData from '@/assets/data/staticData';
import NavLink from '../NavLink/NavLink';

const Navbar = () => {
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

  const currentUser = useSelector(selectCurrentUser);

  return (
    <nav>
      <ul className='flex flex-col'>
        {staticData.navbar.map((navLink) => (
          <NavLink
            key={navLink.name}
            name={navLink.name}
            url={navLink.url}
          />
        ))}
        <li className='flex'>
          <LogoutButton/>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;