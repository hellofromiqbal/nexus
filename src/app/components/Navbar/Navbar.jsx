'use client'

import React from 'react';
import LogoutButton from '../Buttons/Logout/LogoutButton';

import staticData from '@/assets/data/staticData';
import NavLink from '../NavLink/NavLink';

const Navbar = () => {
  return (
    <nav>
      <ul className='flex flex-row justify-evenly md:flex-col'>
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