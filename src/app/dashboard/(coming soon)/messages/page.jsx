import React from 'react';
import BackButton from '@/app/components/Buttons/Back/BackButton';

const MessagesPage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4 flex'>
        <BackButton/>
      </div>
      <div>
        <div className='h-[200px] flex justify-center items-center border-t border-gray-700'>
          <h1 className='text-white font-medium'>Coming soon!</h1>
        </div>
      </div>
    </div>
  )
};

export default MessagesPage;