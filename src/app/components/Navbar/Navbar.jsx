import React from 'react';
import Link from 'next/link';
import {
  IoHome,
  IoSearch,
  IoNotifications,
  IoMail,
  IoExit
} from "react-icons/io5";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import LogoutButton from '../Buttons/Logout/LogoutButton';

const Navbar = () => {
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
          <Link href={'/dashboard/profile/1'} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
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