import React from 'react';
import BackButton from '@/app/components/Buttons/Back/BackButton';
import MainPostDetail from '@/app/components/MainPostDetail/MainPostDetail';

const PostDetailPage = () => {
  return (
    <div className='flex flex-col bg-gray-800 shadow-md rounded-md'>
      <div className='p-4 flex'>
        <BackButton/>
      </div>
      <div>
        <MainPostDetail/>
      </div>
    </div>
  )
};

export default PostDetailPage;