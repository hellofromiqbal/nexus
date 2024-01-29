import React from 'react';
import Link from 'next/link';
import {
  IoHome,
  IoSearch,
  IoNotifications,
  IoMail,
} from "react-icons/io5";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";

const NavLink = ({ name, url }) => {
  const icons = {
    home: <IoHome className='w-[25px] h-[25px]'/>,
    explore: <IoSearch className='w-[25px] h-[25px]'/>,
    notifications: <IoNotifications className='w-[25px] h-[25px]'/>,
    messages: <IoMail className='w-[25px] h-[25px]'/>,
    friends: <FaUserFriends className='w-[25px] h-[25px]'/>,
    profile: <FaUserCircle className='w-[25px] h-[25px]'/>
  };

  return (
    <li className='flex'>
      <Link href={url} className='p-4 w-full font-medium text-white hover:text-black hover:bg-green-500 flex items-center gap-4'>
        {icons[name]}
        <span className='capitalize'>{name}</span>
      </Link>
    </li>
  )
};

export default NavLink;