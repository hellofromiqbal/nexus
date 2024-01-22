import React from 'react';
import EditProfileForm from '@/app/components/Forms/EditProfile/EditProfileForm';
import BackButton from '@/app/components/Buttons/Back/BackButton';

const EditProfilePage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4 flex'>
        <BackButton/>
      </div>
      <div className='px-4 pb-6'>
        <EditProfileForm/>
      </div>
    </div>
  )
};

export default EditProfilePage;