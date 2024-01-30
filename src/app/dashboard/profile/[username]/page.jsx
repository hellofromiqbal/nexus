import React from 'react';
import MainProfile from '@/app/components/MainProfile/MainProfile';
import BackButton from '@/app/components/Buttons/Back/BackButton';

const ProfilePage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4 flex'>
        <BackButton/>
      </div>
      <div>
        <MainProfile/>
      </div>
    </div>
  )
};

export default ProfilePage;