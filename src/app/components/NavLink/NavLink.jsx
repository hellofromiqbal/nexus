import React from 'react';
import Link from 'next/link';
import {
  IoHome,
  IoSearch,
  IoNotifications,
  IoMail,
} from "react-icons/io5";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/currentUserSlice';

const NavLink = ({ name, url }) => {
  const pathname = usePathname();
  const currentUser = useSelector(selectCurrentUser);
  if(name === 'profile') {
    url = `${url}/${currentUser?.username}`
  };
  const icons = {
    home: <IoHome className='w-[25px] h-[25px]'/>,
    explore: <IoSearch className='w-[25px] h-[25px]'/>,
    notifications: <IoNotifications className='w-[25px] h-[25px]'/>,
    messages: <IoMail className='w-[25px] h-[25px]'/>,
    friends: <FaUserFriends className='w-[25px] h-[25px]'/>,
    profile: <FaUserCircle className='w-[25px] h-[25px]'/>
  };
  
  return (
    <li className={name !== 'profile' ? 'flex' : 'hidden md:flex'}>
      <Link href={url} className={`p-4 w-full font-medium hover:text-black ${pathname === url ? 'bg-green-500 text-black' : 'text-white'} hover:bg-green-500 flex items-center gap-4`}>
        {icons[name]}
        <span className='hidden md:block capitalize'>{name}</span>
      </Link>
    </li>
  )
};

export default NavLink;