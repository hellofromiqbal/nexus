'use client'

import React from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className='font-medium text-white flex items-center gap-2'
      onClick={() => router.back()}
    >
      <IoArrowBack/>
      <span>Back</span>
    </button>
  )
};

export default BackButton;