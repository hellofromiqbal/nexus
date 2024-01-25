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
        <li className='flex'>
          <Link href={'/dashboard'} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
            <IoHome className='w-[25px] h-[25px]'/>
            <span>Home</span>
          </Link>
        </li>
        <li className='flex'>
          <Link href={'/dashboard'} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
            <IoSearch className='w-[25px] h-[25px]'/>
            <span>Explore</span>
          </Link>
        </li>
        <li className='flex'>
          <Link href={'/dashboard/notifications'} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
            <IoNotifications className='w-[25px] h-[25px]'/>
            <span>Notifications</span>
          </Link>
        </li>
        <li className='flex'>
          <Link href={'/dashboard/messages'} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
            <IoMail className='w-[25px] h-[25px]'/>
            <span>Messages</span>
          </Link>
        </li>
        <li className='flex'>
          <Link href={'/dashboard/friends'} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
            <FaUserFriends className='w-[25px] h-[25px]'/>
            <span>Friends</span>
          </Link>
        </li>
        <li className='flex'>
          <Link href={`/dashboard/profile/${currentUser?.username}`} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
            <FaUserCircle className='w-[25px] h-[25px]'/>
            <span>Profile</span>
          </Link>
        </li>
        <li className='flex'>
          <LogoutButton/>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;